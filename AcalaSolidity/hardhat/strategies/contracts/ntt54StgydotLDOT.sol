// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './LpStg2.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@acala-network/contracts/dex/IDEX.sol";
import "@acala-network/contracts/schedule/ISchedule.sol";
import "@acala-network/contracts/homa/IHoma.sol";
import "@acala-network/contracts/utils/Address.sol";
 

contract ntt54StgydotLDOT is LpStg2, ADDRESS {
    IDEX dex = IDEX(ADDRESS.DEX);
    ISchedule schedule = ISchedule(ADDRESS.Schedule);
    IHoma homa = IHoma(ADDRESS.Homa);

    ERC20 dot;
    ERC20 ausd;
    ERC20 aca;
    ERC20 ldot;

    uint public frequency = 120;                 //how frequently will manage proceeds
    bool public managingProceedsState = true;    //allows admin to start/stop manageProceeds
    uint public DOT_LDOT;                        //how many LDOT for 1 DOT only exposed to debug
    
    address public admin;             
    uint public epochNumber = 0;
    uint public total_DOTinAccount;
    uint public total_LDOTinAccount;

    uint public excessLDOTinAccount;          
    uint public amountAUSDtoSwaptoACA;       
    uint public freshAUSDrewards = 0;         
    uint public freshACArewards  = 0;        
    uint public homaExchangeRate = 0;        
    uint public initialDOTCapitaltoLDOT = 0;  


    uint public total_STGausd = 0;     //Total Strategy tokens for AUSD collection
    uint public total_STGaca = 0;      //Total Strategy tokens for ACA collection
    //total_STGaca / totalSupply() shows the portion of AUSD to be swapped for ACA in Bulk

    address[] public userAccounts;                    
    mapping(address => bool) public registeredUserAccounts; 
    mapping(address => mapping(address => uint)) public userBalances; 

    mapping(address => uint) public userPercentAUSD;  //kepps track of user's preference in % of AUSD to claim as rewards. 1-this is the ACA equivalent
    mapping(address => uint) public userSTGausd;     //portion of StrategyTokens of user representing share in AUSD collection
    mapping(address => uint) public userSTGaca;      //portion of StrategyTokens of user representing share in ACA collection
    mapping(address => uint) public userStakedDOT;

    modifier onlyAdmin {
        require(msg.sender==admin,"action only for admin");
        _;
    }
    modifier onlyAdmiOrStgySC {
        require(msg.sender==address(this) || msg.sender==admin,"action only for this sc or admin");
        _;
    }

    uint public totalACAavailableBalance = 0; 
    uint public totalAUSDavailableBalance = 0; 

    constructor() {
        admin = msg.sender;
        dot  = ERC20(ADDRESS.DOT);
        ausd = ERC20(ADDRESS.AUSD);
        aca  = ERC20(ADDRESS.ACA);
        ldot = ERC20(ADDRESS.LDOT);
    }

    function updateFrequency(uint _frequency)  external {
        frequency = _frequency;
    }

    //make sure you tranfer at least 2 ACA to SC for fees. If balance falls below 1 it will not continue
    function transferFeesBalance(uint amount) external {
        aca.transferFrom(msg.sender,address(this),amount);
    }

    function depositDOT(uint amount, uint percentAUSD) external {
        //make sure approve smart contract as spender for this balance
        require(amount <= dot.allowance(msg.sender,address(this)),"client needs to increase allowance");

        if( !registeredUserAccounts[msg.sender] )
        {
            registeredUserAccounts[msg.sender] = true;
            userAccounts.push(msg.sender);
            userPercentAUSD[msg.sender] = percentAUSD;
        }

        dot.transferFrom(msg.sender,address(this),amount);
        userBalances[ADDRESS.DOT][msg.sender] +=amount;
        _mint(msg.sender, amount);
        userBalances[address(this)][msg.sender] +=amount;
    }

    function stakeDOT() external {
        if (userStakedDOT[msg.sender] < userBalances[ADDRESS.DOT][msg.sender])
        {
            // STG tokens are 1:1 with DOT deposited at all times
            uint amount = userBalances[ADDRESS.DOT][msg.sender] - userStakedDOT[msg.sender] ;
            uint newSTGausd = (amount / 100) * userPercentAUSD[msg.sender];
            uint newSTGaca = amount -  newSTGausd;
            userSTGausd[msg.sender] +=newSTGausd;
            userSTGaca[msg.sender] = newSTGaca;
            
            total_STGausd +=newSTGausd;
            total_STGaca  +=newSTGaca;

            //mint LDOT
            uint256 LDOT_Balance_before = ldot.balanceOf(address(this));
            require(homa.mint(amount), "Homa Mint Error");
            uint256 LDOT_Balance_after = ldot.balanceOf(address(this));
            uint256 differenceLDOT = LDOT_Balance_after - LDOT_Balance_before;
            userBalances[ADDRESS.LDOT][msg.sender] +=differenceLDOT;

            total_DOTinAccount  +=amount;
            total_LDOTinAccount +=differenceLDOT;

            userStakedDOT[msg.sender] = userBalances[ADDRESS.DOT][msg.sender] ;
        }

    }

    function unstakeAndWithdrawDOT() external {
        uint userStrategyTokenBalance = userBalances[address(this)][msg.sender] ;
        require(userStrategyTokenBalance >0,"not enough strategy tokens to unstake");

        userBalances[address(this)][msg.sender] = 0;
        _burn(msg.sender, userStrategyTokenBalance);
        userBalances[ADDRESS.DOT][msg.sender] = 0;
        total_DOTinAccount -=userStrategyTokenBalance;
      
        uint LDOTtoSwap = userBalances[ADDRESS.LDOT][msg.sender] ;
        userBalances[ADDRESS.LDOT][msg.sender] = 0;
        total_LDOTinAccount -=LDOTtoSwap;

        total_STGausd -=userSTGausd[msg.sender];
        total_STGaca  -=userSTGaca[msg.sender];
        userSTGausd[msg.sender] = 0;
        userSTGaca[msg.sender] = 0;
        userStakedDOT[msg.sender]  = 0;

        //swap LDOT for DOT  
        address[] memory path = new address[](3);
        path[0] = ADDRESS.LDOT;
        path[1] = ADDRESS.AUSD;
        path[2] = ADDRESS.DOT;
        uint targetReceivedAmount = dex.getSwapTargetAmount(path, LDOTtoSwap);
        require(dex.swapWithExactSupply(path, LDOTtoSwap, 1), "Swapping LDOT for DOT failed");
        //send DOT to user's account
        dot.transfer(msg.sender, targetReceivedAmount); 
        
        //deregister user
        registeredUserAccounts[msg.sender] = false;
        
        //remover user from userAccounts
        uint userAccountlengthM1 = userAccounts.length - 1;
        for (uint i=0; i<=userAccountlengthM1; i++)
        {
            if (msg.sender == userAccounts[i])
            {
                if (i<userAccountlengthM1)
                {
                    userAccounts[i] = userAccounts[userAccountlengthM1];
                }
                userAccounts.pop();
                
            }
        }
        
    }


    function startManagingProcees() onlyAdmin external {
        managingProceedsState = true;
        manageProceeds();
    }

    function stopManagingProcees() onlyAdmin external {
        managingProceedsState = false;
    }


    function manageProceeds() onlyAdmiOrStgySC public {

        if (managingProceedsState)
        {
                homaExchangeRate = homa.getExchangeRate(); //Get exchange rate of liquid currency to staking currency (liquid : staking). range of [0.000000000000000000, 340282366920938463463.374607431768211455]
                DOT_LDOT = 1e28 / homaExchangeRate;             //Now we know how many LDOT for 1 DOT 
                initialDOTCapitaltoLDOT = (total_DOTinAccount / 1e10) * DOT_LDOT;
   
                if (initialDOTCapitaltoLDOT < total_LDOTinAccount)
                {
                    excessLDOTinAccount = total_LDOTinAccount - initialDOTCapitaltoLDOT;
                    if (excessLDOTinAccount > 1e11)  //we must have at least 10LDOT rewards to distribut for the whole SC
                    {
                        total_LDOTinAccount = initialDOTCapitaltoLDOT;
                        rebalanceStrategy(excessLDOTinAccount);
                    }

                }

                schedule.scheduleCall(
                    address(this),
                    0,
                    1000000,
                    5000,
                    frequency,
                    abi.encodeWithSignature("manageProceeds()")
                );

                ++epochNumber;
        }

    }


    function rebalanceStrategy(uint excessLDOT) public {

        uint initialAUSDavailableBalance = ausd.balanceOf(address(this));
        uint initialACADavailableBalance = aca.balanceOf(address(this));
        freshAUSDrewards = 0;
        freshACArewards  = 0;

        address[] memory path = new address[](2);
        path[0] = ADDRESS.LDOT;
        path[1] = ADDRESS.AUSD;
        require(dex.swapWithExactSupply(path, excessLDOT, 1), "Swapping LDOT for AUSD failed");
 
        if (total_STGaca > 0)
        {
            freshAUSDrewards =  ausd.balanceOf(address(this)) - initialAUSDavailableBalance;

            amountAUSDtoSwaptoACA = (total_STGaca * freshAUSDrewards) / totalSupply() ;
            if (amountAUSDtoSwaptoACA > 0)
            {
                //swap AUSD for ACA
                address[] memory pathACA = new address[](2);
                pathACA[0] = ADDRESS.AUSD;
                pathACA[1] = ADDRESS.ACA;
                require(dex.swapWithExactSupply(pathACA, amountAUSDtoSwaptoACA, 1), "Swapping AUSD for ACA failed");
                freshACArewards =  aca.balanceOf(address(this)) - initialACADavailableBalance;
            }
        }

        freshAUSDrewards =  ausd.balanceOf(address(this)) - initialAUSDavailableBalance;

        allocate(freshAUSDrewards, freshACArewards);
    }


    function allocate(uint _freshAUSDrewards, uint _freshACArewards) private {

            for (uint i=0; i<=userAccounts.length - 1; i++)
            {
                address userAccount = userAccounts[i];
                
                if (total_STGausd>0 && userSTGausd[userAccount]>0 && _freshAUSDrewards>0)
                {
                    uint creditAUSDtoUser = ( userSTGausd[userAccount] / total_STGausd ) * _freshAUSDrewards ;
                    userBalances[ADDRESS.AUSD][userAccount] +=creditAUSDtoUser;
                }

                if (total_STGaca>0 && userSTGaca[userAccount]>0 && _freshACArewards>0)
                {
                    uint creditACAtoUser = ( userSTGaca[userAccount] / total_STGaca ) * _freshACArewards ;
                    userBalances[ADDRESS.ACA][userAccount] +=creditACAtoUser;
                }
                    
            }

    }

    function claimRewards() external {
        uint userClaimableAUSD = userBalances[ADDRESS.AUSD][msg.sender];
        if (userClaimableAUSD > 0)
        {
            userBalances[ADDRESS.AUSD][msg.sender] = 0;
            ausd.transfer(msg.sender, userClaimableAUSD);
        }

        uint userClaimableACA = userBalances[ADDRESS.ACA][msg.sender];
        if (userClaimableACA > 0)
        {
            userBalances[ADDRESS.ACA][msg.sender] = 0;
            aca.transfer(msg.sender, userClaimableACA);
        }

    }


}