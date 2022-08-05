//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Blog {
    string public name;
    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
      uint id;
      address author;
      string title;
      string content;
      bool published;
    }
    /* mappings can be seen as hash tables */
    /* here we create lookups for posts by id and posts by ipfs hash */
    mapping(uint => Post) private idToPost;
    // mapping(string => Post) private hashToPost;

    /* events facilitate communication between smart contractsand their user interfaces  */
    /* i.e. we can create listeners for events in the client and use them in The Graph  */
    event PostCreated(uint id, string title, string content);
    event PostUpdated(uint id, string title, string content, bool published);

    /* when the blog is deployed, give it a name */
    /* also set the creator as the owner of the contract */
    constructor(string memory _name) {
        console.log("Deploying Blog with name:", _name);
        name = _name;
        owner = msg.sender;
    }

    function updateName(string memory _name) public {
        name = _name;
    }

    // function transferOwnership(address newOwner) public onlyOwner {
    //     owner = newOwner;
    // }

    /* fetches an individual post by the content hash */
    function fetchPost(uint _id) public view returns(Post memory){
      return idToPost[_id];
    }

    /* creates a new post */
    function createPost(string memory title, string memory content) public {
        _postIds.increment();
        uint postId = _postIds.current();
        Post storage post = idToPost[postId];
        post.id = postId;
        post.author = msg.sender;
        post.title = title;
        post.published = true;
        post.content = content;
        // hashToPost[hash] = post;
        emit PostCreated(postId, title, content);
    }

    /* updates an existing post */
    function updatePost(uint postId, string memory title, string memory content, bool published) public {
        Post storage post = idToPost[postId];
        require(msg.sender == post.author);
        post.title = title;
        post.published = published;
        post.content = content;
        idToPost[postId] = post;
        // hashToPost[hash] = post;
        emit PostUpdated(post.id, title, content, published);
    }

    /* fetches all posts */
    function fetchPosts() public view returns (Post[] memory) {
        uint itemCount = _postIds.current();

        Post[] memory posts = new Post[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Post storage currentItem = idToPost[currentId];
            posts[i] = currentItem;
        }
        return posts;
    }

    /* this modifier means only the contract owner can */
    /* invoke the function */
//     modifier onlyOwner() {
//       require(msg.sender == owner);
//     _;
//   }
}