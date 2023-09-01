import web3 from './web3';
import CompetitionFactory from './build/CompetitionFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CompetitionFactory.interface),
  '0x9E1A4a4eAc0c861ae7288D58933C22967fE51Bc8'
);

export default instance;
