import { Request, Response, NextFunction } from 'express';
import { ethers, HDNodeWallet, Mnemonic, FeeData } from 'ethers';
import * as bip39 from 'bip39';
import{ Address } from "../common/type";
import dotenv from "dotenv";

//config
dotenv.config();

const provider = ethers.getDefaultProvider(process.env.ETH_NETWORK, {
  infura: process.env.INFURA_API_KEY,
  exclusive: ['infura']
});

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

    return res.status(200).send({ info: info });
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
    if (typeof mnemonic !== 'string') {
      return res.status(400).send('Mnemonic is required');
    }
    if (!bip39.validateMnemonic(mnemonic)) {
      return res.status(400).send('Invalid Mnemonic.');
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

    return res.status(200).send({ addresses: addresses });
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
    if (typeof to !== 'string') {
      return res.status(400).send('To Address is required');
    }
    const value = req.body.value;
    if (typeof value !== 'string') {
      return res.status(400).send('Value is required');
    }
    const signer = new ethers.Wallet(from, provider);

    const tx = await signer.sendTransaction({
      to: to,
      value: ethers.parseUnits(value, 'ether')
    });
    console.log(`TransactionHash: "${tx.hash}"`);

    return res.status(200).send({ TransactionHash: tx.hash });
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
    const address = req.query.address;
    if (typeof address !== 'string') {
      return res.status(400).send('address is required');
    }

    provider
      .getBalance(ethers.getAddress(<string>address))
      .then((balance: bigint) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.formatEther(balance);
        console.log(`balance: ${balanceInEth} ETH`);
        return res.status(200).send({ balance: `${balanceInEth} ETH` });
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
    provider.getFeeData().then((feeData: FeeData) => {
      console.log(`getGasPrice: "${JSON.stringify(feeData)}"`);
      return res.status(200).send({ feeData: JSON.parse(JSON.stringify(feeData)) });
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
    const address = req.query.address;
    if (typeof address !== 'string') {
      return res.status(400).send('address is required');
    }
    await provider
      .getTransactionCount(ethers.getAddress(<string>address), 'latest')
      .then((nonce: number) => {
        console.log(`nonce: ${nonce}`);
        return res.status(200).send({ nonce: `${nonce}` });
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
    const address = req.query.address;
    if (address == undefined || address == '') {
      return res.status(400).send('address is required');
    }
    ethers.getAddress(ethers.getAddress(<string>address));
    return res.status(200).send({ 'addressValidation': true });
  } catch (err) {
    next(err);
  }
};
