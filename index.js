import React, { useState, useEffect } from "react";
import Web3 from "web3";

const contractABI = [YOUR_CONTRACT_ABI_JSON_HERE];
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [models, setModels] = useState([]);

    useEffect(() => {
        async function loadBlockchainData() {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const accounts = await web3Instance.eth.getAccounts();
                const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                
                setWeb3(web3Instance);
                setContract(contractInstance);

                const modelCount = await contractInstance.methods.modelCount().call();
                let tempModels = [];
                for (let i = 1; i <= modelCount; i++) {
                    const model = await contractInstance.methods.getModel(i).call();
                    tempModels.push(model);
                }
                setModels(tempModels);
            }
        }
        loadBlockchainData();
    }, []);

    const buyModel = async (id, price) => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.buyModel(id).send({ from: accounts[0], value: price });
        alert("Model Purchased Successfully!");
    };

    return (
        <div>
            <h1>AI Model Marketplace</h1>
            {models.map((model, index) => (
                <div key={index}>
                    <p>Model #{model.id}</p>
                    <p>Owner: {model.owner}</p>
                    <p>Price: {web3.utils.fromWei(model.price, "ether")} ETH</p>
                    {model.for_sale ? (
                        <button onClick={() => buyModel(model.id, model.price)}>Buy</button>
                    ) : (
                        <p>Sold</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default App;
