// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

contract Factory {
    address[] public deployedContracts;
    string desc;
    function createContract(string memory description) public {
        desc = description;
        HealthHub newContract = new HealthHub();
        deployedContracts.push(address(newContract));
    }
    function getDeployedContracts() public view returns(address[] memory) {
        return deployedContracts;
    }
}

contract HealthHub {
    address[] public requestersAdd;
    mapping(address => bool) public requesters;
    uint public requestersCount;
    
    struct Data{
        string description; //separated by semi-colon not comma
        mapping(address => bool) requestsMade;
        mapping(address => string) requestersDesc;
        mapping(address => bool) finalApproved;
        
        uint requestsMadeCount;
        address manager;
    }

    event DATA(string description, address manager);

    uint numRequests;
    mapping (uint => Data) public data;
    
    function createData (string memory description) public {
        requesters[msg.sender] = true;
        requestersCount++;
        Data storage r = data[numRequests++];
        r.description = description;
        r.requestsMadeCount = 0;
        r.manager = msg.sender; 
    }
    
    function makeRequest(string memory desc ,address add, uint index) public {
        // requester can be any person who has made the contribution in the data
        // require(requesters[msg.sender]);  //to make sure the requetser has made the contribution in data
        require(!data[index].requestsMade[add]);  //to make sure only one time the request is getting made

        requestersAdd.push(add);
        data[index].requestersDesc[add] = desc;
        data[index].requestsMade[add] = true;
        data[index].requestsMadeCount++;
    }
    
    function finalizeRequest(uint index, address req) public {
        require(data[index].manager == msg.sender);
        data[index].finalApproved[req] = true;
    }

    function requests(uint id, uint index) public view returns(string memory, address, bool) {
        return (
            data[id].requestersDesc[requestersAdd[index]],
            requestersAdd[index],
            data[id].finalApproved[requestersAdd[index]]
        );
    }

    function dispayData(uint index) public {
        require((data[index].manager == msg.sender) || (data[index].finalApproved[msg.sender]));
        emit DATA(data[index].description, data[index].manager);
    }

    function getSummary (uint index) public view returns(string memory, address, uint) {
        Data storage r = data[index];
        return (
            // this.address,
            r.description,
            r.manager,
            r.requestsMadeCount
        );
    }
    
    function getRequestsCount(uint index) public view returns (uint) {
        return data[index].requestsMadeCount;
    }
}


 
