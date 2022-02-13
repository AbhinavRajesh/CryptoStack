# CryptoStack

Decentralized Q&A Platform and NFT Marketplace

There are quite a many centralized Q&A platforms today, but they present a problem that they are completey owned and controlled by a centralized entity. This results in users not having been able to take complete ownership or credit for their content. Moreover people would also find it difficult to receive reliable answers for questions pertaining to some less popular topics. Decentralization helps overcome this issue and builds a secure, completely transparent and trustless platform. CryptoStake is a blockchain-based platform which can be utilised to ask all kinds of question in various domains and receive answers from the community. Platform users can post questions, answer questions and receive rewards for their contributions. It uses an incentivization strategy to uphold the quality of content and the presence of gas fees will ward off spammers. Each user is eligible to receive points for the answers that they post in the forum. It encourage other users to respond with better quality of answers and also enhances the usefulness of the platform. These points accumulate over time, building the user reputation. If a particular answer is accepted by the user who had asked the question, the user who answered will receive 0.01 CELO tokens as a mark of appreciation. CryptoStack also has an NFT Marketplace. This is intended to be support revenue generation on platform so that rewards can be paid out to the contributors. Each NFT costs 0.1 CELO to mint, for regular users while frequent contributors are eligible to receive discounts on NFT purchases. The entire proceeds from sales goes to reward distribution for the platform users.

The smart contracts are deployed on the Celo Alfajores Test Network and we have used the Metamask wallet for making the transactions. NFT.Storage is used to store the off-chain NFT data on IPFS and Filecoin.

### Smart Contract Deployments

**Celo Alfajores Test Network**

| Contract                                                                                                                                       | Deployed address                             |
| :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| [CryptoStackMain Contract](https://alfajores-blockscout.celo-testnet.org/address/0xEe2408E9c16e0deD08e4274F5dA7A3B05EAC380d/transactions)      | `0xEe2408E9c16e0deD08e4274F5dA7A3B05EAC380d` |
| [CryptoStackRewardNFT Contract](https://alfajores-blockscout.celo-testnet.org/address/0x890B4C8e5582c528AE0c8d740e479E52e871a4a6/transactions) | `0x890B4C8e5582c528AE0c8d740e479E52e871a4a6` |

## Run Locally

### Pre-Requisites

- Truffle Suite
- Ganache CLI

```sh
$ npm install -g truffle
$ npm install -g ganache-cli
```

Clone the project

```sh
$ git clone https://github.com/snehasharma76/CryptoStack.git
$ cd CryptoStack
```

### Setting up a local Blockchain

Install dependencies

```sh
$ cd truffle
$ npm install
```

Compile Smart Contracts

```sh
$ truffle compile
```

Run ganache

```sh
$ ganache-cli
```

Run migrations to deploy the smart contracts

```sh
$ truffle migrate
```

To run tests, run

```sh
$ truffle test
```

### Setting up Client App

1. Installing dependencies

   ```sh
   cd frontend
   # using yarn
   yarn

   # or using npm
   npm i
   ```

2. Running locally

   ```sh
   # using yarn
   yarn dev

   # or using npm
   npm run dev
   ```
