// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.6.12;

// Import the IERC20 interface and and SafeMath library
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

abstract contract KittyCore is IERC721 {
    function transfer(address _to, uint256 _tokenId) external virtual;
}

contract CryptoKittiesShop is Initializable {
    KittyCore _ck;
    IERC20 _ourToken;

    function initialize(KittyCore ck, IERC20 ourToken) public initializer {
        _ck = ck;
        _ourToken = ourToken;
    }

    function giveMeKittie(uint256 tokenId) public {
        uint256 allowance = _ourToken.allowance(msg.sender, address(this));
        require(allowance >= 1);
        _ourToken.transferFrom(msg.sender, address(this), 1);
        _ck.transfer(msg.sender, tokenId);
    }

    function sellKittie(uint256 tokenId) public {
        uint256 balance = _ourToken.balanceOf(address(this));
        require(balance >= 1);
        _ck.transferFrom(msg.sender, address(this), tokenId);
        _ourToken.transfer(msg.sender, 1);
    }

    function getKittieBalance() public view returns (uint256) {
        return _ck.balanceOf(address(this));
    }

    function getOurTokenBalance() public view returns (uint256) {
        return _ourToken.balanceOf(address(this));
    }
}
