pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract AssetTracking{

  struct Item{
  	uint id;
  }
  
  Item public item;

  struct Asset {
            uint id;
            string tokenId;
            string description;
            string manufacturer;
            string quantity;
            string sendFrom;
            string sendTo;
   }

  Asset public asset;

  event AssetCreateEvent(
  	  	uint id,
  		string tokenId,
  		string description,
  		string manufacturer,
  		string quantity
  );

  event AssetTransferEvent(
  		uint id,
        string tokenId,
        string description,
        string manufacturer,
        string quantity,
        string sendFrom,
        string sendTo
  );

  function createItem(uint id)public{
  		item = Item(id);
  }

  function createAsset(uint id, string memory tokenId, string memory description, string memory manufacturer, string memory quantity) public{
        asset = Asset(id, tokenId, description, manufacturer, quantity, manufacturer, "");
        emit AssetCreateEvent(id, tokenId, description, manufacturer, quantity);
   }

  function readAsset() view public returns(Asset memory){ 
            return(asset);
   }

  function transferAsset( uint id, string memory tokenId, string memory description, string memory manufacturer, string memory quantity, string memory sendFrom, string memory sendTo) public{
  		asset = Asset(id, tokenId, description, manufacturer, quantity, sendFrom, sendTo);
  		emit AssetTransferEvent(id, tokenId, description, manufacturer, quantity, sendFrom, sendTo);
   }

  string public colour;

  // Event that is fired when colour is changed
  event ColourEvent(
  			address _from,
  			string colour
  );


  function AddColour(string memory _colour ) public {
    colour = _colour;
    emit ColourEvent(msg.sender, colour); // fire the event
  }


  function GetColour()view public returns(string memory){
      return colour;
  }
  
}