import express from 'express';
import  transactionController  from './controller/transactionController';
const router = express.Router();

router.post('/transaction', transactionController.createTransaction);

export default router;