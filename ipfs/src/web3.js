import Web3 from './web3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3000'));

export default web3;