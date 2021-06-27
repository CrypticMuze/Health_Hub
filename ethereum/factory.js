import web3 from './web3';

import Factory from './build/Factory.json'

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(Factory.abi)),
  '0xD71d3eCC35AdA80B7d470020446E9Ec572C51C86'
);

export default instance;

