import { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import CryptoStackMain from "../public/CryptoStackMain.json";
import CryptoStackRewardNFT from "../public/CryptoStackRewardNFT.json";

export const Web3Context = createContext({
  web3: null,
  setWeb3: () => {},
  address: null,
  setAddress: () => {},
  logout: () => {},
  isFrequentContributor: async (account) => {},
  getAllQuestions: async () => {},
  getAnswersForQuestion: async (questionId) => {},
  getMyNFTS: async (account) => {},
  getTokenURI: async (tokenId) => {},
  registerNewUser: async (username, account) => {},
  createNewQuestion: async (question, account) => {},
  answerQuestion: async (questionId, answer, account) => {},
  acceptAnswer: async (answerId, account) => {},
  purchaseNFT: async (tokenURI, account) => {},
  getUserInfo: async () => {},
  CryptoStack: null,
  CryptoStackNFT: null,
  loading: false,
  tryConnectWallet: () => {},
  questions: [],
  setQuestions: () => {},
});

const Web3Provider = ({ children }) => {
  const [CryptoStack, setCryptoStack] = useState();
  const [CryptoStackNFT, setCryptoStackNFT] = useState();
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async () => {
      const web3Connected = await tryConnectWallet();
      setWeb3(web3Connected);
      loadBlockchainData(web3Connected);
    })();
  }, []);

  const logout = () => {
    setAddress(null);
  };

  const loadBlockchainData = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const csMainData = CryptoStackMain.networks[networkId];
    const csNFTData = CryptoStackRewardNFT.networks[networkId];

    if (csMainData && csNFTData) {
      setCryptoStack(
        new web3.eth.Contract(CryptoStackMain.abi, csMainData.address)
      );
      setCryptoStackNFT(
        new web3.eth.Contract(CryptoStackRewardNFT.abi, csNFTData.address)
      );
      return true;
    } else {
      window.alert(
        "Unidentified network, please connect to Celo or Alfajores Network"
      );
      return false;
    }
  };

  const getUserInfo = async () => {
    const isRegistered = await CryptoStack.methods
      .isRegisteredUser(address)
      .call();
    if (isRegistered) {
      const uCount = await CryptoStack.methods.userCount().call();

      for (let i = 0; i < uCount; ++i) {
        const user = await CryptoStack.methods.users(i).call();
        if (user.userAddress.toLowerCase() === address.toLowerCase()) {
          return user;
        }
      }
    } else {
      return null;
    }
  };

  const isFrequentContributor = async () => {
    const isContributor = await CryptoStack.methods
      .isFrequentContributor(address)
      .call();
    return isContributor;
  };

  const getAllQuestions = async () => {
    let questions = [];
    const qCount = await CryptoStack.methods.questionCount().call();

    for (let i = 0; i < qCount; ++i) {
      const question = await CryptoStack.methods.questions(i).call();
      questions.push(question);
    }
    return questions;
  };

  const getAnswersForQuestion = async (questionId) => {
    let answers = [];
    const aCount = await CryptoStack.methods.answerCount().call();

    for (let i = 0; i < aCount; ++i) {
      const answer = await CryptoStack.methods.answers(i).call();
      if (answer.questionId == questionId) {
        answers.push(answer);
      }
    }
    return answers;
  };

  const getTokenURI = async (tokenId) => {
    const uri = await CryptoStackNFT.methods.tokenURI(tokenId).call();
    return uri;
  };

  const registerNewUser = async (username) => {
    setLoading(true);
    await CryptoStack.methods
      .registerNewUser(username)
      .send({ from: address })
      .on("transactionHash", function (hash) {})
      .on("receipt", function (receipt) {})
      .on("confirmation", (confirmationNumber, receipt) => {
        setLoading(false);
      })
      .on("error", (error, receipt) => {
        window.alert("Error occured:", error);
        setLoading(false);
      });
  };

  const createNewQuestion = async (question) => {
    setLoading(true);
    await CryptoStack.methods
      .createNewQuestion(question)
      .send({ from: address })
      .on("transactionHash", function (hash) {})
      .on("receipt", function (receipt) {})
      .on("confirmation", (confirmationNumber, receipt) => {
        setLoading(false);
      })
      .on("error", (error, receipt) => {
        setLoading(false);
        window.alert("Error occured:", error);
      });
  };

  const answerQuestion = async (questionId, answer) => {
    setLoading(true);
    await CryptoStack.methods
      .answerQuestion(questionId, answer)
      .send({ from: address })
      .on("transactionHash", function (hash) {})
      .on("receipt", function (receipt) {})
      .on("confirmation", (confirmationNumber, receipt) => {
        // confirmation
        setLoading(false);
      })
      .on("error", (error, receipt) => {
        window.alert("Error occured:", error);
        setLoading(false);
      });
  };

  const acceptAnswer = async (answerId) => {
    setLoading(true);
    await CryptoStack.methods
      .acceptAnswer(answerId)
      .send({ from: address })
      .on("transactionHash", function (hash) {})
      .on("receipt", function (receipt) {})
      .on("confirmation", (confirmationNumber, receipt) => {
        setLoading(false);
        // confirmation
      })
      .on("error", (error, receipt) => {
        window.alert("Error occured:", error);
        setLoading(false);
      });
  };

  const purchaseNFT = async (tokenURI, account) => {
    const isContributor = await isFrequentContributor(account);
    let price;
    if (isContributor) {
      price = web3.utils.toWei("0.05");
    } else {
      price = web3.utils.toWei("0.1");
    }
    await CryptoStack.methods
      .payToMint(tokenURI)
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

  const getMyNFTS = async (account) => {
    let nfts = [];
    const nftCount = await CryptoStackNFT.methods.returnNFTCount().call();
    for (let i = 0; i < nftCount; ++i) {
      const nft = await CryptoStackNFT.methods.nfts(i).call();
      if (nft.owner.toLowerCase() == account.toLowerCase()) {
        const uri = await getTokenURI(nft.tokenID);
        const resp = await fetch(uri);
        const metadata = await resp.json();
        metadata["tokenID"] = nft.tokenID;
        nfts.push(metadata);
      }
    }
  };

  const tryConnectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await window.web3.eth.getAccounts();
        setAddress(accounts?.[0]);
        return window.web3;
      } catch (error) {
        alert(error);
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      const accounts = await window.web3.eth.getAccounts();
      setAddress(accounts?.[0]);
      return window.web3;
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        setWeb3,
        address,
        setAddress,
        logout,
        acceptAnswer,
        answerQuestion,
        createNewQuestion,
        getAllQuestions,
        getAnswersForQuestion,
        getMyNFTS,
        getTokenURI,
        isFrequentContributor,
        purchaseNFT,
        registerNewUser,
        CryptoStack,
        CryptoStackNFT,
        getUserInfo,
        loading,
        tryConnectWallet,
        questions,
        setQuestions,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
