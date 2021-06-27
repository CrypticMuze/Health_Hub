import web3 from './web3';

import HealthHub from './build/HealthHub.json'


export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(JSON.stringify(HealthHub.abi)),
    address
  );
};

