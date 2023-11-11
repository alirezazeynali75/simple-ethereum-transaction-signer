import Web3 from 'web3';

 function getProvider(url: string, prvKey: string): Web3 {
    const ethURL = url;
    if (!ethURL) {
      throw new Error('URL is not defined');
    }

    const provider = new Web3.providers.HttpProvider(ethURL);

    const web3 = new Web3(provider);

    web3.eth.defaultAccount = prvKey;

    return web3;
  };
export default getProvider ;