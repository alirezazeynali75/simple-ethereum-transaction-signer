import Web3 from 'web3';
import { GasTracker } from '../provider/gastracker';
export default class transactionService {
  private web3: Web3;

  private gasTracker: GasTracker;

  private prvKey: string

  private from: any

  constructor(web3: Web3, gasTracker: GasTracker, prvKey: string, from: string) {
    this.web3 = web3
    this.gasTracker = gasTracker;
    this.prvKey = prvKey;
    this.from = from
  }
  public async createTransaction(to: string, value: number): Promise<string> {
    const nonce = await this.web3.eth.getTransactionCount(this.from);

    const gasDetail = await this.gasTracker.getGasDetails();
    const transactionObject = {
      from: this.from,
      to,
      gasLimit: "21000",
      maxFeePerGas: Web3.utils.toWei(gasDetail.result.FastGasPrice, 'Gwei'),
      maxPriorityFeePerGas: Web3.utils.toWei(gasDetail.result.suggestBaseFee, 'Gwei'),
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