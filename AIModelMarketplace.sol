// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIModelMarketplace {
    struct AIModel {
        uint id;
        address payable owner;
        string ipfsHash;
        uint price;
        bool forSale;
    }

    mapping(uint => AIModel) public models;
    uint public modelCount;

    event ModelUploaded(uint id, address owner, string ipfsHash, uint price);
    event ModelPurchased(uint id, address buyer, uint price);
    
    function uploadModel(string memory _ipfsHash, uint _price) public {
        require(_price > 0, "Price must be greater than zero");
        modelCount++;
        models[modelCount] = AIModel(modelCount, payable(msg.sender), _ipfsHash, _price, true);
        emit ModelUploaded(modelCount, msg.sender, _ipfsHash, _price);
    }

    function buyModel(uint _id) public payable {
        AIModel memory model = models[_id];
        require(model.forSale, "Model not for sale");
        require(msg.value >= model.price, "Insufficient payment");

        model.owner.transfer(msg.value);
        models[_id].owner = payable(msg.sender);
        models[_id].forSale = false;

        emit ModelPurchased(_id, msg.sender, model.price);
    }

    function getModel(uint _id) public view returns (uint, address, string memory, uint, bool) {
        AIModel memory model = models[_id];
        return (model.id, model.owner, model.ipfsHash, model.price, model.forSale);
    }
}
