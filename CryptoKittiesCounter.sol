pragma solidity ^0.6.0;

abstract contract ERC721 {
    function balanceOf(address _owner) public virtual view returns (uint256 balance);
}

contract CryptoKittiesCounter {
    address constant contractAdress = 0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF; // contractAdess vom cryptokitties contract
    
    function get() public view returns (uint256) {
        return ERC721(contractAdress).balanceOf(address(this));
    }
}
