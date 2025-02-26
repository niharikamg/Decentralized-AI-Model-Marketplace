from flask import Flask, request, jsonify
import json
from web3 import Web3
import ipfshttpclient
import os

app = Flask(__name__)

# Connect to Ethereum Blockchain (Infura/Local Node)
infura_url = "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"
web3 = Web3(Web3.HTTPProvider(infura_url))
contract_address = "YOUR_DEPLOYED_CONTRACT_ADDRESS"

# Replace with actual ABI JSON string
contract_abi = '[YOUR_CONTRACT_ABI_JSON_HERE]'  
contract = web3.eth.contract(address=contract_address, abi=json.loads(contract_abi))

# Connect to IPFS
ipfs = ipfshttpclient.connect('/ip4/127.0.0.1/tcp/5001/http')

@app.route("/upload", methods=["POST"])
def upload_model():
    file = request.files['file']
    model_price = request.form.get("price")
    wallet_address = request.form.get("wallet_address")

    # Upload model to IPFS
    ipfs_response = ipfs.add(file)
    ipfs_hash = ipfs_response['Hash']

    # Interact with Smart Contract
    tx_hash = contract.functions.uploadModel(ipfs_hash, int(model_price)).transact({
        'from': wallet_address,
        'gas': 2000000
    })
    web3.eth.wait_for_transaction_receipt(tx_hash)

    return jsonify({"message": "Model uploaded successfully", "ipfs_hash": ipfs_hash})

@app.route("/models", methods=["GET"])
def get_models():
    models = []
    for i in range(1, contract.functions.modelCount().call() + 1):
        model = contract.functions.getModel(i).call()
        models.append({
            "id": model[0],
            "owner": model[1],
            "ipfs_hash": model[2],
            "price": model[3],
            "for_sale": model[4]
        })
    return jsonify(models)

if __name__ == "__main__":
    app.run(debug=True)
