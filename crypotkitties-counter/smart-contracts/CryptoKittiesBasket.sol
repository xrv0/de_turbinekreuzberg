// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.6.12;

//import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

abstract contract KittyCore is ERC721 {
    //function tokensOfOwner(address _owner) external virtual view returns(uint256[] memory ownerTokens);
    function transfer(address _to, uint256 _tokenId) external virtual;
}

contract CryptoKittiesBasket {
    address public ckAddress;
    KittyCore _ck;

    constructor() public {
        ckAddress = 0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF;
        _ck = KittyCore(ckAddress);
    }

    function giveMeKittie(uint256 tokenId) public {
        _ck.transfer(msg.sender, tokenId);
    }

    function getKittieBalance() public view returns (uint256) {
        return _ck.balanceOf(address(this));
    }
}
