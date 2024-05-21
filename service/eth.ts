import { Request, Response, NextFunction } from 'express';
import { ethers, HDNodeWallet, Mnemonic, FeeData } from 'ethers';
import * as bip39 from 'bip39';
import { Address } from '../common/type';
import { isNull, getProvider } from '../common/common';

export const createMasterAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mnemonic = bip39.generateMnemonic();
    // hd wallet from mnemonic
    const path = "m/44'/60'/0'/0";
    const hdNodeWallet = HDNodeWallet.fromMnemonic(
      Mnemonic.fromPhrase(mnemonic),
      path
    );

    // master wallet
    const wallet = hdNodeWallet.deriveChild(0);
    const info = {
      mnemonic: mnemonic,
      prvKey: wallet.privateKey,
      address: await wallet.getAddress()
    };
    console.log(`Master address info: "${JSON.stringify(info)}"`);
    res.locals.apiResponse = { info: info };
    next();
  } catch (err) {
    next(err);
  }
};

export const createChildAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mnemonic = req.body.mnemonic;
    isNull(mnemonic, 'Mnemonic');
    if (!bip39.validateMnemonic(mnemonic)) {
      res.status(400);
      throw new Error('Invalid Mnemonic.');
    }
    const startNum: number =
      typeof req.body.startnum !== 'number' ? 0 : req.body.startnum;
    const count: number =
      typeof req.body.count !== 'number' ? 1 : req.body.count;

    // hd wallet from mnemonic
    const path = "m/44'/60'/0'/0";
    const hdNodeWallet = HDNodeWallet.fromMnemonic(
      Mnemonic.fromPhrase(mnemonic),
      path
    );

    const addresses: Address[] = [];

    //generate wallet
    for (let index = startNum; index < startNum + count; index++) {
      const wallet = hdNodeWallet.deriveChild(index);
      const address = await wallet.getAddress();
      addresses.push({ index: index, address: address });
    }
    console.log(`Addresses: "${JSON.stringify(addresses)}"`);
    res.locals.apiResponse = { addresses: addresses };
    next();
  } catch (err) {
    next(err);
  }
};

export const sendTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const from =
      req.body.from == null || req.body.from == 'undefined'
        ? process.env.PRIVATE_KEY
        : req.body.from;

    const to = req.body.to;
    isNull(to, 'To');

    const value = req.body.value;
    isNull(value, 'Value');

    const signer = new ethers.Wallet(from, getProvider());

    const tx = await signer.sendTransaction({
      to: to,
      value: ethers.parseUnits(value, 'ether')
    });
    console.log(`TransactionHash: "${tx.hash}"`);
    res.locals.apiResponse = { TransactionHash: tx.hash }
    next();
  } catch (err) {
    next(err);
  }
};

export const getBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = req.params.address;
    isNull(address, 'Address');

    await getProvider()
      .getBalance(address)
      .then((balance: bigint) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.formatEther(balance);
        console.log(`balance: ${balanceInEth} ETH`);
        res.locals.apiResponse = { balance: `${balanceInEth} ETH` }
        next();
      });
  } catch (err) {
    next(err);
  }
};

export const getGasPrice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getProvider()
      .getFeeData()
      .then((feeData: FeeData) => {
        console.log(`getGasPrice: "${JSON.stringify(feeData)}"`);
        res.locals.apiResponse = feeData;
        next();
      });
  } catch (err) {
    next(err);
  }
};

export const getNonce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = req.params.address;
    isNull(address, 'Address');

    await getProvider()
      .getTransactionCount(ethers.getAddress(<string>address), 'latest')
      .then((nonce: number) => {
        console.log({ nonce: `${nonce}` });
        res.locals.apiResponse = { nonce: nonce };
        next();
      });
  } catch (err) {
    next(err);
  }
};

export const checksumAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = req.params.address;
    isNull(address, 'Address');

    ethers.getAddress(ethers.getAddress(<string>address));
    console.log({ addressValidation: true });
    res.locals.apiResponse = { addressValidation: true };
    next();
  } catch (err) {
    next(err);
  }
};
