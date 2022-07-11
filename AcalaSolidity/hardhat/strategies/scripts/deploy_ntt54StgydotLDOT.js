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
// ntt54StgydotLDOT address: 0xeA03b976E22e283C8d9ADb8CcB2f52Ff45b85577
// ntt54StgydotLDOT address: 0x53B29aD832b7EA23cF76Eb3C7F48Aa555B9b76a9
// ntt54StgydotLDOT address: 0x9F4D61Ad1350Cb7368eDBc39f8F9d12F48500ae3
// ntt54StgydotLDOT address: 0x66f888C2f2e7D7a09B37C4b025376AeBFDc1AFa0
// ntt54StgydotLDOT address: 0x16a13a77EA27dfc298647974d35D2A943C3745E8
// ntt54StgydotLDOT address: 0x0B6f48738FC60c24466C419eb15cfB340Dea1Eb9
// ntt54StgydotLDOT address: 0xEdFaC3E5dDa05704A98312B64e71b0Ef8A8bbA80
// ntt54StgydotLDOT address: 0xFF7B1a2c0c43D6bA2AA910A77dab7683ca98B3Fc
// ntt54StgydotLDOT address: 0x43bb750dc0f08ede4857F1D56194D0af82F100AA
// ntt54StgydotLDOT address: 0x956F0FEC929A4AaA5e2Ea9c29A6f4f62f5FFf326
// ntt54StgydotLDOT address: 0xaeA9Fd423d8859C9a332329C5231DD4B2568f7aF
// ntt54StgydotLDOT address: 0x9eb6172518909ba1d42A2E296198F025Cf371bBA
// ntt54StgydotLDOT address: 0xF8DF105AE4B0A4719EdE69854F139c96e137B650
// ntt54StgydotLDOT address: 0x2f16E21d6Ce5f5d8e74b650DaA59C3de48E8Da9d
// ntt54StgydotLDOT address: 0x4850246dfc6ABE21c1023c661c6e3DFA0CF60f7E
// ntt54StgydotLDOT address: 0xcF7d76C61F3Bf0c63cF8575617d4A1f3a08aa3A3
// ntt54StgydotLDOT address: 0x41734D6253a9031691c2004c73F0ca66Ca41b9a5
// ntt54StgydotLDOT address: 0x79EbF93385113c5c37039B659bf27945Dc8B6426
// ntt54StgydotLDOT address: 0x14Ec4AcDeCD73A6536683C129d5050D5516B48Df
// ntt54StgydotLDOT address: 0x158854Da3E22C382c40F474e79128cc4326fD6Ec
// ntt54StgydotLDOT address: 0x0378d39bf7710008b3e7183b111D40D7b8E9C884
// ntt54StgydotLDOT address: 0x667c8981571f814464067354d08154F7B2c85fDd
// ntt54StgydotLDOT address: 0x5FC8190B9448D4abB4b85d6E9009720A35c9ED19
// ntt54StgydotLDOT address: 0x808aA9F4629981b98e64048761d49185Fb84f070
// ntt54StgydotLDOT address: 0x8963291Ba034F8Db699d45b18904c6eaEf1DBd7b

//MONITORING
// ntt54StgydotLDOT address: 0xA948Ec62b78324036E3F18f9E592d9de4E6a1742
// ntt54StgydotLDOT address: 0x7138f6818D6c6e2d59Fa787E7038839969BBb9de
// ntt54StgydotLDOT address: 0x7D4E9a8cB14dC6dcf7A057E9A7B283De0d91B17a
// ntt54StgydotLDOT address: 0xB97461C8F6195e4EE6aA89356A83fe6FC4BD72fE
// ntt54StgydotLDOT address: 0x5cfe4a7ECBe0445eb918BFB45dD485aDC0861BAD
// ntt54StgydotLDOT address: 0xc1E703eEb2793434D53b691A6Dd21Cd2B858Fc2D
// ntt54StgydotLDOT address: 0xB4a93e484e8A30dE75530d940D3B3604E619CEA3

// ntt54StgydotLDOT address: 0x24C6CC6AA45AC064065a40dAa7E47721aeaaCdE4

//FOR VIDEO
// ntt54StgydotLDOT address: 0xd9C61F207fC8495a7802d6522ad7eB2F98982da5
// ntt54StgydotLDOT address: 0x493a4bF6E5a9af6E21cB923BaE101189835Db44E
// ntt54StgydotLDOT address: 0x3f183eBf95256dA281D816Cb423B134253f9A44d
// ntt54StgydotLDOT address: 0x1aDC41d805f2B202AddE7e7d7ea90567Ee4F0410

// ntt54StgydotLDOT address: 0xA8f1240aC7649982d90c99f9f63d1E1D337AC107
// ntt54StgydotLDOT address: 0x58664662d7b7c157ED71960d6e1e1d8eb432E472

//IMPORTANT 2
// ntt54StgydotLDOT address: 0xeC3c6005F1669A92020717923DCD587e24b55274

//ntt54StgydotLDOT address: 0xcB52E2db09fC07dC20263f2C9EB418Fa51F00747
//ntt54StgydotLDOT address: 0x1BEaDcF812b31dA7E4e2574c43CF69d9aa200c44
// ntt54StgydotLDOT address: 0x215B5C6775339BCc9710bc342B2D38bf9BabeaaD
//ntt54StgydotLDOT address: 0x4132A808D7B5836c8c2429c1900d6000fB68EAE3

//IMPORTANT 3
// ntt54StgydotLDOT address: 0xD3AeF52E8151B42e436A02f280816c46cC01DC86


//FRESH 1
// ntt54StgydotLDOT address: 0xEbe911daF57b9c3fC72db5B9b8Da9789dd6A6Fcc
//FRESH 2
// ntt54StgydotLDOT address: 0x90067B8C5f8CB3AD71A6c5f54701823B6B745dd1 
