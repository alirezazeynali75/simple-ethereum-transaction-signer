import transactionService from '../service/transactionService';
import { Request, Response } from 'express';


export default class transactionController {
  service: transactionService;

  constructor(service: transactionService) {
    this.service = service;
  }
  public async createTransaction(req: Request, res: Response) {
    try {
      const { to, value } = req.body;
      const transactionHash = await this.service.createTransaction(to, value);
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