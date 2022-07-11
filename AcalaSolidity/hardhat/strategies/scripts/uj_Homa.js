 //***** Smart Contract Address *****/
 const scAddress = "0xA948Ec62b78324036E3F18f9E592d9de4E6a1742";   
 //*****/

const { calcEthereumTransactionParams } = require("@acala-network/eth-providers");
const { ACA, DOT, AUSD, LDOT, DEX, Schedule, Honzon, Homa } = require("@acala-network/contracts/utils/Address");
const { Contract } = require("ethers");
const { formatUnits, parseUnits } = require("ethers/lib/utils");

const DEXContract = require("@acala-network/contracts/build/contracts/DEX.json");
const TokenContract = require("@acala-network/contracts/build/contracts/Token.json");
const HonzonContract = require("@acala-network/contracts/build/contracts/Honzon.json");
const HomaContract = require("@acala-network/contracts/build/contracts/Homa.json");


// const ntt54StakeDOTArtifact = require("../artifacts/contracts/ntt54StakeDOT.sol/ntt54StakeDOT.json");
const ntt54StgydotLDOTArtifact = require("../artifacts/contracts/ntt54StgydotLDOT.sol/ntt54StgydotLDOT.json");


 
//ORIGINAL
const txFeePerGas = '199999946752';
const storageByteDeposit = '100000000000000'; 

 
async function main() {

  console.log(`********************************************************`);
  // const getHomaCode = await ethers.provider.getCode('0x0000000000000000000000000000000000000805');
  // const getHomaCode = await ethers.provider.getCode('0x0000000000000000000000000000000000000808');

  // returns 0x which indicates incentives precompile is not deployed in Mandala yet
  // console.log(`getHomaCode: `,getHomaCode);
  console.log(`********************************************************`);

  let blockNumber = await ethers.provider.getBlockNumber();
  const ethParams = calcEthereumTransactionParams({
    gasLimit: '21000010',
    validUntil: (blockNumber + 100).toString(),
    storageLimit: '640010',
    txFeePerGas,
    storageByteDeposit
  });

  //Instantiate smart contract
  console.log("Getting signers");
  
  
  const [deployer, alice] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const aliceAddress = await alice.getAddress();
  console.log(`Address of the deployer is: ${deployerAddress} alice: ${aliceAddress}`);
  console.log("");
  console.log("");

  console.log("Instantiating DEX and token smart contracts");
  const DEXinstance  = new Contract(DEX, DEXContract.abi, deployer);
  // const Honzoninstance  = new Contract(Honzon, HonzonContract.abi, deployer);
  const Homainstance  = new Contract(Homa, HomaContract.abi, deployer);
  const ACAinstance  = new Contract(ACA, TokenContract.abi, deployer);
  const AUSDinstance = new Contract(AUSD, TokenContract.abi, deployer);

  const DOTinstance  = new Contract(DOT, TokenContract.abi, deployer);
  const LDOTinstance  = new Contract(LDOT, TokenContract.abi, deployer);

  console.log("DEX instantiated with address", DEXinstance.address);
  // console.log("Honzon instantiated with address", Honzoninstance.address);
  console.log("Homa instantiated with address", Homainstance.address);
  console.log("ACA token instantiated with address", ACAinstance.address);
  console.log("AUSD token instantiated with address", AUSDinstance.address);
  console.log("DOT token instantiated with address", DOTinstance.address);
  console.log("LDOT token instantiated with address", LDOTinstance.address);
  console.log(`********************************************************`);


  const sc_instance = new Contract(scAddress, ntt54StgydotLDOTArtifact.abi, deployer);
  console.log("sc_instance is deployed at address:", sc_instance.address);
  console.log(`********************************************************`);

  console.log(``);
  console.log("Getting inital token balances");
  const initialAcaBalance  = await ACAinstance.balanceOf(deployer.address);
  const initialAusdBalance = await AUSDinstance.balanceOf(deployer.address);
  const initialDotBalance  = await DOTinstance.balanceOf(deployer.address);
  const initialLDotBalance = await LDOTinstance.balanceOf(deployer.address);
  // const initialDotBalance2 = await ntt54StakeDOTinstance.balanceOf(deployer.address);
  console.log("Inital %s ACA balance: %s ACA", deployer.address, formatUnits(initialAcaBalance.toString(), 12));
  console.log("Inital %s AUSD balance: %s AUSD", deployer.address, formatUnits(initialAusdBalance.toString(), 12));
  console.log("Inital %s DOT balance: %s DOT", deployer.address, formatUnits(initialDotBalance.toString(), 10));
  console.log("Inital %s LDOT balance: %s LDOT", deployer.address, formatUnits(initialLDotBalance.toString(), 10));
  
  console.log(``);
  console.log(`********************************************************`);
  let homaExchangeRate = await Homainstance.getExchangeRate(); //Get exchange rate of liquid currency to staking currency (liquid : staking). range of [0.000000000000000000, 340282366920938463463.374607431768211455]
  const one = ethers.BigNumber.from(`${ parseUnits("1", 36)}`)
  let mandala_DOT_LDOT_WEI = one.div(homaExchangeRate);
  let mandala_DOT_LDOT = formatUnits(mandala_DOT_LDOT_WEI.toString(), 18);
  console.log(`===. one: ${one.toString()}  homaExchangeRate: ${homaExchangeRate.toString()}`);
  console.log("BLOCK#:%s *** FOR 1 DOT MINTED WE GET %s LDOT_WEI %s LDOT ***",blockNumber,(mandala_DOT_LDOT_WEI).toString(),formatUnits(mandala_DOT_LDOT_WEI.toString(), 18));
  console.log(``);
  console.log(``);

  const homaEstimatedRewardRate = await Homainstance.getEstimatedRewardRate();
  const homaCommisionRate = await Homainstance.getCommissionRate();
  const homaFastMatchFeeRate = await Homainstance.getFastMatchFee();
  console.log("homaExchangeRate %s ",formatUnits(homaExchangeRate.toString(), 16));   //0.11 with 18 decimals or 11% with 16 decimals
  
  //Estimate Reward Per Era 0.0005 % 
  console.log("homaEstimatedRewardRate %s %",formatUnits(homaEstimatedRewardRate.toString(), 16));
  console.log("homaCommisionRate %s % ",formatUnits(homaCommisionRate.toString(), 16));  //10%
  console.log("homaFastMatchFeeRate %s %",formatUnits(homaFastMatchFeeRate.toString(), 16)); //1%
  console.log(`********************************************************`);
  // BLOCK#:1485215 *** FOR 1 DOT MINTED WE GET 9063409787464732795 LDOT_WEI 9.063409787464732795 LDOT ***
  // BLOCK#:1485415 *** FOR 1 DOT MINTED WE GET 9063246647923882444 LDOT_WEI 9.063246647923882444 LDOT ***
  // BLOCK#:1485428 *** FOR 1 DOT MINTED WE GET 9063246647923882444 LDOT_WEI 9.063246647923882444 LDOT ***
  // BLOCK#:1485435 *** FOR 1 DOT MINTED WE GET 9063246647923882444 LDOT_WEI 9.063246647923882444 LDOT ***
  // BLOCK#:1485456 *** FOR 1 DOT MINTED WE GET 9063246647923882444 LDOT_WEI 9.063246647923882444 LDOT ***
  // BLOCK#:1485493 *** FOR 1 DOT MINTED WE GET 9063205863497496711 LDOT_WEI 9.063205863497496711 LDOT ***
  // BLOCK#:1485523 *** FOR 1 DOT MINTED WE GET 9063205863497496711 LDOT_WEI 9.063205863497496711 LDOT ***
  // BLOCK#:1485872 *** FOR 1 DOT MINTED WE GET 9062961160793264371 LDOT_WEI 9.062961160793264371 LDOT ***
  // Inital 0xd60135d1d501fb45B7dD2B3761E4225cF80f96A6 LDOT balance: 1.0015796268 LDOT
  // BLOCK#:1485890 *** FOR 1 DOT MINTED WE GET 9062920377651564936 LDOT_WEI 9.062920377651564936 LDOT ***
  // BLOCK#:1485918 *** FOR 1 DOT MINTED WE GET 9062920377651564936 LDOT_WEI 9.062920377651564936 LDOT ***
  //IT LOOOKS THAT BUMP ERA FREQUENCY IS 120 BLOKCS I.E. EVERY ABOUT 12 MINS



  //DEX
  // console.log("Getting liquidity pools");
  // const initialAcaAusdLP  = await DEXinstance.getLiquidityPool(ACA, AUSD);
  // const initialAcaDotLP   = await DEXinstance.getLiquidityPool(ACA, DOT);
  // const initialDotAusdLP  = await DEXinstance.getLiquidityPool(DOT, AUSD);
  // const initialLDotAusdLP = await DEXinstance.getLiquidityPool(LDOT, AUSD);
  // console.log("Initial ACA - AUSD liquidity pool: %s ACA - %s AUSD", formatUnits(initialAcaAusdLP[0].toString(), 12), formatUnits(initialAcaAusdLP[1].toString(), 12));
  // console.log("Initial ACA - DOT liquidity pool: %s ACA - %s DOT", formatUnits(initialAcaDotLP[0].toString(), 12), formatUnits(initialAcaDotLP[1].toString(), 12));
  // console.log("Initial DOT - AUSD liquidity pool: %s DOT - %s AUSD", formatUnits(initialDotAusdLP[0].toString(), 12), formatUnits(initialDotAusdLP[1].toString(), 12));
  // console.log("Initial LDOT - AUSD liquidity pool: %s LDOT - %s AUSD", formatUnits(initialLDotAusdLP[0].toString(), 12), formatUnits(initialLDotAusdLP[1].toString(), 12));


  // console.log("Getting liquidity pool token addresses");
  // const acaAusdLPTokenAddress  = await DEXinstance.getLiquidityTokenAddress(ACA, AUSD);
  // const acaDotLPTokenAddress   = await DEXinstance.getLiquidityTokenAddress(ACA, DOT);
  // const dotAusdLPTokenAddress  = await DEXinstance.getLiquidityTokenAddress(DOT, AUSD);
  // const ldotAusdLPTokenAddress = await DEXinstance.getLiquidityTokenAddress(LDOT, AUSD);
  // console.log("Liquidity pool token address for ACA - AUSD:", acaAusdLPTokenAddress);
  // console.log("Liquidity pool token address for ACA - DOT:" , acaDotLPTokenAddress);
  // console.log("Liquidity pool token address for DOT - AUSD:", dotAusdLPTokenAddress);
  // console.log("Liquidity pool token address for LDOT - AUSD:", ldotAusdLPTokenAddress);
  // console.log(`********************************************************`);


  console.log('Getting expected swap target amounts');
  const path1 = [LDOT, AUSD];
          // const path1 = [ACA, AUSD];
          // const path1 = [DOT, AUSD];
          // const path2 = [ACA, AUSD, DOT];
          // const supply = initialAcaBalance.div(1000);
  // const supply = initialLDotBalance;
  const supply = parseUnits(`1`, 10);


  const expectedTarget1 = await DEXinstance.getSwapTargetAmount(path1, supply);
  // const expectedTarget2 = await DEXinstance.getSwapTargetAmount(path2, supply);
  console.log('Expected target when using path LDOT -> AUSD: %s AUSD', formatUnits(expectedTarget1.toString(), 12));
  // console.log('Expected target when using path ACA -> AUSD: %s AUSD', formatUnits(expectedTarget1.toString(), 12));
  // console.log(
  //   'Expected target when using path ACA -> AUSD -> DOT: %s DOT',
  //   formatUnits(expectedTarget2.toString(), 10)
  // );
  console.log(`********************************************************`);

  console.log(``);
  console.log('Swapping with exact supply');
  // await DEXinstance.swapWithExactSupply(path1, supply, 1);
  // await DEXinstance.swapWithExactSupply(path2, supply, 1);

  // const halfwayAcaBalance  = await ACAinstance.balanceOf(deployer.address);
  // const halfwayAusdBalance = await AUSDinstance.balanceOf(deployer.address);
  // const halfwayDotBalance  = await DOTinstance.balanceOf(deployer.address);
  // const halfwayLDotBalance = await LDOTinstance.balanceOf(deployer.address);
  // console.log('Halfway %s ACA balance: %s ACA', deployer.address, formatUnits(halfwayAcaBalance.toString(), 12));
  // console.log('Halfway %s AUSD balance: %s AUSD', deployer.address, formatUnits(halfwayAusdBalance.toString(), 12));
  // console.log('Halfway %s DOT balance: %s DOT', deployer.address, formatUnits(halfwayDotBalance.toString(), 10));
  // console.log('Halfway %s LDOT balance: %s LDOT', deployer.address, formatUnits(halfwayLDotBalance.toString(), 10));
  console.log(`********************************************************`);

  //HOMA
  console.log(``);
  console.log('HOMA MINTING');
  // const DOTtoMINT = ethers.BigNumber.from(`${parseUnits("1", 10)}`)
  // const DOTtoMINT = parseUnits(`1`, 10);
  // console.log(`DOTtoMINT: ${DOTtoMINT.toString()}`);
  // const mint_result = await Homainstance.mint(DOTtoMINT);
  // console.log(`mint_result:=>`,JSON.stringify(mint_result));
  console.log(`********************************************************`);

  
    //DOES NOT WORK BECAUSE THE INCETIVE PRECOMPILE IS NOT DEPLOYED
    // console.log(`DEX ACA_DOT Pool`);
    // const reward_amount = await incentives.getIncentiveRewardAmount( 1, acaDotLPTokenAddress, ACA);
    // const reward_amount = await incentives.getIncentiveRewardAmount( 1, acaAusdLPTokenAddress, ACA);
    // console.log(`DEX ACA_DOT Pool reward_amount: `,reward_amount);
    // const dex_reward_rate = await incentives.getDexRewardRate(ACA);
    // console.log(`DEX ACA_DOT Pool dex_reward_rate: `,dex_reward_rate);


  
  //#region SMART CONRACT INTERACTION sc_instance
  // accounts: ["c2da717cac753da154a0b6c7c77537171e0a0fa11ad95338267658a10037b66f","c112ae37b825537ebf2b3c390bc5ffbee43a5b8fc0e1f31637991bf6a8cb85d0"],

  //#region Initial Values
  console.log(``);
  console.log(`**************************** INITIAL VALUES ****************************`);
const msg_sender = deployerAddress;
  let frequency = await sc_instance.frequency();
  let managingProceedsState = await sc_instance.managingProceedsState();
  let DOT_LDOT = await sc_instance.DOT_LDOT();
  const admin = await sc_instance.admin();
  console.log(`INITIAL VALUES=> frequency: ${frequency} managingProceedsState: ${managingProceedsState} admin: ${admin} DOT_LDOT: ${DOT_LDOT}`);

  let total_DOTinAccount = await sc_instance.total_DOTinAccount();
  let total_LDOTinAccount = await sc_instance.total_LDOTinAccount();
  
  let excessLDOTinAccount = await sc_instance.excessLDOTinAccount();
  let amountAUSDtoSwaptoACA = await sc_instance.amountAUSDtoSwaptoACA();
  let total_STGausd = await sc_instance.total_STGausd();
  let total_STGaca = await sc_instance.total_STGaca();
  
  console.log(`INITIAL VALUES=> total_DOTinAccount: ${total_DOTinAccount} total_LDOTinAccount: ${total_LDOTinAccount} excessLDOTinAccount: ${excessLDOTinAccount}`);
  console.log(`INITIAL VALUES=> amountAUSDtoSwaptoACA: ${amountAUSDtoSwaptoACA} total_STGausd: ${total_STGausd} total_STGaca: ${total_STGaca}`);
  let userAccounts_length = await sc_instance.userAccounts.length;
  let userAccounts_0 = await sc_instance.userAccounts[0];
  let isAccountRegistered = await sc_instance.registeredUserAccounts(msg_sender);
  console.log(`INITIAL VALUES=> userAccounts_length: ${userAccounts_length} userAccounts_0: ${userAccounts_0} isAccountRegistered: ${isAccountRegistered}`);
 

  let totalSupply_StrategyTokens = await sc_instance.totalSupply();
  let user_balance_StrategyTokens = await sc_instance.balanceOf(msg_sender);
  console.log(`INITIAL VALUES=> totalSupply_StrategyTokens: ${totalSupply_StrategyTokens} user_balance_StrategyTokens: ${user_balance_StrategyTokens}`);

  let userBalances_DOT = await sc_instance.userBalances(DOT , msg_sender);
  let userBalances_LDOT = await sc_instance.userBalances(LDOT , msg_sender);
  let userBalances_AUSD = await sc_instance.userBalances(AUSD, msg_sender);
  let userBalances_ACA = await sc_instance.userBalances(ACA, msg_sender);
  console.log(`INITIAL VALUES=> userBalances_DOT: ${userBalances_DOT} userBalances_LDOT: ${userBalances_LDOT} userBalances_AUSD: ${userBalances_AUSD} userBalances_ACA: ${userBalances_ACA}`);

  let userPercentAUSD = await sc_instance.userPercentAUSD(msg_sender);
  let userSTGausd = await sc_instance.userSTGausd(msg_sender);
  let userSTGaca = await sc_instance.userSTGaca(msg_sender);
  console.log(`INITIAL VALUES=> userPercentAUSD: ${userPercentAUSD} userSTGausd: ${userSTGausd} userSTGaca: ${userSTGaca}`);

  let totalACAavailableBalance = await sc_instance.totalACAavailableBalance();
  let totalAUSDavailableBalance = await sc_instance.totalAUSDavailableBalance();
  console.log(`INITIAL VALUES=> totalACAavailableBalance: ${totalACAavailableBalance} totalAUSDavailableBalance: ${totalAUSDavailableBalance}`);

  //#endregion Initial Values
  

  //#region Finance Smart Contract Strategy DONE
  console.log(``);
  console.log(`**************************** FINANCE SC ****************************`);
  const sc_initialAcaBalance  = await ACAinstance.balanceOf(scAddress);
  const financeACAamount =  parseUnits("1", 12);
  // await ACAinstance.approve(scAddress, financeACAamount);
  // await sc_instance.transferFeesBalance( financeACAamount );
  let sc_AcaBalance  = await ACAinstance.balanceOf(scAddress);
  console.log(`FINANCE SC=> sc_initialAcaBalance: ${sc_initialAcaBalance} sc_AcaBalance: ${sc_AcaBalance}`);
  //#endregion Finance Smart Contract Strategy


  //#region User Deposits DOT
  console.log(``);
  console.log(`**************************** USER DEPOSITS DOT ****************************`);
  //USER APPROVES TO TRANSFER DOT TO THE SC
  const financeDOTamount =  parseUnits("1", 10);
  await DOTinstance.approve(scAddress, financeDOTamount);

  //USER DEPSOTIS 1 DOT 
  let inital_sc_DOT_Balance  = await DOTinstance.balanceOf(scAddress);

  // const user_percentAUSD = parseUnits("60", 1);   //60% in AUSD 40% in ACA
  // await sc_instance.depositDOT( financeDOTamount, 60 );

  // const DOTtoMINT = ethers.BigNumber.from(`${parseUnits("1", 10)}`) 
  // const user_percentAUSD_WEI = ethers.BigNumber.from(`60`);  
  // const financeDOTamount_WEI = ethers.BigNumber.from(`10000000000`);   //DOT 10 DECIMALS
  // await sc_instance.depositDOT( parseUnits("1", 10), user_percentAUSD );

  // console.log(` ***1*** If this is the first time the user depostis DOT to the strategy then his account is registered and percent of AUSD is recorded`);
  // // if( !registeredUserAccounts[msg.sender] )
  // isAccountRegistered = await sc_instance.registeredUserAccounts(msg_sender);
  // userAccounts_length = await sc_instance.userAccounts.length;
  // userAccounts_0 = await sc_instance.userAccounts(0);
  // userPercentAUSD = await sc_instance.userPercentAUSD(msg_sender);
  // console.log(`USER DEPOSITS DOT=> userAccounts_length: ${userAccounts_length} userAccounts_0: ${userAccounts_0} Expect ${msg_sender} isAccountRegistered: ${isAccountRegistered} Expect true userPercentAUSD: ${userPercentAUSD} Expect 60% in uint`);
  

  console.log(` ***2*** DOT is transferred from user's accoutn to the smart contract`);

  userBalances_DOT = await sc_instance.userBalances(DOT , msg_sender);
  console.log(` ***3*** User's balance as recorded in the smart contract for DOT is increased userBalances_DOT: ${userBalances_DOT}`);

  let userBalances_STG1 = await sc_instance.userBalances(scAddress , msg_sender);
  let userMintedBalance_STG1 = await sc_instance.balanceOf(msg_sender);
  console.log(` ***4*** An equal number to DOT tokens deposited Strategy Tokens are minted to the user's account. This is the proof of ownership of DOT in the strategy userBalances_STG1: ${userBalances_STG1} userMintedBalance_STG1: ${userMintedBalance_STG1}`);

  let sc_DOT_Balance  = await DOTinstance.balanceOf(scAddress);
  let differenceLDOT = Number(formatUnits(sc_DOT_Balance.toString(),10)) -  Number(formatUnits(inital_sc_DOT_Balance.toString(),10));
  console.log(`***6*** inital_sc_DOT_Balance: ${inital_sc_DOT_Balance} sc_DOT_Balance: ${sc_DOT_Balance} differenceLDOT: ${differenceLDOT}`);
  //#endregion User Deposits DOT
  
  


  //#region User Stakes DOT
  console.log(``);
  console.log(`**************************** USER STaKES DOT ****************************`);
  //BEFORE
  let sc_LDOT_Balance  = await LDOTinstance.balanceOf(scAddress);
  let userStakedDOT = await sc_instance.userStakedDOT(msg_sender);
  userSTGausd = await sc_instance.userSTGausd(msg_sender);
  userSTGaca = await sc_instance.userSTGaca(msg_sender);
  console.log(`Initial userStakedDOT: ${userStakedDOT} userBalances_DOT: ${userBalances_DOT} sc_LDOT_Balance: ${sc_LDOT_Balance}`)
  total_STGausd = await sc_instance.total_STGausd();
  total_STGaca = await sc_instance.total_STGaca();
  total_DOTinAccount = await sc_instance.total_DOTinAccount();
  total_LDOTinAccount = await sc_instance.total_LDOTinAccount();
  userBalances_LDOT = await sc_instance.userBalances(LDOT , msg_sender);
  console.log(`USER STaKES DOT BEFORE ***1*** userSTGausd: ${userSTGausd} userSTGaca: ${userSTGaca} total_STGausd: ${total_STGausd} total_STGaca: ${total_STGaca} total_DOTinAccount:${total_DOTinAccount} total_LDOTinAccount: ${total_LDOTinAccount} userBalances_LDOT: ${userBalances_LDOT}`);

  // await sc_instance.stakeDOT();

  //AFTER
  sc_LDOT_Balance  = await LDOTinstance.balanceOf(scAddress);
  userStakedDOT = await sc_instance.userStakedDOT(msg_sender);
  userSTGausd = await sc_instance.userSTGausd(msg_sender);
  userSTGaca = await sc_instance.userSTGaca(msg_sender);
  total_STGausd = await sc_instance.total_STGausd();
  total_STGaca = await sc_instance.total_STGaca();
  total_DOTinAccount = await sc_instance.total_DOTinAccount();
  total_LDOTinAccount = await sc_instance.total_LDOTinAccount();
  userBalances_LDOT = await sc_instance.userBalances(LDOT , msg_sender);
  console.log(`USER STaKES DOT AFTER ***2*** userSTGausd: ${userSTGausd} userSTGaca: ${userSTGaca} total_STGausd: ${total_STGausd} total_STGaca: ${total_STGaca} sc_LDOT_Balance: ${sc_LDOT_Balance} total_DOTinAccount:${total_DOTinAccount} total_LDOTinAccount: ${total_LDOTinAccount} userBalances_LDOT: ${userBalances_LDOT}`);

  //#endregion User Stakes DOT



  //#region unstakeAndWithdrawDOT
  console.log(``);
  console.log(`**************************** USER UNSTAKES AND WITHDRAWS DOT ****************************`);

  // await sc_instance.unstakeAndWithdrawDOT();

  sc_LDOT_Balance  = await LDOTinstance.balanceOf(scAddress);
  sc_DOT_Balance  = await DOTinstance.balanceOf(scAddress);

  userStakedDOT = await sc_instance.userStakedDOT(msg_sender);
  userSTGausd = await sc_instance.userSTGausd(msg_sender);
  userSTGaca = await sc_instance.userSTGaca(msg_sender);
  total_STGausd = await sc_instance.total_STGausd();
  total_STGaca = await sc_instance.total_STGaca();
  total_DOTinAccount = await sc_instance.total_DOTinAccount();
  total_LDOTinAccount = await sc_instance.total_LDOTinAccount();
  userBalances_LDOT = await sc_instance.userBalances(LDOT , msg_sender);
  userBalances_DOT = await sc_instance.userBalances(DOT , msg_sender);

  console.log(`USER UNSTAKES AND WITHDRAWS DOT  userSTGausd: ${userSTGausd} userSTGaca: ${userSTGaca} total_STGausd: ${total_STGausd} total_STGaca: ${total_STGaca} sc_LDOT_Balance: ${sc_LDOT_Balance} total_DOTinAccount:${total_DOTinAccount} total_LDOTinAccount: ${total_LDOTinAccount} userBalances_LDOT: ${userBalances_LDOT} userBalances_DOT: ${userBalances_DOT} sc_DOT_Balance: ${sc_DOT_Balance}`);
  //#endregion unstakeAndWithdrawDOT

  
  //#region manageProceeds
  console.log(``);
  console.log(`**************************** MANAGE PROCEEDS ****************************`);
  let epochNumber = await sc_instance.epochNumber();
  sc_LDOT_Balance  = await LDOTinstance.balanceOf(scAddress);
  sc_DOT_Balance  = await DOTinstance.balanceOf(scAddress);
  total_DOTinAccount = await sc_instance.total_DOTinAccount();
  homaExchangeRate = await sc_instance.homaExchangeRate();
  DOT_LDOT = await sc_instance.DOT_LDOT();
  let initialDOTCapitaltoLDOT = await sc_instance.initialDOTCapitaltoLDOT();
  console.log(`MANAGE PROCEEDS => epochNumber: ${epochNumber} sc_LDOT_Balance: ${sc_LDOT_Balance} sc_DOT_Balance:${sc_DOT_Balance} total_DOTinAccount: ${total_DOTinAccount} homaExchangeRate: ${homaExchangeRate} DOT_LDOT: ${DOT_LDOT} initialDOTCapitaltoLDOT: ${initialDOTCapitaltoLDOT}`);


  // await sc_instance.startManagingProcees();

  let sc_AUSD_Balance  = await AUSDinstance.balanceOf(scAddress);
  let sc_ACA_Balance  = await ACAinstance.balanceOf(scAddress);
  let freshAUSDrewards = await sc_instance.freshAUSDrewards();
  let freshACArewards = await sc_instance.freshACArewards();
  userBalances_AUSD = await sc_instance.userBalances(AUSD , msg_sender);
  userBalances_ACA = await sc_instance.userBalances(ACA , msg_sender);
  console.log(`MANAGE PROCEEDS => sc_AUSD_Balance: ${sc_AUSD_Balance} sc_ACA_Balance:${sc_ACA_Balance} freshAUSDrewards: ${freshAUSDrewards} freshACArewards: ${freshACArewards} userBalances_AUSD: ${userBalances_AUSD} userBalances_ACA: ${userBalances_ACA}`);

  //#endregion 

  

  //#region claimRewards
  console.log(``);
  console.log(`**************************** CLAIM REWARDS ****************************`);

  // await sc_instance.claimRewards();

  let AUSD_Balance  = await AUSDinstance.balanceOf(msg_sender);
  let ACA_Balance  = await ACAinstance.balanceOf(msg_sender);
  userBalances_AUSD = await sc_instance.userBalances(AUSD , msg_sender);
  userBalances_ACA = await sc_instance.userBalances(ACA , msg_sender);
  console.log(`MANAGE PROCEEDS => AUSD_Balance: ${AUSD_Balance} ACA_Balance:${ACA_Balance} userBalances_AUSD: ${userBalances_AUSD} userBalances_ACA: ${userBalances_ACA}`);

  //#endregion 


  //#endregion SMART CONRACT INTERACTION sc_instance


  
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    // process.exit(1);
  });