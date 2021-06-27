const Web3 = require('web3')

// const web3 = new Web3(window.web3.currentProvider)
let web3;

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
  // We are in the browser
  web3 = new Web3(window.ethereum);   // window.web3.currentProvider
} else {
  // We are in node/next server OR user not running the metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/600f2be8cdfd4634be1376f1f858d9eb'
  );
  web3 = new Web3(provider);
} 

export default web3;


