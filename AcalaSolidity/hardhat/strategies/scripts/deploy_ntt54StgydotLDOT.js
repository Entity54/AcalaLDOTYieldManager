const { txParams } = require("../utils/transactionHelper");

async function main() {
  const ethParams = await txParams();

  const [deployer] = await ethers.getSigners();

  const ntt54StgydotLDOT = await ethers.getContractFactory("ntt54StgydotLDOT");
  const instance = await ntt54StgydotLDOT.deploy({
    gasPrice: ethParams.txGasPrice,
    gasLimit: ethParams.txGasLimit,
  });

  console.log("ntt54StgydotLDOT address:", instance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

 
 
 


// yarn deploy_ntt54StgydotLDOT
// ****** SUCCESFUL ******  
//FOR VIDEO
// ntt54StgydotLDOT address: 0xd9C61F207fC8495a7802d6522ad7eB2F98982da5
//FRESH 1
// ntt54StgydotLDOT address: 0xEbe911daF57b9c3fC72db5B9b8Da9789dd6A6Fcc
//FRESH 2 1e11 WEBSITE ****** RUNNING ******
// ntt54StgydotLDOT address: 0x90067B8C5f8CB3AD71A6c5f54701823B6B745dd1 



//SHOULD BE PERFECT
// ntt54StgydotLDOT address: 0x4d0Af7AE82A972DedEc6fa6df5d07975A66A2c43

// ntt54StgydotLDOT address: 0x1A4f2250Eb106ADc639876140E596057F29925Bd
// ntt54StgydotLDOT address: 0x259d980431aAB218e2996f4bf418916809Ab799f
// ntt54StgydotLDOT address: 0xD5B3A1b864973de44b45DA557670D9236ECed1C5
// ntt54StgydotLDOT address: 0x7D386396d7e72047fD0961b98a9C6441407fc5bF
// ntt54StgydotLDOT address: 0x69E38BDB85d5949F7404a87009cDF70527B83C29
// ntt54StgydotLDOT address: 0xA3B01E84e2B987fAB7d1411c050896848c12B16B
// ntt54StgydotLDOT address: 0x86186eD0935a792b40f4929F30519a5f72E248be
// ntt54StgydotLDOT address: 0xEf7C0D7c3C4F4CcD5312ec475B6a37D6C0CcE936
// ntt54StgydotLDOT address: 0xde120da2dfe6e8D903b1748E4c00A2ecacc5594F
// ntt54StgydotLDOT address: 0xABcA329572A5Bc6586Be3C341e2Ba1b290DDe698
// ntt54StgydotLDOT address: 0x5045f772EE3181888f41B60c5E0a0a3E1BFAc37D

//LAST  DO NOT DELETE
// ntt54StgydotLDOT address: 0xa2e0f5BC894819224f3D6D44D562276e66676f45