import web3 from './web3';

import Factory from './build/Factory.json'

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(Factory.abi)),
  '0x6B02f46f17AEf0E3e3Ac2B85cc454c48aC2F7049'
);

export default instance;

