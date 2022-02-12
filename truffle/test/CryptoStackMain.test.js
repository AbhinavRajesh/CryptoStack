const CryptoStackMain = artifacts.require('CryptoStackMain');
const CryptoStackRewardNFT = artifacts.require('CryptoStackRewardNFT');

contract('CryptoStackMain', (accounts) => {
    let CSMain, CSNFT;  
    const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");

    before(async () => {
        CSMain = await CryptoStackMain.deployed();
        CSNFT = await CryptoStackRewardNFT.deployed();  
        
        await CSNFT.grantRole(MINTER_ROLE, CSMain.address);
        await CSMain.setNFTContractAddress(CSNFT.address);
    });

    describe("Contract Deployment", async () => {
        it("contract deploys succesfully", async () => {
           assert.isDefined(CSMain.address);   
           assert.isDefined(CSNFT.address);
           
           assert.isTrue(await CSNFT.hasRole(MINTER_ROLE, CSMain.address));
        });
    });
});