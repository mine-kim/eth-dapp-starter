import { Router } from 'express';
import {
  createMasterAddress,
  createChildAddress,
  sendTransaction,
  getBalance,
  getGasPrice,
  getNonce,
  checksumAddress
} from '../service/eth';

export const router = Router();

router.get('/createMasterAddress', createMasterAddress);
router.post('/createChildAddress', createChildAddress);
router.post('/sendTransaction', sendTransaction);
router.get('/getBalance/:address', getBalance);
router.get('/getGasPrice', getGasPrice);
router.get('/getNonce/:address', getNonce);
router.get('/checksumAddress/:address', checksumAddress);
