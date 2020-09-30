pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";

contract CryptoKittiesCounter {
    address public ckAddress;

    constructor() public {
        ckAddress = 0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF;
    }

    function setCryptoKittiesAddress(address newCkAddress) public {
        ckAddress = newCkAddress;
    }
    
    function getKittieBalance() public view returns (uint256) {
        return IERC721(ckAddress).balanceOf(address(this));
    }
}
