// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPFS {
    function add(bytes calldata data) external returns (bytes32);
    function get(bytes32 hash) external view returns (bytes memory);
}

contract IPFSImplementation is IPFS {
    mapping(bytes32 => bytes) private ipfsData;

    function add(bytes calldata data) external override returns (bytes32) {
        bytes32 hash = keccak256(data);
        ipfsData[hash] = data;
        return hash;
    }

    function get(bytes32 hash) external view override returns (bytes memory) {
        return ipfsData[hash];
    }
}
