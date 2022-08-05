import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";

function App() {
  const { ethereum } = window;
  const [posts, updatePosts] = useState(["post1", "post2"]);
  const [showPosts, setShowPosts] = useState(false);

  async function connect() {
    console.log("connect");
    // let address;

    // if (ethereum) {
    //   try {
    //     await ethereum.request({ method: "eth_requestAccounts" });
    //     if (ethereum.selectedAddress) {
    //       address = ethereum.selectedAddress;
    //       connect.innerText = address;
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  }

  function renderPosts(posts) {
    return posts.map((post) => <p key={post}>{post}</p>);
  }

  function createPost() {
    console.log("create post");
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(contractAddress, Blog.abi, signer);
  }

  return (
    <div className="App">
      <button onClick={() => connect()} className="connect-btn">
        Connect to wallet
      </button>
      <button onClick={() => setShowPosts(!showPosts)} className="getposts-btn">
        Get posts
      </button>
      {showPosts ? (
        <div className="posts-block">{renderPosts(posts)}</div>
      ) : null}
      <input className="title-input" placeholder="title" />
      <textarea className="text-area" />
      <button onClick={() => createPost()} className="createpost-btn">
        Create Post
      </button>
    </div>
  );
}

export default App;
