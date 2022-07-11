import { ACA, AUSD, DEX, Schedule, Oracle, EVM, DOT, LP_ACA_AUSD, LP_DOT_AUSD, LP_LDOT_AUSD, LP_RENBTC_AUSD, LDOT, RENBTC }  from '@acala-network/contracts/utils/Address';
import { Contract } from 'ethers';
import { ethers } from 'ethers';  
import { formatUnits, parseUnits } from 'ethers/lib/utils';

import TokenContract from '@acala-network/contracts/build/contracts/Token.json';
 
const Homa = '0x0000000000000000000000000000000000000805';


// const DEXContract = require("@acala-network/contracts/build/contracts/DEX.json");
// const TokenContract = require("@acala-network/contracts/build/contracts/Token.json")
// const { formatUnits, parseUnits } = require("ethers/lib/utils");


let wallet, provider, walletAddress,
    ntt54StgydotLDOT, ntt54StgydotLDOT_address,
    ntt54_StakeDOT, ntt54StgyAUSDincome, ntt54StgyDOTincome, ntt54StgyACAincome,
    ntt54StakeDOT_address, ntt54StgyAUSDincome_address, ntt54StgyDOTincome_address, ntt54StgyACAincome_address,
    STR1instance, STR2instance, STR3instance
    ;
let ACAinstance, AUSDinstance, DOTinstance, LDOTinstance, RENBTCinstance;
let tokenInstances = { 
      ACA   : ACAinstance, 
      AUSD  : AUSDinstance, 
      DOT   : DOTinstance,
      LDOT  : LDOTinstance, 
      RENBTC: RENBTCinstance 
};
const tokensArray = [ "ACA", "AUSD", "DOT", "LDOT", "RENBTC"];
const tokens= { ACA, AUSD, DOT, LDOT, RENBTC };



const setInstances = async (
        _wallet, _provider, _ntt54StgydotLDOT, _ntt54StgydotLDOT_address,
        _ntt54_StakeDOT, _ntt54StgyAUSDincome, _ntt54StgyDOTincome=null, _ntt54StgyACAincome=null,
        _ntt54StakeDOT_address, _ntt54StgyAUSDincome_address, _ntt54StgyDOTincome_address=null, _ntt54StgyACAincome_address=null
) => {
  wallet    = _wallet; 
  provider  = _provider;
  ntt54StgydotLDOT = _ntt54StgydotLDOT; 
  ntt54StgydotLDOT_address = _ntt54StgydotLDOT_address;

  //#region
  // ntt54_StakeDOT = _ntt54_StakeDOT;
  // ntt54StgyAUSDincome = _ntt54StgyAUSDincome;
  // ntt54StgyDOTincome = _ntt54StgyDOTincome;
  // ntt54StgyACAincome = _ntt54StgyACAincome;
  // ntt54StakeDOT_address = _ntt54StakeDOT_address;
  // ntt54StgyAUSDincome_address = _ntt54StgyAUSDincome_address;
  // ntt54StgyDOTincome_address = _ntt54StgyDOTincome_address;
  // ntt54StgyACAincome_address = _ntt54StgyACAincome_address;
  //#endregion

  walletAddress = await wallet.getAddress();
  console.log(`Setting instances for new wallet with address ${walletAddress} `)
  // DEXinstance     = new Contract(DEX    , DEXContract.abi  , wallet);

  ACAinstance     = new Contract(ACA    , TokenContract.abi, wallet);
  AUSDinstance    = new Contract(AUSD   , TokenContract.abi, wallet);
  DOTinstance     = new Contract(DOT    , TokenContract.abi, wallet);
  LDOTinstance    = new Contract(LDOT   , TokenContract.abi, wallet);

  RENBTCinstance  = new Contract(RENBTC , TokenContract.abi, wallet);

  tokenInstances = { 
                    ACA   : ACAinstance, 
                    AUSD  : AUSDinstance, 
                    DOT   : DOTinstance,
                    LDOT  : LDOTinstance, 
                    RENBTC: RENBTCinstance 
                   };

  getBasicInfo();
}

