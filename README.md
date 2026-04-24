# Stellar Payment dApp

## About This Project
Stellar Payment dApp is a decentralized web application built on the Stellar blockchain testnet. It allows users to connect their Freighter wallet, view their XLM balance, and send XLM payments directly on the Stellar testnet — all from a clean, simple React interface.

The vision of this project is to demonstrate how easy it is to build real-world blockchain payment applications using Stellar's fast, low-cost, and developer-friendly infrastructure.

## Vision
To make blockchain payments accessible to everyone by providing a simple, intuitive interface for sending XLM on the Stellar network — paving the way for real-world adoption of decentralized finance.

## Key Features
- **Wallet Connection** — Connect and disconnect Freighter wallet with one click
- **Balance Display** — Real-time XLM balance fetched from Stellar Horizon testnet
- **Send XLM** — Send XLM to any Stellar address on testnet
- **Transaction Feedback** — Live status updates (pending, success, failed) with transaction hash
- **Stellar Explorer** — Direct link to verify transactions on Stellar Expert
- **Testnet Ready** — Fully configured for Stellar testnet with Friendbot funding support

A simple Stellar testnet payment dApp built with React and Vite.

## Features
- Connect Freighter wallet
- Display XLM balance
- Send XLM transactions on Stellar testnet
- View transaction on Stellar Explorer

## Tech Stack
- React + Vite
- @stellar/freighter-api
- @stellar/stellar-sdk
- Stellar Testnet (Horizon)

## Setup Instructions

### Prerequisites
- Node.js v18+
- Freighter wallet extension installed in Chrome
- Freighter set to Testnet

### Installation

1. Clone the repository:
   git clone https://github.com/Abhi0833-eng/stellar-dapp.git

2. Install dependencies:
   cd stellar-dapp
   npm install

3. Run the app:
   npm run dev

4. Open browser:
   http://localhost:5173

## How to Use
1. Install Freighter wallet extension
2. Switch Freighter to Test Net
3. Fund wallet using Friendbot
4. Click "Connect Freighter Wallet"
5. Enter destination address and amount
6. Click "Send XLM" and confirm in Freighter

## Screenshots
- Wallet connected with balance displayed
- Successful XLM transaction on testnet
- Transaction confirmed on Stellar Explorer

## Network
Stellar Testnet (Horizon: https://horizon-testnet.stellar.org)

## Deployed Contract

Contract Address: `CBVY4FQ43ZMDATQHTSFNZQ3UOHIFKLWKMJBFTKKVSV6JYYXOPOWTHXH7`

[View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CBVY4FQ43ZMDATQHTSFNZQ3UOHIFKLWKMJBFTKKVSV6JYYXOPOWTHXH7)

## Smart Contract
Smart contract code is in `contracts/poll/src/lib.rs`

## Screenshot

Balance dispalyed
https://github.com/Abhi0833-eng/stellar-dapp/blob/d09a4be304f28265ba2fe0d7ad711ba4218338d3/screenshot/Balance%20Displayed.png

Successful testnet
https://github.com/Abhi0833-eng/stellar-dapp/blob/d09a4be304f28265ba2fe0d7ad711ba4218338d3/screenshot/Successful%20tesnet.png

Transaction Successful
https://github.com/Abhi0833-eng/stellar-dapp/blob/d09a4be304f28265ba2fe0d7ad711ba4218338d3/screenshot/Transaction%20Succesful.png

Wallet Connected
https://github.com/Abhi0833-eng/stellar-dapp/blob/d09a4be304f28265ba2fe0d7ad711ba4218338d3/screenshot/Wallet%20Connected.png
