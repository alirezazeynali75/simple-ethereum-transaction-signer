import Web3 from 'web3';
import getConfig from '../../configs/config.env';
export default class transactionService {
  private web3: Web3;
  private prvKey: string;
  private from: string;

  constructor(web3: Web3) {
    this.web3 = web3
    this.prvKey = web3.eth.accounts.privateKeyToAccount(getConfig("PRIVATE_KEY")).privateKey
    this.from = getConfig("FROM")
  }
  public async createTransaction(to: string, value: number): Promise<string> {
    const from: any = getConfig("FROM")
    const nonce = await this.web3.eth.getTransactionCount(from);

      const defaultGasLimit = "21000"
      const maxFeePerGas = "300"
      const maxPriorityFeePerGas = "10"
      const transactionObject = {
           from: this.from,
           to,
           defaultGasLimit,
           maxFeePerGas,
           maxPriorityFeePerGas,
           nonce: nonce.toString(),
           value,
      }
    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      transactionObject,
      this.web3.eth.accounts.privateKeyToAccount(getConfig("PRIVATE_KEY")).privateKey
    );

    const transactionReceipt = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction as string);
    return transactionReceipt.transactionHash as string;
  }
}
