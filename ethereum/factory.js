import web3 from './web3';

import Factory from './build/Factory.json'

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(Factory.abi)),
  '0x51362A5620a39613c24bD898B8764eccCEe9781B'
);

export default instance;

