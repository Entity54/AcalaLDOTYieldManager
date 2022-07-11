import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react';

import { ethers } from 'ethers';  
import { Contract } from 'ethers';

import ntt54StgydotLDOT_raw from './Abis/ntt54StgydotLDOT';      


//METAMASK
import detectEthereumProvider from '@metamask/detect-provider'; // FOR METAMASK TO BE USED This function detects most providers injected at window.ethereum

import {  setInstances,  
  getBasicInfo,
	getAccount_ACA_Balance, getAccount_AUSD_Balance, getAccount_DOT_Balance, getAccount_LDOT_Balance,
	getAccount_STR1_Balance, getAccountDetailedInfo
} from './ntt54_accounts.js';         

/// Components
import Index from "./jsx";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";


// ************ ntt54 smart contracts ************
const ntt54StgydotLDOT_address = "0x90067B8C5f8CB3AD71A6c5f54701823B6B745dd1";  
// ************ ntt54 smart contracts ************



function App (props) {
    const [provider,setProvider] = useState(null);
    const [chainId,setChainId] = useState(null);
    const [currentAccount,setCurrentAccount] = useState(null);
    const [wallet,setWallet] = useState(null);
    const [setupSpecs,setSetupSpecs]            = useState({ wallet: null, provider: null, pair: null, connected: "Not connected", walletAddress: null });
    // const [blockChainSpecs,setBlockChainSpecs]  = useState({ networkName: undefined, chainID: undefined, blockNumber: undefined, gasPrice: undefined});
    const [blockHeader, setBlockHeader]         = useState({ number: undefined , hash: undefined, size: undefined });
    const [evm_api_state,setEvm_Api_State] = useState(false);
    const [accountList, setAccountList] = useState();  //stores the list of accounts from the extensions

    const [acaBalance , setAcaBalance]    = useState("");  
    const [ausdBalance, setAusdBalance]   = useState("");  
    const [dotBalance , setDotBalance]    = useState("");  
    const [ldotBalance , setLDotBalance]    = useState("");  
    const [str1Balance , setStr1Balance]  = useState("");  
     
    const [scacaBalance , setSCacaBalance]  = useState("");  
    const [scausdBalance , setSCausdBalance]  = useState("");  
    const [scdotBalance , setSCdotBalance]  = useState("");  
    const [scldotBalance , setSCldotBalance]  = useState("");  

    const [scAdmin , setSCAdmin]  = useState("");  
    const [scFrequency , setSCFrequency]  = useState("");  
    const [scState , setSCstate]  = useState("");  
    const [dotLDOT , setDOTLDOT]  = useState("");  
    const [homaExchnageRate , setHomaExchnageRate]  = useState("");  
    const [scEpochNumber , setSCepochNumber]  = useState("");  
    const [scRegTotalDOT , setSCregTotalDOT]  = useState("");  
    const [scRegTotalLDOT , setSCregTotalLDOT]  = useState("");  
    const [scExcessLDOT , setSCexcessLDOT]  = useState("");  
    const [scInitialDOTCapitaltoLDOT , setSCinitialDOTCapitaltoLDOT]  = useState("");  
    const [scAmountAUSDtoSwaptoACA , setSCamountAUSDtoSwaptoACA]  = useState("");  
    const [scFreshAUSDrewards , setSCfreshAUSDrewards]  = useState("");  
    const [scFreshACArewards , setSCfreshACArewards]  = useState("");  
    const [scTotal_STGausd , setSCtotal_STGausd]  = useState("");  
    const [scTotal_STGaca , setSCtotal_STGaca]  = useState("");  
    const [scTotalACAavailableBalance , setSCtotalACAavailableBalance]  = useState("");  
    const [scTotalAUSDavailableBalance , setSCtotalAUSDavailableBalance]  = useState(""); 
    
    const [userSCrecordedDOTBalance , setUserSCrecordedDOTBalance]  = useState("");  
    const [userSCrecordedLDOTBalance , setUserSCrecordedLDOTBalance]  = useState("");  
    const [userSCrecordedACABalance , setUserSCrecordedACABalance]  = useState("");  
    const [userSCrecordedAUSDBalance , setUserSCrecordedAUSDBalance]  = useState("");  
    
 

  const getAllBalanceForAccount = async (accnt) => {
    // console.log(`App => getAllBalanceForAccount running  accnt: ${accnt}`);
    const acaBalance  = await getAccount_ACA_Balance(accnt);
    const ausdBalance = await getAccount_AUSD_Balance(accnt);
    const dotBalance  = await getAccount_DOT_Balance(accnt);
    const ldotBalance  = await getAccount_LDOT_Balance(accnt);
    const str1Balance  = await getAccount_STR1_Balance(accnt);

    const userSCrecordeValues = await getAccountDetailedInfo();
    const userShareOfPool = Number(str1Balance) / Number(userSCrecordeValues.strategy_totalSupply)
    const userShareOfLDOT = Number(userSCrecordeValues.total_LDOTinAccount) * userShareOfPool;
    const usersDOTifredeemed = userShareOfLDOT / Number(userSCrecordeValues.DOT_LDOT)
    console.log(" ============== ============== ==============")
    console.log(`userShareOfPool: ${userShareOfPool} userShareOfLDOT: ${userShareOfLDOT} usersDOTifredeemed: ${usersDOTifredeemed}`);
    console.log(" ============== ============== ==============")
    setUserSCrecordedDOTBalance(usersDOTifredeemed.toFixed(5));
    setUserSCrecordedLDOTBalance(userShareOfLDOT.toFixed(5));
    // setUserSCrecordedLDOTBalance(userSCrecordeValues.registredAccount_LDOT_balance);
    
    setUserSCrecordedDOTBalance(userSCrecordeValues.registredAccount_DOT_balance);
    setUserSCrecordedACABalance(userSCrecordeValues.registredAccount_ACA_balance);
    setUserSCrecordedAUSDBalance(userSCrecordeValues.registredAccount_AUSD_balance);
    console.log(" ============== ============== ==============")
    console.log(`userSCrecordeValues.registredAccount_AUSD_balance: ${userSCrecordeValues.registredAccount_AUSD_balance}`);
    console.log(" ============== ============== ==============")

    setAcaBalance(acaBalance); setAusdBalance(ausdBalance); setDotBalance(dotBalance); setLDotBalance(ldotBalance); 
    setStr1Balance(str1Balance); 

    const {
            ntt54StgydotLDOT_admin, aca_scBalance, ausd_scBalance, dot_scBalance, ldot_scBalance,
            frequency, managingProceedsState, DOT_LDOT, epochNumber, homaExchangeRate,
            total_DOTinAccount, total_LDOTinAccount, excessLDOTinAccount, initialDOTCapitaltoLDOT, amountAUSDtoSwaptoACA, freshAUSDrewards, freshACArewards,
            total_STGausd, total_STGaca, totalACAavailableBalance, totalAUSDavailableBalance
       
          } = await getBasicInfo();
    setSCacaBalance(aca_scBalance);  setSCausdBalance(ausd_scBalance);  setSCdotBalance(dot_scBalance);  setSCldotBalance(ldot_scBalance);
    setSCAdmin(ntt54StgydotLDOT_admin); setSCFrequency(frequency); setSCstate(managingProceedsState);  
    setDOTLDOT(DOT_LDOT);  setHomaExchnageRate(homaExchangeRate);  setSCepochNumber(epochNumber);
    
    setSCregTotalDOT(total_DOTinAccount);  setSCregTotalLDOT(total_LDOTinAccount);  setSCexcessLDOT(excessLDOTinAccount);  setSCinitialDOTCapitaltoLDOT(initialDOTCapitaltoLDOT);  setSCamountAUSDtoSwaptoACA(amountAUSDtoSwaptoACA);
    setSCfreshAUSDrewards(freshAUSDrewards);  setSCfreshACArewards(freshACArewards);  setSCtotal_STGausd(total_STGausd);  setSCtotal_STGaca(total_STGaca);  setSCtotalACAavailableBalance(totalACAavailableBalance); setSCtotalAUSDavailableBalance(totalAUSDavailableBalance);
    console.log(`}}}}}}}} ===> aca_scBalance:${aca_scBalance}`);
  }


  //#region Setup MetaMask
  useEffect(() => {
      const listenMMAccount = async () => {

          const basicInfo = async (provider, wallet, account) => {
            const balanceAccount_BigNumber = await provider.getBalance(account);
            const balanceAccount =  ethers.utils.formatUnits( balanceAccount_BigNumber, 18 );
            const walletBalance = await wallet.getBalance(); // { BigNumber: "42" }
            const walletChainID = await wallet.getChainId(); //AMTC7 595 or 0x253   Returns the chain ID this wallet is connected to.  
            const gasPrice = await wallet.getGasPrice(); // 1000000000 Returns the current gas price. BigNumber   
            const nonce = await wallet.getTransactionCount(); //NONCE 73
            const walletAddress = await wallet.getAddress();
            console.log(`MetaMask Setup ***> account:${account} balanceAccount: ${balanceAccount} Wallet address that signs transactions: ${walletAddress} walletBalance: ${ ethers.utils.formatUnits( walletBalance, 18 )} walletChainID: ${walletChainID} nonce:${nonce}`);
            console.log(`MetaMask Setup ***>  (await provider.getNetwork()).chainId: ${(await provider.getNetwork()).chainId} getBlockNumber: ${await provider.getBlockNumber()} gasPrice: ${gasPrice.toString()}`);
           
            //set instances
            const ntt54StgydotLDOT = new Contract(ntt54StgydotLDOT_address, ntt54StgydotLDOT_raw.abi, wallet);
            const ntt54StgydotLDOT_Admin  = await ntt54StgydotLDOT.admin();

            await setInstances(
                wallet, provider, ntt54StgydotLDOT, ntt54StgydotLDOT_address,
              );

            //here load balanaces for the first time
            await getAllBalanceForAccount(walletAddress);

          }

          let provider, wallet, mm_acounts, account;
          const _provider = await detectEthereumProvider();
          if (_provider) {
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");   
            setProvider(provider);
           
            provider.on("network", (newNetwork, oldNetwork) => {
                if (oldNetwork) {
                    window.location.reload();
                }
            });

            mm_acounts = await _provider.request({ method: 'eth_requestAccounts' });
            console.log(`MetaMask Accounts Array: `,mm_acounts);
            setCurrentAccount(mm_acounts[0]);
            account = mm_acounts[0];

            const mm_chainId = await _provider.request({ method: 'eth_chainId' });
            setChainId(mm_chainId);
            console.log(`MetaMask mm_chainId: `,mm_chainId,` mm_acounts[0]: `,mm_acounts[0]);

            wallet = provider.getSigner(); 
            setWallet(wallet)

            basicInfo(provider, wallet, account);

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            function handleAccountsChanged(accounts) {
              if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                console.log('Please connect to MetaMask.');
              } else if (accounts[0] !== currentAccount) {
                account = accounts[0]
                setCurrentAccount(accounts[0]);
                wallet = provider.getSigner(); 
                setWallet(wallet)
          
                basicInfo(provider, wallet, account);

                console.log(`******* current account: ${accounts[0]}`);
              }
            }

          } 
          else {  console.log('Please install MetaMask!');  }
      }
      listenMMAccount();
  }, []);
  //#endregion Setup MetaMask


  useEffect( async () => {
      if (provider && currentAccount)
      {
          setEvm_Api_State(true);
          setAccountList([currentAccount]);
      }
  }, [provider, currentAccount]);   


  let timeToUpDate = true;
  useEffect(() => {
    const blockUpdate = async () => {
        console.log(`||||> Inside New Block blockHeader.number: ${blockHeader.number}`); // currentAccount:${currentAccount}`);
    
        const mod5 = Number(blockHeader.number) % 5 ;
        if (mod5===0 && timeToUpDate)
        {
          timeToUpDate = false;
          console.log(`TIME TO UPDATE THE BALANCES and staking contract`);
          await getAllBalanceForAccount(currentAccount);
    
          const stakeDOTinfo = await getBasicInfo();
          if (stakeDOTinfo)
          {
            // const {ntt54_StakeDOT_admin, treasuryBalances, REWARD_PER_BLOCK, epochNumber, dot_StakedBalance, contractState, stake_ContractACAbalance} = stakeDOTinfo;
            const {ntt54StgydotLDOT_admin, aca_scBalance, ausd_scBalance, dot_scBalance, ldot_scBalance} = stakeDOTinfo
            setSCacaBalance(aca_scBalance);  setSCausdBalance(ausd_scBalance);  setSCdotBalance(dot_scBalance);  setSCldotBalance(ldot_scBalance)
            console.log(`}}}}}}}} ===> aca_scBalance:${aca_scBalance}`);
          }
        } else if (mod5!==0) timeToUpDate = true;
    }
    blockUpdate();

  }, [blockHeader]);  


  //#region  parachain events setup WORKING BUT COMMENTED OUT FOR DEVELOPMENT
  useEffect(() => {
    const parachain = async (provider) => {
        console.log(`||||||||||||||||||||=========> App.js AcalamandalaTC7 Parachain is run at  Timestmap: ${new Date()}`);
        //Subscribe to the new headers on-chain.   
        provider.on("block", async (blockNumber) => {
            // console.log(`AcalamandalaTC7 PROVIDER EVENT block blockNumber: ${blockNumber}`);
            setBlockHeader({number: `${blockNumber}`, hash: `header.hash`, size: "header.size"});
        });
    }

    const jsonRpcProvider = new ethers.providers.JsonRpcProvider("https://tc7-eth.aca-dev.network");
    parachain(jsonRpcProvider).catch((er) => { console.log(`APP.JS parachain Error: `,er);  });
  }, []);  
  //#endregion  parachain events setup


    
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index 
                          currentAccount={currentAccount} provider={provider} wallet={wallet} setupSpecs={setupSpecs} blockHeader={blockHeader} accountList={accountList} evm_api_state={evm_api_state}
                          acaBalance={acaBalance}  ausdBalance={ausdBalance}  dotBalance={dotBalance} ldotBalance={ldotBalance} str1Balance={str1Balance}  
                          getAllBalanceForAccount={getAllBalanceForAccount}
                          userSCrecordedDOTBalance={userSCrecordedDOTBalance} userSCrecordedLDOTBalance={userSCrecordedLDOTBalance}
                          userSCrecordedACABalance={userSCrecordedACABalance} userSCrecordedAUSDBalance={userSCrecordedAUSDBalance}

                          scacaBalance={scacaBalance}  scausdBalance={scausdBalance}  scdotBalance={scdotBalance}  scldotBalance={scldotBalance}

                          scAdmin={scAdmin} scFrequency={scFrequency} scState={scState} dotLDOT={dotLDOT} homaExchnageRate={homaExchnageRate}
                          scEpochNumber={scEpochNumber} scRegTotalDOT={scRegTotalDOT} scRegTotalLDOT={scRegTotalLDOT} scExcessLDOT={scExcessLDOT}
                          scInitialDOTCapitaltoLDOT={scInitialDOTCapitaltoLDOT} scAmountAUSDtoSwaptoACA={scAmountAUSDtoSwaptoACA} scFreshAUSDrewards={scFreshAUSDrewards}
                          scFreshACArewards={scFreshACArewards} scTotal_STGausd={scTotal_STGausd} scTotal_STGaca={scTotal_STGaca} scTotalACAavailableBalance={scTotalACAavailableBalance} scTotalAUSDavailableBalance={scTotalAUSDavailableBalance}
                      
                    />
                </Suspense>
            </>
        );
	
};


export default App;


