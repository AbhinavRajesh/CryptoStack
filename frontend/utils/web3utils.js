import CryptoStackMain from "../public/CryptoStackMain.json";
import CryptoStackRewardNFT from "../public/CryptoStackRewardNFT.json";

let CryptoStack, CryptoStackNFT;

export const loadBlockchainData = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const csMainData = CryptoStackMain.networks[networkId];
  const csNFTData = CryptoStackRewardNFT.networks[networkId];

  if (csMainData && csNFTData) {
    CryptoStack = new web3.eth.Contract(CryptoStackMain.abi, csMainData.address);
    CryptoStackNFT = new web3.eth.Contract(CryptoStackRewardNFT.abi, csNFTData.address);
    return true;
  } else {
    window.alert("Unidentified network, please connect to Celo or Alfajores Network");
    return false;
  }
};

export const getUserInfo = async (account) => {
  const isRegistered = await CryptoStack.methods.isRegisteredUser(account).call();
  if (isRegistered) {
    const uCount = await CryptoStack.methods.userCount().call();

    for (let i=0; i < uCount; ++i) {
      const user = await CryptoStack.methods.users(i).call();
      if (user.userAddress.toLowerCase() == account.toLowerCase()) {
        return user;
      }
    }
  } else {
    return null;  
  }
};

export const isFrequentContributor = async (account) => {
  const isContributor = await CryptoStack.methods.isFrequentContributor(account).call();
  return isContributor;
};

export const getAllQuestions = async () => {
  let questions = [];
  const qCount = await CryptoStack.methods.questionCount().call();

  for (let i=0; i < qCount; ++i) {
    const question = await CryptoStack.methods.questions(i).call();
    questions.push(question);
  }
  return questions;
};

export const getAnswersForQuestion = async (questionId) => {
  let answers = [];
  const aCount = await CryptoStack.methods.answerCount().call();

  for (let i=0; i < aCount; ++i) {
    const answer = await CryptoStack.methods.answers(i).call();
    if (answer.questionId == questionId) {
      answers.push(answer);
    }
  }
  return answers;
};

export const getMyNFTS = async (account) => {
  let nfts = [];
  const nftCount = await CryptoStackNFT.methods.returnNFTCount().call();
  for (let i=0; i < nftCount; ++i) {
    const nft = await CryptoStackNFT.methods.nfts(i).call();
    if (nft.owner.toLowerCase() == account.toLowerCase()) {
      const uri = await getTokenURI(nft.tokenID);
      const resp = await fetch(uri);
      const metadata = await resp.json();
      metadata["tokenID"] = nft.tokenID;
      nfts.push(metadata);
    }
  }
  return nfts;
};

export const getTokenURI = async (tokenId) => {
  const uri = await CryptoStackNFT.methods.tokenURI(tokenId).call();
  return uri;
};

export const registerNewUser = async (username, account) => {
  await CryptoStack.methods.registerNewUser(username)
  .send({ from: account })
  .on("transactionHash", function (hash) {})
  .on("receipt", function (receipt) {})
  .on("confirmation", (confirmationNumber, receipt) => {
    // confirmation
  })
  .on("error", (error, receipt) => {
    window.alert("Error occured:", error);
  });
};

export const createNewQuestion = async (question, account) => {
  await CryptoStack.methods.createNewQuestion(question)
  .send({ from: account })
  .on("transactionHash", function (hash) {})
  .on("receipt", function (receipt) {})
  .on("confirmation", (confirmationNumber, receipt) => {
    // confirmation
  })
  .on("error", (error, receipt) => {
    window.alert("Error occured:", error);
  });
};

export const answerQuestion = async (questionId, answer, account) => {
  await CryptoStack.methods.answerQuestion(questionId, answer)
  .send({ from: account })
  .on("transactionHash", function (hash) {})
  .on("receipt", function (receipt) {})
  .on("confirmation", (confirmationNumber, receipt) => {
    // confirmation
  })
  .on("error", (error, receipt) => {
    window.alert("Error occured:", error);
  });
};

export const acceptAnswer = async (answerId, account) => {
  await CryptoStack.methods.acceptAnswer(answerId)
  .send({ from: account })
  .on("transactionHash", function (hash) {})
  .on("receipt", function (receipt) {})
  .on("confirmation", (confirmationNumber, receipt) => {
    // confirmation
  })
  .on("error", (error, receipt) => {
    window.alert("Error occured:", error);
  });
};

export const purchaseNFT = async (tokenURI, account) => {
  const isContributor = await isFrequentContributor(account);
  let price;
  if (isContributor) {
    price = web3.utils.toWei("0.05");
  } else {
    price = web3.utils.toWei("0.1");
  }
  await CryptoStack.methods.payToMint(tokenURI)
  .send({ from: account, value: price })
  .on("transactionHash", function (hash) {})
  .on("receipt", function (receipt) {})
  .on("confirmation", (confirmationNumber, receipt) => {
    // confirmation
  })
  .on("error", (error, receipt) => {
    window.alert("Error occured:", error);
  });
};