const getBasicInfo = async () => {

  if (ntt54StgydotLDOT && ntt54StgydotLDOT_address && DOTinstance && ACAinstance && LDOTinstance && AUSDinstance)
  {
    const ntt54StgydotLDOT_admin = await ntt54StgydotLDOT.admin();
    const aca_scBalance = formatUnits((await (ACAinstance.balanceOf(ntt54StgydotLDOT_address))).toString()   , 12);   
    const ausd_scBalance = formatUnits((await (AUSDinstance.balanceOf(ntt54StgydotLDOT_address))).toString()   , 12);   
    const dot_scBalance = formatUnits((await (DOTinstance.balanceOf(ntt54StgydotLDOT_address))).toString()   , 10);   
    const ldot_scBalance = formatUnits((await (LDOTinstance.balanceOf(ntt54StgydotLDOT_address))).toString()   , 10);   
    const frequency = (await ntt54StgydotLDOT.frequency()).toString();

    const managingProceedsState = await ntt54StgydotLDOT.managingProceedsState();

    const dotLdot_rate = (await ntt54StgydotLDOT.DOT_LDOT()).toString();
    const DOT_LDOT =  formatUnits( dotLdot_rate , 10);
    console.log(`=====>>>>>>`);
    console.log(`dotLdot_rate: ${dotLdot_rate}  DOT_LDOT: ${DOT_LDOT}`);
    console.log(`<<<<<<=====`);

    const epochNumber = (await ntt54StgydotLDOT.epochNumber()).toString();
    const homaExchangeRate =  formatUnits( (await ntt54StgydotLDOT.homaExchangeRate()).toString() , 18);

    const total_DOTinAccount =  formatUnits( (await ntt54StgydotLDOT.total_DOTinAccount()).toString() , 10);
    const total_LDOTinAccount =  formatUnits( (await ntt54StgydotLDOT.total_LDOTinAccount()).toString() , 10);
    
    const excessLDOT_inAccount = (await ntt54StgydotLDOT.excessLDOTinAccount()).toString();
    const excessLDOTinAccount =  formatUnits( excessLDOT_inAccount , 10);

    const amountAUSDtoSwaptoACA =  formatUnits( (await ntt54StgydotLDOT.amountAUSDtoSwaptoACA()).toString() , 12);
    const freshAUSDrewards =  formatUnits( (await ntt54StgydotLDOT.freshAUSDrewards()).toString() , 12);
    const freshACArewards =  formatUnits( (await ntt54StgydotLDOT.freshACArewards()).toString() , 12);
    
    const intial_dot_toLDOT_amount = (await ntt54StgydotLDOT.initialDOTCapitaltoLDOT()).toString();
    const initialDOTCapitaltoLDOT =  formatUnits( intial_dot_toLDOT_amount , 10);
    console.log(`<<<<=====>>>>>>`);
    console.log(`intial_dot_toLDOT_amount: ${intial_dot_toLDOT_amount}  initialDOTCapitaltoLDOT: ${initialDOTCapitaltoLDOT}`);
    console.log(`<<<<<<=====>>>>`);

    const total_STGausd = formatUnits( (await ntt54StgydotLDOT.total_STGausd()).toString() , 10);
    const total_STGaca = formatUnits( (await ntt54StgydotLDOT.total_STGaca()).toString() , 10);

    //TRACKS THE TOTAL AUSD AND ACA THE SC HOLDS FOR CLAIMING. THIS DOES NOT INCLUDE THE ACA TRANSFERED FOR SC FEES TO BEGIN WITH
    const totalACAavailableBalance = formatUnits( (await ntt54StgydotLDOT.totalACAavailableBalance()).toString() , 12);
    const totalAUSDavailableBalance = formatUnits( (await ntt54StgydotLDOT.totalAUSDavailableBalance()).toString() , 12);
    
    console.log(` ****** ntt54StgydotLDOT ntt54StgydotLDOT_admin: ${ntt54StgydotLDOT_admin} aca_scBalance:${aca_scBalance} ausd_scBalance:${ausd_scBalance}
                  dot_scBalance:${dot_scBalance} ldot_scBalance:${ldot_scBalance} frequency: ${frequency} managingProceedsState:${managingProceedsState}
                  DOT_LDOT: ${DOT_LDOT} epochNumber: ${epochNumber} homaExchangeRate: ${homaExchangeRate} total_DOTinAccount: ${total_DOTinAccount} total_LDOTinAccount: ${total_LDOTinAccount}
                  excessLDOTinAccount: ${excessLDOTinAccount} initialDOTCapitaltoLDOT: ${initialDOTCapitaltoLDOT} amountAUSDtoSwaptoACA: ${amountAUSDtoSwaptoACA}
                  freshAUSDrewards: ${freshAUSDrewards} freshACArewards: ${freshACArewards} total_STGausd: ${total_STGausd} total_STGaca: ${total_STGaca} totalACAavailableBalance: 
                  ${totalACAavailableBalance} totalAUSDavailableBalance: ${totalAUSDavailableBalance}
                  ****** `);
    return {
            ntt54StgydotLDOT_admin, aca_scBalance, ausd_scBalance, dot_scBalance, ldot_scBalance, 
            frequency, managingProceedsState, DOT_LDOT, epochNumber, homaExchangeRate,
            total_DOTinAccount, total_LDOTinAccount, excessLDOTinAccount, initialDOTCapitaltoLDOT, amountAUSDtoSwaptoACA, freshAUSDrewards, freshACArewards,
            total_STGausd, total_STGaca, totalACAavailableBalance, totalAUSDavailableBalance
           };
 
  } else return null;


}


