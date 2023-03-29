const IPFS = require('ipfs-http-client');

// Connect to IPFS daemon API server
const ipfs = new IPFS({ host : 'localhost' , port : '3000' , protocol : 'http' });

export default ipfs;
