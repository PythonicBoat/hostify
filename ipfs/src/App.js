import React, { Component } from 'react';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
import { Button } from 'reactstrap';

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

  // On file submit to IPFS
  onSubmit = async (event) => {
    event.preventDefault();
    //bring in user's metamask account address
    const accounts = await web3.eth.getAccounts();

    console.log('Sending from Metamask account: ' + accounts[0]);

    //obtain contract address from storehash.js
    const ethAddress= await storehash.options.address;
    this.setState({ethAddress});

    //save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash:ipfsHash[0].hash });

      // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
      //return the transaction hash from the ethereum contract

      storehash.methods.sendHash(this.state.ipfsHash).send({
        from: accounts[0]
      }, (error, transactionHash) => {
        console.log(transactionHash);
        this.setState({transactionHash});
      }); //storehash
    }) //await ipfs.add
  }; //onSubmit

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

  // render the react app
  render() {
    return (
      <div className="App">
        <header className="App-header"> 
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <hr />
        <h2> Choose file to send to IPFS </h2>
        <form onSubmit={this.onSubmit}>
          <input type = "file" onChange = {this.captureFile} />
          <input type="submit" />
        </form>
        <hr />
        <Button color="primary" onClick={this.getTransactionReceipt}>Get Transaction Receipt</Button>
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

export default App;

