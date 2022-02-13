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

    describe("Register users", async () => {
        let iUCount;

        before(async () => {
            iUCount = await CSMain.userCount();
            await CSMain.registerNewUser("myusername");
            await CSMain.registerNewUser("myusername", {from: accounts[1]});
        });

        it("user count is incremented", async () => {
            const fUCount = await CSMain.userCount();
            assert.equal((fUCount - iUCount).toString(), "2");
        });

        it("user details are stored and can be retrieved", async () => {
            const user = await CSMain.users(0);
            assert.equal(user.userAddress, accounts[0]);
            assert.equal(user.userName, "myusername");
        });

        it("user is identified as a registered user", async () => {
            let isUser = await CSMain.isRegisteredUser(accounts[0]);
            assert.isTrue(isUser);

            isUser = await CSMain.isRegisteredUser(accounts[2]);
            assert.isFalse(isUser);
        });
    });

    describe("Post new questions", async () => {
        let iQCount;

        before(async () => {
            iQCount = await CSMain.questionCount();
            await CSMain.createNewQuestion("abcdsample");
        });

        it("question count is incremented", async () => {
            const fQCount = await CSMain.questionCount();
            assert.equal((fQCount - iQCount).toString(), "1");
        });

        it("question can be retrieved", async () => {
            const qn = await CSMain.questions(0);
            assert.equal(qn.questionaireAddress, accounts[0]);
            assert.isFalse(qn.isAnswered);
            assert.equal(qn.questionString, "abcdsample");
        });
    });

    describe("Post answers to questions", async () => {
        let iACount;

        before(async () => {
            iACount = await CSMain.answerCount();
            await CSMain.answerQuestion(0, "sampleanswer", {from: accounts[1]});
        });

        it("answer count is incremented", async () => {
            const fACount = await CSMain.answerCount();
            assert.equal((fACount - iACount).toString(), "1");
        });

        it("answer can be retrieved", async () => {
            const an = await CSMain.answers(0);
            assert.equal(an.replierAddress, accounts[1]);
            assert.equal(an.questionId, 0);
            assert.isFalse(an.isAccepted);
            assert.equal(an.answerString, "sampleanswer");
        });

        it("user receives points", async () => {
            const user = await CSMain.users(1);
            assert.equal(user.userPoints, 10);
        });
    });

    describe("Purchase NFTs", async () => {
        let iCount, iBalance;

        before(async () => {
            iCount = await CSNFT.balanceOf(accounts[3]);
            iBalance = await web3.eth.getBalance(CSMain.address);
        });

        it("allows users to mint NFTs", async () => {
            const initialTokenCount = await CSNFT.returnNFTCount();
            assert.equal(initialTokenCount, 0);
            await CSMain.payToMint("https://sample.sgfg/sf.json", {from: accounts[3], value: web3.utils.toWei("0.1")});
        });

        it("token count of user increases", async () => {
            fCount = await CSNFT.balanceOf(accounts[3]);
            assert.equal((fCount - iCount).toString(), "1");
            const finalTokenCount = await CSNFT.returnNFTCount();
            assert.equal(finalTokenCount, 1);
        });

        it("NFT is owned by the purchaser", async () => {
            const nft = await CSNFT.nfts(0);
            assert.equal(nft.owner, accounts[3]);
        });

        it("contract balance increases", async() => {
            const fBalance = await web3.eth.getBalance(CSMain.address);

            let difference = parseFloat(
                web3.utils.fromWei((fBalance - iBalance).toString())
            );

            assert.equal(difference, 0.1);
        });
    });

    describe("Accept answer and recive token rewards", async () => {
        let iBalance;

        before(async () => {
            iBalance = await web3.eth.getBalance(accounts[1]);
            await CSMain.acceptAnswer(0);
        });

        it("answer is marked as accepted", async () => {
            const an = await CSMain.answers(0);
            assert.isTrue(an.isAccepted);
        });

        it("question is marked as answered", async () => {
            const qn = await CSMain.questions(0);
            assert.isTrue(qn.isAnswered);
        });

        it("user receives token reward for answer", async () => {
            const fBalance = await web3.eth.getBalance(accounts[1]);
            assert.equal(web3.utils.fromWei((fBalance - iBalance).toString()), "0.01");
        });
    });
});

//0xEe2408E9c16e0deD08e4274F5dA7A3B05EAC380d 0x890B4C8e5582c528AE0c8d740e479E52e871a4a6