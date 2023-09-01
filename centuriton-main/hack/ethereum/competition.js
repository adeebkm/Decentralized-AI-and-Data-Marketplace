import web3 from "./web3";
import Competition from "./build/Competition.json";

const competition = (address) => {
  return new web3.eth.Contract(JSON.parse(Competition.interface), address);
};
export default competition;