const getAccountDetailedInfo = async () => {
  if (ntt54StgydotLDOT && ntt54StgydotLDOT_address && DOTinstance && ACAinstance && LDOTinstance && AUSDinstance)
  {
    const strategy_totalSupply = formatUnits( (await ntt54StgydotLDOT.totalSupply()).toString() , 10); 
    const isRegistredAccount = await ntt54StgydotLDOT.registeredUserAccounts(walletAddress);
    const registredAccount_DOT_balance =   formatUnits( (await ntt54StgydotLDOT.userBalances(DOT, walletAddress)).toString() , 10); 
    const registredAccount_LDOT_balance = formatUnits( (await ntt54StgydotLDOT.userBalances(LDOT, walletAddress)).toString() , 10); 
    const registredAccount_ACA_balance = formatUnits( (await ntt54StgydotLDOT.userBalances(ACA, walletAddress)).toString() , 12); 
    const registredAccount_AUSD_balance =  formatUnits( (await ntt54StgydotLDOT.userBalances(AUSD, walletAddress)).toString() , 12);
    //SHOWS HOW MUCH DOT HAS USER STAKED. USER MIGHT HAVE TRANSFERRED DOT TO THE SC BUTNOT STAKED YET
    const userStakedDOT = formatUnits( (await ntt54StgydotLDOT.userStakedDOT(walletAddress)).toString() , 10);
    
    const userPercentAUSD = (await ntt54StgydotLDOT.userPercentAUSD(walletAddress)).toString()
    const userSTGausd = formatUnits( (await ntt54StgydotLDOT.userSTGausd(walletAddress)).toString() , 10);
    const userSTGaca = formatUnits( (await ntt54StgydotLDOT.userSTGaca(walletAddress)).toString() , 10);

    const total_LDOTinAccount =  formatUnits( (await ntt54StgydotLDOT.total_LDOTinAccount()).toString() , 10);
    const dotLdot_rate = (await ntt54StgydotLDOT.DOT_LDOT()).toString();
    const DOT_LDOT =  formatUnits( dotLdot_rate , 10);

    const excessLDOT_inAccount = (await ntt54StgydotLDOT.excessLDOTinAccount()).toString();
    const excessLDOTinAccount =  formatUnits( excessLDOT_inAccount , 10);
    console.log(`====|||>>> excessLDOT_inAccount: `,excessLDOT_inAccount);

    const ausd_scBalance = (await (AUSDinstance.balanceOf(ntt54StgydotLDOT_address))).toString();   
    // const registred_Account_AUSD_balance = (await ntt54StgydotLDOT.userBalances(AUSD, walletAddress)).toString(); 
    console.log(`====|||>>> ausd_scBalance: `,ausd_scBalance);

    const registredAccount_STG_balance = formatUnits( (await ntt54StgydotLDOT.userBalances(ntt54StgydotLDOT_address, walletAddress)).toString() , 10); 
    console.log(`====|||>>> registredAccount_STG_balance: `,registredAccount_STG_balance);



    console.log(` ****** ntt54StgydotLDOT isRegistredAccount: ${isRegistredAccount} registredAccount_DOT_balance:${registredAccount_DOT_balance} 
                  registredAccount_LDOT_balance:${registredAccount_LDOT_balance} registredAccount_ACA_balance:${registredAccount_ACA_balance} 
                  registredAccount_AUSD_balance:${registredAccount_AUSD_balance} userStakedDOT: ${userStakedDOT} userPercentAUSD: ${userPercentAUSD} 
                  userSTGausd: ${userSTGausd} userSTGaca: ${userSTGaca}
                  ****** `);
    return {
            isRegistredAccount, registredAccount_DOT_balance, registredAccount_LDOT_balance, registredAccount_ACA_balance, registredAccount_AUSD_balance, 
            userStakedDOT, userPercentAUSD, userSTGausd, userSTGaca, strategy_totalSupply, total_LDOTinAccount, DOT_LDOT,
           };
 
  } else return null;

}


