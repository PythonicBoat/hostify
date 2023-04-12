import sqlite3
import os

from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from web3 import Web3, HTTPProvider
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Connect to the Ethereum network using Infura
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/'))

# Load the contract ABI from a JSON file
with open('contract_abi.json', 'r') as f:
    contract_abi = json.load(f)

# Connect to the contract
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Connect to the database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

web3auth = web3auth(provider_uri="", contract_address="")

#Landing page
@app.route('/')
def landing_page():
    print("Here landing page will be shown in html")
    

#Endpoint for new user
@app.route('/login')
def signin():
	address = request.json.get(address)
	if web3.is_signed_in(address):
		return jsonify({'error : user already signed in'}), 400

	user_id = web3auth.is_sign_in(address)
	return jsonify({'user_id':user_id}), 200

#Endpoint for new registration
@app.route('/register')
def register():
    address = request.json.get('address')
    username = request.json.get('username')

    if web3auth.is_signed_in(address):
        return jsonify({'error': 'User already signed in'}), 400

    user_id = web3auth.register(address, username)
    return jsonify({'user_id': user_id}), 200

#View details of a product by ID
@app.route("/products/<string:product_hash>", methods=['GET'])
def get_product(product_hash):
	product_id = str(uuid.uuid5(uuid.NAMESPACE_URL, product_hash))
	product = contract.functions.getItemDetais(product_id).call()

	return jsonify({'product':product})

# Endpoint to view details of a specific user identified by hash
@app.route('/users/<string:user_hash>', methods=['GET'])
def get_user(user_hash):
    # Query the smart contract to get the details of the specified user
    user_id = str(uuid.uuid5(uuid.NAMESPACE_URL, user_hash))
    user = contract.functions.getUserDetails(user_id).call()

    # Return the user details as a JSON response
    return jsonify({'user': user})



if __name__ == "__main__":
    # gunicorn --bind 0.0.0.0:8000 app:app ---> use this to run in cmd
	app.run(debug=True)