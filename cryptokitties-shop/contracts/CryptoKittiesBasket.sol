// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.6.12;

// Import the IERC20 interface and and SafeMath library
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

abstract contract KittyCore is IERC721 {
    //function tokensOfOwner(address _owner) external virtual view returns(uint256[] memory ownerTokens);
    function transfer(address _to, uint256 _tokenId) external virtual;
}

contract CryptoKittiesBasket is Initializable {
    // ckAddress = 0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF;
    KittyCore _ck;

    function initialize(KittyCore ck) public initializer {
        //todo: check wether KittyCore.name() == "CryptoKitties")
        _ck = ck;
    }

    function giveMeKittie(uint256 tokenId) public {
        _ck.transfer(msg.sender, tokenId);
    }

    function getKittieBalance() public view returns (uint256) {
        return _ck.balanceOf(address(this));
    }
}