//#region DEPOSIT AND STAKE DOT
const depositDOT = async (amount, _percentAUSD=60 ) => {
  const percentAUSD = parseInt(_percentAUSD);
  const amountWEI = parseUnits(amount,10);
  console.log(`Running depositDOT for amountWEI:${amountWEI} amount:${amount} ${typeof percentAUSD} percentAUSD: ${percentAUSD}`);

  return new Promise( async (resolve,reject) => {
    const tx = await DOTinstance.approve(ntt54StgydotLDOT_address, amountWEI);
    const account = await wallet.getAddress();
    tx.wait().then( async (message) => {
       console.log(`approveERC20forSC from account:${account} has been completed message: `,message);

        //  const tx2 = await ntt54StgydotLDOT.depositDOT(amountWEI, user_percentAUSD);
        //  const tx2 = await ntt54StgydotLDOT.depositDOT(amountWEI, 1);
         const tx2 = await ntt54StgydotLDOT.depositDOT(amountWEI, percentAUSD);
         tx2.wait().then( message2 => {
           console.log(`depositDOT message: `,message2);
           resolve(message2);
         })
         .catch( error => reject(error));
       
    })
    .catch( error => reject(error));

  })

}


const stakeDOT = async () => {
  console.log(`Running stakeDOT`);

  return new Promise( async (resolve,reject) => {
    // const account = await wallet.getAddress();

    const tx = await ntt54StgydotLDOT.stakeDOT();
    // const tx = await ntt54StgydotLDOT.unstakeAndWithdrawDOT();
    // const tx = await ntt54StgydotLDOT.claimRewards();


    tx.wait().then( message2 => {
      console.log(`stakeDOT message: `,message2);
      resolve(message2);
    })
    .catch( error => reject(error));

  })

}
//#endregion 

//#region unstakeDOT
const unstakeDOT = async () => {
  console.log(`Running unstakeDOT`);

  return new Promise( async (resolve,reject) => {

    const tx = await ntt54StgydotLDOT.unstakeAndWithdrawDOT(); 
    tx.wait().then( message2 => {
      console.log(`unstakeDOT message: `,message2);
      resolve(message2);
    })
    .catch( error => reject(error));

  })

}
//#endregion 


//#region updateFrequency
const updateFrequency = async (amount) => {
  // const amountWEI = parseUnits(amount,12);
  console.log(`Running updateFrequency for amount:${amount}`);

  return new Promise( async (resolve,reject) => {

    const tx = await ntt54StgydotLDOT.updateFrequency(amount);
    tx.wait().then( message => {
      console.log(`updateFrequency message: `,message);
      resolve(message);
    })
    .catch( error => reject(error));

  })
  
};
//#endregion



//#region deposit_FeesToStrategy
const deposit_FeesToStrategy = async (amount) => {
  const amountWEI = parseUnits(amount,12);
  console.log(`Running deposit_FeesToStrategy for amountWEI:${amountWEI} amount:${amount}`);

  return new Promise( async (resolve,reject) => {
    const tx = await ACAinstance.approve(ntt54StgydotLDOT_address, amountWEI);
  
    tx.wait().then( async (message) => {
       console.log(`approveERC20forSC  has been completed message: `,message);

         const tx2 = await ntt54StgydotLDOT.transferFeesBalance(amountWEI);
         tx2.wait().then( message2 => {
           console.log(`deposit_FeesToStrategy message: `,message2);
           resolve(message2);
         })
         .catch( error => reject(error));
       
    })
    .catch( error => reject(error));

  })

}
//#endregion


