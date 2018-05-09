import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Web3ProviderEngine  from 'web3-provider-engine';
import * as RpcSource  from 'web3-provider-engine/subproviders/rpc';
import Web3 from 'web3';
// import LedgerWalletSubproviderFactory from 'ledger-wallet-provider';
const LedgerWalletSubproviderFactory = require('ledger-wallet-provider').default;

const tokenAbi = require('./token_abi');

class App extends Component {

  componentDidMount = async () => {
    const engine = new Web3ProviderEngine()
    const web3 = new Web3(engine)
    
    const ledgerWalletSubProvider = await LedgerWalletSubproviderFactory(() => 42);
    const rpcSubProvider = new RpcSource({
      rpcUrl: 'https://kovan.infura.io/S0zXXsBY5NLhNyVdvB7v',
    });
    engine.addProvider(ledgerWalletSubProvider);
    engine.addProvider(rpcSubProvider);

    window.web3 = web3;
    window.tokenAbi = tokenAbi.abi;
    engine.start();

    console.log(ledgerWalletSubProvider);
    console.log(rpcSubProvider);

    web3.eth.getAccounts((e, r) => {
      if (!e && r) {
        console.log(r);
        web3.eth.defaultAccount = r[0];
      }
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
