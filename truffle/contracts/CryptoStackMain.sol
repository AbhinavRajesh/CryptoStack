// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface INFTContract {
  function safeMint(address to, string memory uri) external;
}

contract CryptoStackMain is Ownable {

  address NFTContractAddress;

  uint public userCount;
  uint public questionCount;
  uint public answerCount;

  struct User {
    uint userPoints;
    address userAddress;
    string userName;
  }

  struct Question {
    uint id;
    address questionaireAddress;
    bool isAnswered;
    string questionString;
  }

  struct Answer {
    uint id;
    uint questionId;
    bool isAccepted;
    address payable replierAddress;
    string answerString;
  }
  
  User[] public users;
  Question[] public questions;
  Answer[] public answers;

  event registeredNewUser(address);
  event createdNewQuestion(uint, address);
  event answeredQuestion(uint, uint, address);
  event acceptedAnswer(uint, uint);
  event purchasedNFT(address);

  function isRegisteredUser(address _user) public view returns(bool) {
    bool registeredUser;
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == _user) {
        registeredUser = true;
      }
    }
    return registeredUser;
  }

  function isFrequentContributor(address _user) public view returns(bool) {
    bool frequentContributor;
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == _user && users[i].userPoints > 100) {
        frequentContributor = true;
      }
    }
    return frequentContributor;
  }

  function setNFTContractAddress(address _NFTContractAddress) external onlyOwner {
    NFTContractAddress = _NFTContractAddress;
  }

  function registerNewUser(string memory _userName) external {
    require(!isRegisteredUser(msg.sender), "Already registered");
    users.push(User(0, msg.sender, _userName));
    userCount++;
    emit registeredNewUser(msg.sender);
  }

  function createNewQuestion(string memory _questionString) external {
    require(isRegisteredUser(msg.sender), "Not registered user");
    questions.push(Question(questionCount, msg.sender, false , _questionString));
    emit createdNewQuestion(questionCount, msg.sender);
    questionCount++;
  }

  function answerQuestion(uint _questionId, string memory _answerString) external {
    require(isRegisteredUser(msg.sender), "Not registered user");
    answers.push(Answer(answerCount, _questionId, false, payable(msg.sender), _answerString));
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == msg.sender) {
        users[i].userPoints += 10;
      }
    }
    emit answeredQuestion(_questionId, answerCount, msg.sender);
    answerCount++;
  }
  
  function acceptAnswer(uint _answerId) external {
    Answer memory answer = answers[_answerId];
    require(questions[answer.questionId].questionaireAddress == msg.sender, "Not original user");
    questions[answer.questionId].isAnswered = true;
    answers[_answerId].isAccepted = true;
    payable(answers[_answerId].replierAddress).transfer(0.01 ether);
    emit acceptedAnswer(_answerId, answer.questionId);
  }

  function payToMint(string memory _uri) external payable {
    if (isFrequentContributor(msg.sender)) {
      require(msg.value >= 0.05 ether, "Insufficient amount");
    } else {
      require(msg.value >= 0.1 ether, "Insufficient amount"); 
    }
    INFTContract(NFTContractAddress).safeMint(msg.sender, _uri);
    emit purchasedNFT(msg.sender);
  }
}