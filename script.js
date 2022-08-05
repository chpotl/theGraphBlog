const posts = document.getElementById('posts');
const getPosts = document.getElementById('getPosts');
const connect = document.getElementById('connect');
const createPost = document.getElementById('createPost');

const arr = ['post1', 'post2', 'post3'];

let address;
connect.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      if (ethereum.selectedAddress) {
        address = ethereum.selectedAddress;
        connect.innerText = address;
      }
    } catch (err) {
      console.error(err);
    }
  }
});

getPosts.addEventListener('click', () => {
  if (address) {
    //
  } else {
    //posts.innerHTML = 'connect wallet';
  }
});

createPost.addEventListener('click', () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Blog.abi, signer);
});
