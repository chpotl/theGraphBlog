import "./App.css";
import { ethers } from "ethers";

function App() {
  const { ethereum } = window;

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

  function getPosts() {
    console.log("get posts");
    // if (address) {
    //   //
    // } else {
    //   //posts.innerHTML = 'connect wallet';
    // }
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
      <button onClick={() => getPosts()} className="getposts-btn">
        Get posts
      </button>
      <input className="title-input" placeholder="title" />
      <textarea className="text-area" />
      <button onClick={() => createPost()} className="createpost-btn">
        Create Post
      </button>
    </div>
  );
}

export default App;
