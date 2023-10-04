import Web3 from 'web3';

 function getProvider(url: string, prvKey: string): Web3 {
    const ethTestnetUrl = url;
    if (!ethTestnetUrl) {
      throw new Error('ETH_TESTNET_URL environment variable is not set.');
    }

    const provider = new Web3.providers.HttpProvider(ethTestnetUrl);

    const web3 = new Web3(provider);

    web3.eth.accounts.wallet.add(prvKey);

    web3.eth.defaultAccount = prvKey;

    return web3;
  };
export default getProvider ;