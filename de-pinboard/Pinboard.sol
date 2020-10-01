pragma solidity ^0.6.0;

contract Pinboard {
    string[] public messages;
    
    function postMessage(string calldata message) public {
        messages.push(message);
    }
    
    function getMessagesSize() public view returns (uint256) {
        return messages.length;
    }
    
    function getMessageIndex(uint256 index) public view returns (string memory) {
        require(index < messages.length);
        return messages[index];
    }
}
