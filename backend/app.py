import sqlite3
import os

from flask import Flask, request, jsonify, render_template, redirect, url_for
from web3 import Web3, HTTPProvider
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker


app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Connect to the Ethereum network using Infura
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'))

# Load the contract ABI from a JSON file
with open('contract_abi.json', 'r') as f:
    contract_abi = json.load(f)

# Connect to the contract
contract_address = '0x6b175474e89094c44da98b954eedeac495271d0f'
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Connect to the database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


