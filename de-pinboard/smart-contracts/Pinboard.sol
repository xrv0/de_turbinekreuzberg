pragma solidity ^0.6.0;

contract Pinboard {
    string[] public messages;
    
    function postMessage(string calldata message) public {
        messages.push(message);
    }
}
