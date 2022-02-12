// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CryptoStackMain {
  constructor() {
    
  }
  struct User{
    uint userPoints;
    address userAddress;
    string userName;

  }
  struct Question{
    uint id;
    address questionaireAddress;
    bool isAnswered;
    string questionString;
  }
  struct Answer{
    uint id;
    uint questionId;
    bool isAccepted;
    address payable replierAddress;
    string answerString;
  }
  uint public userCount;
  uint public questionCount;
  uint public answerCount;
  User[] public users;
  Question[] public questions;
  Answer[] public answers;

  function registerNewUser(string memory _userName ) external {
     users[userCount] = User(0, msg.sender, _userName );
      userCount++;
  }

  function createNewQuestion(string memory _questionString) external {
      questions[questionCount] = Question(questionCount, msg.sender, false , _questionString);
      questionCount++;
  }

  function answerQuestion( uint _questionId,string memory _answerString) external {
      answers[answerCount] = Answer(answerCount, _questionId, false, payable(msg.sender), _answerString);
      answerCount++;
  }
  
  function acceptAnswer(uint _answerId) external {
      Answer memory answer = answers[_answerId];
      require(questions[answer.questionId].questionaireAddress == msg.sender);
      questions[answer.questionId].isAnswered = true;
      answers[_answerId].isAccepted = true;
      payable(answers[_answerId].replierAddress).transfer(0.01 ether);

  }
}
