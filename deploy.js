const Web3 = require("web3");
const fs = require("fs");
const contractABI = JSON.parse(fs.readFileSync("./build/contracts/AIModelMarketplace.json")).abi;
const contractBytecode = JSON.parse(fs.readFileSync("./build/contracts/AIModelMarketplace.json")).bytecode;

const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID");
const web3 = new Web3(provider);

const deployContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(contractABI)
        .deploy({ data: contractBytecode })
        .send({ from: accounts[0], gas: 5000000 });
    
    console.log("Contract deployed at:", result.options.address);
};

deployContract();
