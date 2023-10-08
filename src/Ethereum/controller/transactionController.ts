import getProvider from '../provider/ethereumProvider';
import transactionService from '../service/transactionService';
import { Request, Response } from 'express';
import getConfig from '../../configs/config.env';
import { GasTracker } from 'Ethereum/provider/gastracker';
import axios from 'axios';

export default class transactionController {
  public static async createTransaction(req: Request, res: Response) {
    try {
      const gasTracker = new GasTracker(axios.create(
        {
          baseURL: getConfig('GAS_TRACKER'),
        }
      ))
      const { to, value } = req.body;
      const txService = new transactionService(getProvider(getConfig('ETH_TESTNET_URL'),getConfig('PRIVATE_KEY')), gasTracker,getConfig('PRIVATE_KEY'));
      const transactionHash = await txService.createTransaction(to, value);
      res.json({ transactionHash, message: 'transaction is Successful' });
    } catch (e: any) {
      res.status(500).json({
        status: false,
        message: "operation is not successful",
        error: e.message,
      })
    }
  }
};