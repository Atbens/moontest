// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721A.sol";

contract Moonknight is Ownable, ERC721A, PaymentSplitter {

    using Strings for uint;
    using SafeMath for uint256;

    enum Step {
        Before,
        WhitelistSale,
        PublicSale,
        SoldOut,
        Reveal
    }

    uint private constant MAX_SUPPLY = 6666;
    uint private constant MAX_MOONLIST = 1000;
    uint private constant MAX_PUBLIC = 5466;
    uint private constant MAX_GIFT = 200;
    uint256 public publicsaleMaxMint = 3;
    uint256 public mlsaleMaxMint = 2;

    bool public saleIsActive = false;
    bool public mlsaleIsActive = false;
    bool public _revealed = false;


    uint public mlSalePrice = 0 ether;
    string public notRevealedUri;
    string public baseExtension = ".json";
    string public baseURI;
    uint public publicSalePrice = 0.0066 ether;

    bytes32 public merkleRoot;

    

    mapping(address => uint) public Amount_NFT_PerWallet_MLSALE;
    mapping(address => uint) public Amount_NFT_PerWallet_PUBSALE;
    mapping(uint256 => string) private _tokenURIs;

    uint private teamLength;

    constructor(address[] memory _team, uint[] memory _teamShares, bytes32 _merkleRoot, string memory _baseURI, string memory initNotRevealedUri) ERC721A("Moonknight", "MK")
    PaymentSplitter(_team, _teamShares) {
        merkleRoot = _merkleRoot;
        baseURI = _baseURI;
        teamLength = _team.length;
        setNotRevealedURI(initNotRevealedUri);
    }


    function whitelistMint(address _account, uint _quantity, bytes32[] calldata _proof) external payable {
        uint price = mlSalePrice;
        require(mlsaleIsActive, "Whitelist Sale has not activated yet");
        require(isWhiteListed(msg.sender, _proof), "Not whitelisted");
        require(Amount_NFT_PerWallet_MLSALE[msg.sender] + _quantity <= mlsaleMaxMint, "You can only get 1 NFT on the Whitelist Sale");
        require(totalSupply() + _quantity <= MAX_MOONLIST, "Max supply exceeded");
        require(msg.value >= price * _quantity, "Not enought funds");
        Amount_NFT_PerWallet_MLSALE[msg.sender] += _quantity;
        _safeMint(_account, _quantity);
    }


    
    function publicSaleMint(address _account, uint _quantity) external payable {
        uint price = publicSalePrice;
        require(price != 0, "Price is 0");
        require(saleIsActive, "Public sale is not activated");
        require(totalSupply() + _quantity <= MAX_MOONLIST + MAX_PUBLIC, "Max supply exceeded");
        require(Amount_NFT_PerWallet_PUBSALE[msg.sender] + _quantity <= publicsaleMaxMint, "You can only get 10 NFT on the Public Sale");
        require(msg.value >= price * _quantity, "Not enought funds");
        Amount_NFT_PerWallet_PUBSALE[msg.sender] += _quantity;
        _safeMint(_account, _quantity);
    }

    function gift(address _to, uint _quantity) external onlyOwner {
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Reached max Supply");
        _safeMint(_to, _quantity);
    }

    function flipSaleState() external onlyOwner {
        saleIsActive = !saleIsActive;
      }
    
    function flipmlsaleState() external onlyOwner {
        mlsaleIsActive = !mlsaleIsActive;
      }


    function setBaseUri(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
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

        if (_revealed == false) {
            return notRevealedUri;
        }


        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
       
          // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return
            string(abi.encodePacked(base, tokenId.toString(), baseExtension));
        }


    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }



     function flipReveal() public onlyOwner {
        _revealed = !_revealed;
    }

     function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    //Whitelist
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function isWhiteListed(address _account, bytes32[] calldata _proof) public view returns(bool) {
        return _verify(leaf(_account), _proof);
    }

    

    function leaf(address _account) internal pure returns(bytes32) {
        return keccak256(abi.encodePacked(_account));
    }

    function _verify(bytes32 _leaf, bytes32[] memory _proof) internal view returns(bool) {
        return MerkleProof.verify(_proof, merkleRoot, _leaf);
    }

    //ReleaseALL
    function releaseAll() external {
        for(uint i = 0 ; i < teamLength ; i++) {
            release(payable(payee(i)));
        }
    }

    receive() override external payable {
        revert('Only if you mint');
    }

}