import Web3 from 'web3';
import getConfig from '../../configs/config.env';
import { GasTracker } from 'Ethereum/provider/gastracker';
export default class transactionService {
  private web3: Web3;

  private gasTracker: GasTracker;

  private prvKey: string

  constructor(web3: Web3, gasTracker: GasTracker, prvKey: string) {
    this.web3 = web3
    this.gasTracker = gasTracker;
    this.prvKey = prvKey;
  }
  public async createTransaction(to: string, value: number): Promise<string> {
    const from: any = getConfig("FROM")
    const nonce = await this.web3.eth.getTransactionCount(from);

    const gasDetail = await this.gasTracker.getGasDetails();
    const transactionObject = {
      from,
      to,
      gasLimit: "21000",
      maxFeePerGas: gasDetail,
      maxPriorityFeePerGas: "10",
      nonce: nonce.toString(),
      value
    };
    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      transactionObject,
     this.prvKey
    );

    const transactionReceipt = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction as string);
    return transactionReceipt.transactionHash as string;
  }
}