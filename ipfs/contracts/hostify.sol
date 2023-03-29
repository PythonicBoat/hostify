// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import IPFS library
import "./IPFS.sol";

contract CDN {
    // Initialize IPFS object
    IPFS private ipfs;

    // Set the IPFS object in the constructor
    constructor(address ipfsAddress) {
        ipfs = IPFS(ipfsAddress);
    }

    // Add file to IPFS and return the file hash
    function addFile(bytes memory fileData) public returns (bytes32) {
        bytes32 hash = ipfs.add(fileData);
        return hash;
    }

    // Retrieve file from IPFS by its hash
    function getFile(bytes32 hash) public view returns (bytes memory) {
        bytes memory fileData = ipfs.get(hash);
        return fileData;
    }
}
