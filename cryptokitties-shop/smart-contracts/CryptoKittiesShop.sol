pragma solidity ^0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20Detailed.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC721/ERC721.sol";

contract MohanToken is ERC20, ERC20Detailed {
    constructor () public ERC20Detailed("Mohan Token", "MOHAN", 1) {
        _mint(msg.sender, 1000000);
    }
}

contract KittyCore is ERC721 {
    function transfer(address _to, uint256 _tokenId) external;
}

contract CryptoKittiesShop {
    address public ckAddress;
    address public mtAddress;

    KittyCore _ck;
    MohanToken _mohanToken;
    
    constructor() public {
        ckAddress = 0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF;
        mtAddress = 0x522FBA8B97CD5f97Ad087Fb65C9081281645cE68;
        
        _ck = KittyCore(ckAddress);
        _mohanToken = MohanToken(mtAddress);
    }

    function giveMeKittie(uint256 tokenId) public {
        uint256 allowance = _mohanToken.allowance(msg.sender, address(this));
        require(allowance >= 1);
        _mohanToken.transferFrom(msg.sender, address(this), 1);
        _ck.transfer(msg.sender, tokenId);
    }

    function getKittieBalance() public view returns (uint256) {
        return _ck.balanceOf(address(this));
    }
    
    function getMohanTokenBalance() public view returns (uint256) {
        return _mohanToken.balanceOf(address(this));
    }
}

