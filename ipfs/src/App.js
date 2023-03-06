import React, { Component } from 'react';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
import { Button } from 'reactstrap';
import { render } from 'react-dom';

class App extends Component {

  state = {
    ipfsHash:null,
    buffer:'',
    ethAddress:'',
    blockNumber:'',
    transactionHash:'',
    gasUsed:'',
    txReceipt: ''
  };

  // Capture file for IPFS
  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  // Convert the file to buffer to store on IPFS
  convertToBuffer = async(reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({buffer});
  };

async () => {try{        this.setState({blockNumber:"waiting.."});        this.setState({gasUsed:"waiting..."});

await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
    console.log(err,txReceipt);
    this.setState({txReceipt});
  });
}

catch(error){      console.log(error);    }}


onSubmit = async (event) => {      event.preventDefault();

//bring in user's metamask account address
const accounts = await web3.eth.getAccounts();

// render() {    return (      <div className="App">        <header className="App-header">          <h1 className="App-title">Welcome to React</h1>        </header>        <p className="App-intro">          To get started, edit <code>src/App.js</code> and save to reload.        </p>        <hr />        <h2> Choose file to send to IPFS </h2>        <form onSubmit={this.onSubmit}>          <input type = "file" onChange = {this.captureFile} />          <input type="submit" />        </form>        <hr />        <Button color="primary" onClick={this.onClick}>Get Transaction Receipt</Button>        <Button color="primary" onClick={this.onClick}>Get Transaction Receipt Again</Button>        <table>          <thead>            <tr>              <th>Tx Receipt Category</th>              <th>Values</th>              <th> </th>            </tr>          </thead>          <tbody>            <tr>              <td>IPFS Hash # stored on Eth Contract</td>              <td>{this.state.ipfsHash}</td>              <td></td>            </tr>            <tr>              <td>Ethereum Contract Address</td>              <td>{this.state.ethAddress}</td>              <td></td>            </tr>            <tr>              <td>Tx Hash # </td>              <td>{this.state.transactionHash}</td>              <td></td>            </tr>            <tr>              <td>Block Number # </td>              <td>{this.state.blockNumber}</td>              <td></td>            </tr>            <tr>              <td>Gas Used</td>              <td>{this.state.gasUsed}</td>              <td></td>            </tr>          </tbody>        </table>      </div>    );  }}

// Get transaction receipt from metamask
getTransactionReceipt = async () => {
  try {
    const txReceipt = await web3.eth.getTransactionReceipt(this.state.transactionHash);
    console.log(txReceipt);
    this.setState({txReceipt});
  } catch(error) {
    console.log(error);
  }
}

render () {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <hr />
      <h2> Choose file to send to IPFS </h2>
      <form onSubmit={this.onSubmit}>
        <input type = "file" onChange = {this.captureFile} />
        <input type="submit" />
      </form>
      <hr />
      <Button color="primary" onClick={this.onClick}>Get Transaction Receipt</Button>
      <Button color="primary" onClick={this.onClick}>Get Transaction Receipt Again</Button>
      <table>
        <thead>
          <tr>
            <th>Tx Receipt Category</th>
            <th>Values</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>IPFS Hash # stored on Eth Contract</td>
            <td>{this.state.ipfsHash}</td>
            <td></td>
          </tr>
          <tr>
            <td>Ethereum Contract Address</td>
            <td>{this.state.ethAddress}</td>
            <td></td>
          </tr>
          <tr>
            <td>Tx Hash # </td>
            <td>{this.state.transactionHash}</td>
            <td></td>
          </tr>
          <tr>
            <td>Block Number # </td>
            <td>{this.state.blockNumber}</td>
            <td></td>
          </tr>
          <tr>
            <td>Gas Used</td>
            <td>{this.state.gasUsed}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
}

