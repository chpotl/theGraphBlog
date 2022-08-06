import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import { contractAddress, ownerAddress } from './config';
import Blog from './Blog.json';

function App() {
  const { ethereum } = window;
  const [posts, updatePosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Blog.abi, signer);
  let address;
  async function connect() {
    if (ethereum) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        if (ethereum.selectedAddress) {
          address = ethereum.selectedAddress;
          console.log(address);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function fetchPosts() {
    try {
      const res = await contract.fetchPosts();
      res.forEach((el) => {
        console.log(el.title, el.content, el.author);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchPost(id) {
    try {
      const res = await contract.fetchPost(id);
      console.log(res.title, res.content, res.author);
    } catch (err) {
      console.log(err);
    }
  }

  async function createPost() {
    console.log('create post');

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        'http://127.0.0.1:8545/'
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, Blog.abi, signer);
      const val = await contract.createPost(title, content);

      console.log('trx: ', val);
    } catch (err) {
      console.log('err: ', err);
    }
  }

  function renderPosts(posts) {
    return posts.map((post) => {
      return (
        <div key={post.title} className='post-item'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      );
    });
  }

  return (
    <div className='App'>
      <button onClick={() => connect()} className='connect-btn'>
        Connect to wallet
      </button>
      <button onClick={() => fetchPosts()} className='getposts-btn'>
        Get posts
      </button>
      <button onClick={() => fetchPost(1)} className='getposts-btn'>
        Fetch post
      </button>

      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className='title-input'
        placeholder='title'
      />
      <textarea
        onChange={(e) => setContent(e.target.value)}
        className='text-area'
      />
      <button onClick={() => createPost()} className='createpost-btn'>
        Create Post
      </button>

      {showPosts ? (
        <div className='posts-block'>{renderPosts(posts)}</div>
      ) : (
        'no posts yet'
      )}
    </div>
  );
}

export default App;