//#region READING TOKEN WALLET BALANCES
const getAccount_ACA_Balance = async (accountAddress) => {
  if (accountAddress && ACAinstance)
  {
    console.log("Getting account ACA Balance Please wait");
    const ACA_BalanceWEI = await ACAinstance.balanceOf(accountAddress);
    const ACA_Balance    = formatUnits(ACA_BalanceWEI.toString()   , 12);
    return Number(ACA_Balance).toFixed(3);
  }
  else return null;
}

const getAccount_AUSD_Balance = async (accountAddress) => {
  if (accountAddress && AUSDinstance)
  {
    console.log("Getting account AUSD Balance Please wait");
    const AUSD_BalanceWEI = await AUSDinstance.balanceOf(accountAddress);
    const AUSD_Balance    = formatUnits(AUSD_BalanceWEI.toString()   , 12);
    return Number(AUSD_Balance).toFixed(3);
  }
  else return null;
}

const getAccount_DOT_Balance = async (accountAddress) => {
  if (accountAddress && DOTinstance)
  {
    console.log("Getting account DOT Balance Please wait");
    const DOT_BalanceWEI = await DOTinstance.balanceOf(accountAddress);
    const DOT_Balance    = formatUnits(DOT_BalanceWEI.toString()   , 10);
    return Number(DOT_Balance).toFixed(3);
  }
  else return null;
}

const getAccount_LDOT_Balance = async (accountAddress) => {
  if (accountAddress && LDOTinstance)
  {
    console.log("Getting account LDOT Balance Please wait");
    const LDOT_BalanceWEI = await LDOTinstance.balanceOf(accountAddress);
    const LDOT_Balance    = formatUnits(LDOT_BalanceWEI.toString()   , 10);
    return Number(LDOT_Balance).toFixed(3);
  }
  else return null;
}

const getAccount_STR1_Balance = async (accountAddress) => {
  if (accountAddress && ntt54StgydotLDOT)
  {
    console.log("Getting account STR1 / ntt54StgydotLDOT Balance Please wait");
    const STR1_BalanceWEI = await ntt54StgydotLDOT.balanceOf(accountAddress);
    const STR1_Balance    = formatUnits(STR1_BalanceWEI.toString()   , 10);
    console.log(` ************************************** `);
    console.log(`USER ACCOUNT BALANCE OF ntt54StgydotLDOT ${STR1_Balance.toString()} ${STR1_BalanceWEI} ${Number(STR1_Balance).toFixed(3)}`);
    console.log(` ************************************** `);

    return Number(STR1_Balance).toFixed(3);
  }
  else return null;
}
//#endregion

//#region
// //NO   ntt54StgyAUSDincome
// const getAccount_STR1_Balance = async (accountAddress) => {
//   // if (accountAddress && ntt54StgyAUSDincome)
//   // {
//   //   console.log("Getting account STR1 / ntt54StgyAUSDincome Balance Please wait");
//   //   const STR1_BalanceWEI = await ntt54StgyAUSDincome.balanceOf(accountAddress);
//   //   const STR1_Balance    = formatUnits(STR1_BalanceWEI.toString()   , 10);
//   //   return Number(STR1_Balance).toFixed(3);
//   // }
//   // else return null;
// }

// ////NO  ntt54StgyDOTincome
// const getAccount_STR2_Balance = async (accountAddress) => {
//   // if (accountAddress && ntt54StgyDOTincome)
//   // {
//   //   console.log("Getting account STR2  / ntt54StgyDOTincome Balance Please wait");
//   //   const STR2_BalanceWEI = await ntt54StgyDOTincome.balanceOf(accountAddress);
//   //   const STR2_Balance    = formatUnits(STR2_BalanceWEI.toString()   , 10);
//   //   return Number(STR2_Balance).toFixed(3);
//   // }
//   // else return null;
//   return null;
// }

