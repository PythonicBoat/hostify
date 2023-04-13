from web3 import Web3, HTTPProvider
import json
from flask import Flask, request, jsonify

# Connect to the Ethereum network using Infura
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'))

# Load the contract ABI from a JSON file
with open('contract_abi.json', 'r') as f:
    contract_abi = json.load(f)

# Load the contract address from a JSON file
with open('contract_address.json', 'r') as f:
    contract_address = json.load(f)

# Create a contract instance using the ABI and address
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Get the total number of luxury items stored in the contract
num_items = contract.functions.getNumItems().call()

# Get the details of a specific luxury item
item_id = 12345
item_details = contract.functions.getItemDetails(item_id).call()

# Add a new luxury item to the contract
new_item  = {
    'id': 3232 #product_hash-sha,
    'name': 'Diamond Necklace',
    'description': '18k white gold necklace with 10-carat diamond',
    'price': 1000000,
    'seller': '0x1234567890abcdef1234567890abcdef12345678'
}
tx_hash = contract.functions.addItem(**new_item).transact({'from': w3.eth.accounts[0], 'gas': 1000000})
receipt = w3.eth.waitForTransactionReceipt(tx_hash)

