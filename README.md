# AI Model Marketplace (Decentralized)

## 📌 Overview
This project is a **Decentralized AI Model Marketplace** where users can **upload, buy, and rent AI models** using blockchain-based smart contracts on Ethereum.

## 🚀 Features
- **Upload AI models** to IPFS for decentralized storage.
- **Buy & rent AI models** using Ethereum smart contracts.
- **Web3.js integration** for seamless blockchain transactions.
- **React-based frontend** for browsing AI models.
- **Flask API backend** to interact with blockchain & IPFS.

## 🏗 Tech Stack
- **Blockchain:** Solidity, Ethereum (Sepolia Testnet)
- **Storage:** IPFS (InterPlanetary File System)
- **Backend:** Flask, Web3.py, IPFS client
- **Frontend:** React.js, Web3.js
- **Database:** MongoDB (for metadata storage)
- **Smart Contract Deployment:** Infura, Hardhat

---

## 📂 Project Structure

```bash
📂 AI-Model-Marketplace
├── 📜 AIModelMarketplace.sol    # Ethereum Smart Contract
├── 📜 server.py                 # Flask Backend API
├── 📜 index.js                  # React Frontend
├── 📜 deploy.js                 # Smart Contract Deployment Script
├── 📜 README.md                 # Project Documentation
├── 📜 requirements.txt          # Python Dependencies
└── 📜 package.json              # Frontend Dependencies
```
---

## 🔧 Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone <your-repo-link>
cd AI-Model-Marketplace
```

### 2️⃣ **Install Backend Dependencies**
```sh
pip install -r requirements.txt
```

### 3️⃣ **Set Up Blockchain & IPFS**  
- Create an **Infura account** and get an **Infura Project ID**.
- Run an **IPFS node** locally or use a public IPFS gateway.

### 4️⃣ **Deploy Smart Contract**
```sh
node deploy.js
```

### 5️⃣ **Run Flask Backend**
```sh
python server.py
```

### 6️⃣ **Start React Frontend**
```sh
npm install
npm start
```

---

## 🔥 API Endpoints (Flask Backend)
| Method | Endpoint      | Description |
|--------|-------------|-------------|
| `POST` | `/upload`   | Upload AI Model to IPFS & Smart Contract |
| `GET`  | `/models`   | Fetch all AI Models from blockchain |

---

## 💡 Example Usage

### **Uploading an AI Model (via API)**
```sh
curl -X POST -F "file=@model.h5" -F "price=0.1" -F "wallet_address=0x123..." http://localhost:5000/upload
```

### **Fetching Available AI Models**
```sh
curl -X GET http://localhost:5000/models
```

---

## ⚡ Future Enhancements
- 🔹 Add **NFT-based ownership of AI models**.
- 🔹 Enable **AI model execution via decentralized compute nodes**.
- 🔹 Implement **AI model verification & authentication**.

---


