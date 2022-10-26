// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFT.sol";

contract Marketplace {

    event NftCreated(address indexed nft, address indexed creator, string uri);
    event PriceUpdated(address indexed nft, uint newPrice);
    event NftBought(address indexed nft, uint atPrice);

    address public admin;

    struct NFTDetails {
        address creator;
        string uri;
        uint priceInWei;
    }
    
    mapping (address => NFTDetails) detailsOf;
    

    constructor() {
        admin = msg.sender;
    }

    /**
     * @notice creates an nft
     * @dev stores the details in a mapping (NFT->details) and emit events ("NftCreated" and "PriceUpdated")
     * @param _uri uri of metadata present on ipfs
     * @param _priceInWei price of nft (in ethers)
     */
    function createNFT(
        string memory _uri,
        uint _priceInWei
    ) 
    public
    {
        NFT newNft = new NFT();
        NFTDetails memory details;
        details.creator = msg.sender;
        details.uri = _uri;
        details.priceInWei = _priceInWei;
        detailsOf[address(newNft)] = details;

        emit NftCreated(address(newNft) , msg.sender, _uri);
        emit PriceUpdated( address(newNft), _priceInWei);
    }


    
    /**
     * @notice mint NFT for the "caller" of this function. provided the value sent should be atleast equal to the price of nft.
     * @dev emit event NftBought()
     * @param _nftAddress address of nft contract that the user wants to buy
     */
    function buyNft(
        address _nftAddress
    )
    public
    payable
    {
        NFT nft = NFT(_nftAddress);
        NFTDetails memory details = detailsOf[_nftAddress];
        
        require(details.creator != address(0), "Given nft do not exist.");
        require(msg.value >= details.priceInWei, "Insufficient amount.");

        nft.safeMint(msg.sender);
        emit NftBought(_nftAddress, msg.value);
    }


    
    /**
     * @notice returns the URI associated with the provided _nftAddress
     * @param _nftAddress address of nft
     */
    function getURI(
        address _nftAddress
    ) 
    public
    view
    returns (string memory)
    {
        return detailsOf[_nftAddress].uri;
    }


    /**
     * @notice returns the price associated with the provided _nftAddress
     * @param _nftAddress address of the nft
     */
    function getPrice(
        address _nftAddress
    )
    public
    view
    returns (uint)
    {
        return detailsOf[_nftAddress].priceInWei;
    }



    /**
     * @notice update the price of given nft (if exist). Only creator can execute this. New price should be greater can previous value.
     * @dev emit PriceUpdated()
     * @param _nftAddress address of nft.
     * @param _newPriceInWei new price in wei.
     */
    function updatePrice(
        address _nftAddress,
        uint _newPriceInWei
    )
    public
    {
        require(detailsOf[_nftAddress].creator != address(0), "Given nft do not exist.");
        require(detailsOf[_nftAddress].creator == msg.sender, "Only creator can update the price");
        require(_newPriceInWei > detailsOf[_nftAddress].priceInWei, "Can't update price to a lower value");

        detailsOf[_nftAddress].priceInWei = _newPriceInWei;
        emit PriceUpdated(_nftAddress, _newPriceInWei);
    }

}