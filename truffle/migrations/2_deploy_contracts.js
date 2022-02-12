const CryptoStackMain = artifacts.require('CryptoStackMain');
const CryptoStackRewardNFT = artifacts.require('CryptoStackRewardNFT');

module.exports = async function(deployer) {
    await deployer.deploy(CryptoStackMain);
    await deployer.deploy(CryptoStackRewardNFT);

    const CSMain = await CryptoStackMain.deployed();
    const CSNFT = await CryptoStackRewardNFT.deployed();

    const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");
    await CSNFT.grantRole(MINTER_ROLE, CSMain.address);
    await CSMain.setNFTContractAddress(CSNFT.address);
}