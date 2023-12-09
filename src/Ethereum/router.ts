import express, { Request, Response } from 'express';
import  transactionController  from './controller/transactionController';
import transactionService from './service/transactionService';
import getProvider from './provider/ethereumProvider';
import getConfig from '../configs/config.env';
import { GasTracker } from './provider/gastracker';
import axios from 'axios';
const router = express.Router();

const gasTracker = new GasTracker(axios.create({
    baseURL: getConfig('GAS_TRACKER')
}))
const web3 = getProvider(getConfig('ETH_URL'), getConfig('PRIVATE_KEY'))
const controller = new transactionController(new transactionService(web3, gasTracker, getConfig('PRIVATE_KEY'), getConfig("FROM")))

router.post('/transaction', async (req: Request, res: Response) => {
    await controller.createTransaction(req, res);
});

export default router;