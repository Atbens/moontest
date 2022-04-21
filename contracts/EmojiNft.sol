//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EmojiNft1 is ERC721Enumerable, Ownable {
    using Strings for uint256;

    bool public _revealed = false;
    bool public saleIsActive = false;

    string public baseURI;
    string public notRevealedUri;
    string public baseExtension = ".json";

    uint256 public publicPrice = 0.01 ether;
    uint256 public presalePrice = 0.005 ether;//
    uint256 public maxSupply = 10000;
    uint256 public maxMintAmount = 2;
    uint256 public maxBalance = 10;


    mapping(address => bool) public whitelisted;//
    mapping(address => bool) public presaleWallets;//

   constructor()  payable ERC721("EmojiNft", "EMJ")
    {
       
    }
   


    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // public
    function mintNft(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(saleIsActive, "Sale must be active to mint Token");
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount,  "Can only mint two tokens at a time");
        require(supply + _mintAmount <= maxSupply, "Purchase would exceed max supply");
        require(balanceOf(msg.sender) + _mintAmount <= maxBalance, "Balance exceeds limit");

        if (msg.sender != owner()) {
            if (whitelisted[msg.sender] != true) {
                if (presaleWallets[msg.sender] != true) {
                    //public
                    require(msg.value >= publicPrice * _mintAmount,"Not enough ether sent");
                } else {
                    //presale
                    require(msg.value >= presalePrice * _mintAmount);
                }
            }
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender,supply + i);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
         if (_revealed == false) {return notRevealedUri;}

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    //only owner
     function flipRevealState() public onlyOwner {
        _revealed = !_revealed;
    }

     function flipSaleState() external onlyOwner {
        saleIsActive = !saleIsActive;
      }

    function setpublicPrice(uint256 _newpublicPrice) public onlyOwner {
        publicPrice = _newpublicPrice;
    }

    function setpresalePrice(uint256 _newpublicPrice) public onlyOwner {
        presalePrice = _newpublicPrice;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
     function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }


    function whitelistUser(address[] memory _users ) public onlyOwner {
        for (uint256 i = 0; i< _users.length; i++) {
            presaleWallets[_users[i]] = true;
        }
    }

    function removeWhitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = false;
    }


    function addPresaleUsers(address[] memory _users ) public onlyOwner {
        for (uint256 i = 0; i< _users.length; i++) {
            presaleWallets[_users[i]] = true;
        }
    }
     function setMaxBalance(uint256 _maxBalance) public onlyOwner {
        maxBalance = _maxBalance;
    }

    function removePresaleUser(address _user) public onlyOwner {
        presaleWallets[_user] = false;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}