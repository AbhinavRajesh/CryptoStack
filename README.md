# CryptoStack

Decentralized Q&A Platform and NFT Marketplace

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
