pragma solidity ^0.5.0;

contract Dappagram {
  string public name = "Dappagram";

//store posts
uint public imageCount = 0;

mapping(uint => Image) public images;

struct Image {
    uint id;    //non negative integer
    string hash; //location ipfs
    string description;//body for post
    uint tipAmount;
    address payable author;//amount for tipping

}

event ImageCreated(
    uint id,   
    string hash,
    string description,
    uint tipAmount,
    address payable author
);

event ImageTipped(
    uint id,   
    string hash,
    string description,
    uint tipAmount,
    address payable author
);

  //create posts

  function uploadImage(string memory _imgHash, string memory _description) public {
      //image hash exists
      require(bytes(_imgHash).length > 0);
      //description exists
      require(bytes(_description).length > 0); // functionality if statement true then only function executes so as to make sure description of post is not empty when converted to bytes and is >0
      //to make sure uploader address exists
      require(msg.sender != address(0x0));
      
      imageCount ++;
      //Add image to contract
      images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);
      //msg that comes along with global transaction and comes with some of its functionalities so in this case will be there eth address

        //Trigger event
        emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
  }
  //tip posts 

  function tipImageOwner(uint _id) public payable {
      //Authenticating id
      require(_id > 0 && _id <= imageCount);
      // fetching the image
      Image memory _image = images[_id];
      //fetch the author
      address payable _author = _image.author;
      // Pay the author by sending ether
      address(_author).transfer(msg.value);
      //Increment tipamount
      _image.tipAmount += msg.value;
      //update image
      images[_id] = _image;
      //Trigger event
        emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
  }
}