// ////NO  ntt54StgyACAincome
// const getAccount_STR3_Balance = async (accountAddress) => {
//   // if (accountAddress && ntt54StgyACAincome)
//   // {
//   //   console.log("Getting account STR3 / ntt54StgyACAincome Balance Please wait");
//   //   const STR3_BalanceWEI = await ntt54StgyACAincome.balanceOf(accountAddress);
//   //   const STR3_Balance    = formatUnits(STR3_BalanceWEI.toString()   , 10);
//   //   return Number(STR3_Balance).toFixed(3);
//   // }
//   // else return null;
//   return null;
// }
//#endregion


const getStrategy_AUSD_Balance = async () => {
  if (ntt54StgydotLDOT_address && AUSDinstance)
  {
    console.log("Getting ntt54StgydotLDOT AUSD Balance Please wait");
    const AUSD_BalanceWEI = await AUSDinstance.balanceOf(ntt54StgydotLDOT_address);
    const AUSD_Balance    = formatUnits(AUSD_BalanceWEI.toString()   , 12);
    return Number(AUSD_Balance).toFixed(3);
  }
  else return null;
}
const getStrategy_ACA_Balance = async () => {
  if (ntt54StgydotLDOT_address && ACAinstance)
  {
    console.log("Getting ntt54StgydotLDOT ACA Balance Please wait");
    const ACA_BalanceWEI = await ACAinstance.balanceOf(ntt54StgydotLDOT_address);
    const ACA_Balance    = formatUnits(ACA_BalanceWEI.toString()   , 12);
    return Number(ACA_Balance).toFixed(3);
  }
  else return null;
}
const getStrategy_DOT_Balance = async () => {
  if (ntt54StgydotLDOT_address && DOTinstance)
  {
    console.log("Getting ntt54StgydotLDOT DOT Balance Please wait");
    const DOT_BalanceWEI = await DOTinstance.balanceOf(ntt54StgydotLDOT_address);
    const DOT_Balance    = formatUnits(DOT_BalanceWEI.toString()   , 10);
    return Number(DOT_Balance).toFixed(3);
  }
  else return null;
}
const getStrategy_LDOT_Balance = async () => {
  if (ntt54StgydotLDOT_address && LDOTinstance)
  {
    console.log("Getting ntt54StgydotLDOT LDOT Balance Please wait");
    const LDOT_BalanceWEI = await LDOTinstance.balanceOf(ntt54StgydotLDOT_address);
    const LDOT_Balance    = formatUnits(LDOT_BalanceWEI.toString()   , 10);
    return Number(LDOT_Balance).toFixed(3);
  }
  else return null;
}


const startStrategy = async () => {
  if (ntt54StgydotLDOT_address && ntt54StgydotLDOT)
  {
    console.log(`Running startStrategy `);
    return new Promise( async (resolve,reject) => {
      const tx = await ntt54StgydotLDOT.startManagingProcees();
      tx.wait().then( message => {
        console.log(`startStrategy message: `,message);
        resolve(message);
      })
      .catch( error => reject(error));

    })
  }
  
};

const stopStrategy = async () => {
  if (ntt54StgydotLDOT_address && ntt54StgydotLDOT)
  {
    console.log(`Running stopStrategy `);
    return new Promise( async (resolve,reject) => {
      const tx = await ntt54StgydotLDOT.stopManagingProcees();
      tx.wait().then( message => {
        console.log(`stopStrategy message: `,message);
        resolve(message);
      })
      .catch( error => reject(error));

    })
  }
  
};



export {
  setInstances,
  getBasicInfo,
  getAccountDetailedInfo,
  depositDOT,
  stakeDOT,
  unstakeDOT,
  updateFrequency,
  getAccount_ACA_Balance,
  getAccount_AUSD_Balance,
  getAccount_DOT_Balance,
  getAccount_LDOT_Balance,
  getAccount_STR1_Balance,

  getStrategy_AUSD_Balance,
  getStrategy_ACA_Balance,
  getStrategy_DOT_Balance,
  getStrategy_LDOT_Balance,
  
  deposit_FeesToStrategy,
  startStrategy,
  stopStrategy,

}