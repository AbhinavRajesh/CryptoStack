# CryptoStack

Decentralized Q&A Platform and NFT Marketplace

### Smart Contract Deployments

**Celo Alfajores Test Network**

| Contract | Deployed address  |
| :----- | :- |
| [CryptoStackMain Contract](https://alfajores-blockscout.celo-testnet.org/address/0xEe2408E9c16e0deD08e4274F5dA7A3B05EAC380d/transactions) | `0xEe2408E9c16e0deD08e4274F5dA7A3B05EAC380d` |
| [CryptoStackRewardNFT Contract](https://alfajores-blockscout.celo-testnet.org/address/0x890B4C8e5582c528AE0c8d740e479E52e871a4a6/transactions) | `0x890B4C8e5582c528AE0c8d740e479E52e871a4a6`|

## Run Locally

### Pre-Requisites

- Truffle Suite
- Ganache CLI

```
$ npm install -g truffle
$ npm install -g ganache-cli
```  
Clone the project

```
$ git clone https://github.com/snehasharma76/CryptoStack.git
$ cd CryptoStack
```
### Setting up a local Blockchain
Install dependencies

```
$ cd truffle
$ npm install
```

Compile Smart Contracts

```
$ truffle compile
```

Run ganache

```
$ ganache-cli
```  

Run migrations to deploy the smart contracts

```
$ truffle migrate
```  

To run tests, run

```
$ truffle test
```
