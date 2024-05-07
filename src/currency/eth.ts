import express, { Request, Response } from 'express';
import { ethers, HDNodeWallet, Mnemonic } from 'ethers';
import * as bip39 from 'bip39';

const router = express.Router();

const network = "sepolia";
const provider = ethers.getDefaultProvider(network, {
    infura: "<API-KEY>",
    exclusive: [ "infura" ]
});

router.get('/createMasterAddress', async (req: Request, res: Response, next) => {
    try {
        const mnemonic = bip39.generateMnemonic();
        // hd wallet from mnemonic
        const path = "m/44'/60'/0'/0";
        const hdNodeWallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), path);

        // master wallet
        const wallet = hdNodeWallet.deriveChild(0);
        const info = {
            mnemonic: mnemonic,
            prvKey: wallet.privateKey,
            address: await wallet.getAddress(),
        };
        console.log(`Master address info: "${info}"`);

        return res.status(200).send({"info": info})
    } catch (err) {
        next(err);
    }
});

router.post('/createChildAddress', async (req: Request, res: Response, next) => {
    try {
        const mnemonic= req.body.mnemonic;
        if (typeof mnemonic !== "string") {
            return res.status(400).send("Mnemonic is required");
        }
        if (!bip39.validateMnemonic(mnemonic)){
            return res.status(400).send("Invalid Mnemonic.");
        }
        const startNum: number = typeof req.body.startnum !== "number" ? 0 : req.body.startnum;
        const count: number = typeof req.body.count !== "number" ? 1 : req.body.count;

        // hd wallet from mnemonic
        const path = "m/44'/60'/0'/0";
        const hdNodeWallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), path);

        let addresses: any = [];

        //generate wallet
        for (let index = startNum; index < startNum + count; index++) {
            const wallet = hdNodeWallet.deriveChild(index);
            const address = await wallet.getAddress();
            addresses.push({index: index, address: address});
        }
        console.log(`Addresses: "${addresses}"`);

        return res.status(200).send({"addresses": addresses})
    } catch (err) {
        next(err);
    }
});

router.post('/sendTransaction',async (req: Request, res: Response, next) => {
    try {

    } catch (err) {
        next(err);
    }
});

router.get('/getBalance',async (req: Request, res: Response, next) => {
    try {
        const address = req.query.address;
        if (typeof address !== "string") {
            return res.status(400).send("address is required");
        }

        provider.getBalance(ethers.getAddress(<string>address)).then((balance: any) => {
            // convert a currency unit from wei to ether
            const balanceInEth = ethers.formatEther(balance)
            console.log(`balance: ${balanceInEth} ETH`)
            return res.status(200).send({"balance": `${balanceInEth} ETH`});
        });
    } catch (err) {
        next(err);
    }
});

router.get('/getGasPrice',async (req: Request, res: Response, next) => {
    try {
        provider.getFeeData().then((feeData: any) => {
            return res.status(200).send({"feeData": JSON.stringify(feeData)});
        });
    } catch (err) {
        next(err);
    }
});

router.get('/getNonce',async (req: Request, res: Response, next) => {
    try {
        const address = req.query.address;
        if (typeof address !== "string") {
            return res.status(400).send("address is required");
        }
        await provider.getTransactionCount(ethers.getAddress(<string>address), 'latest').then((data: any) => {
            console.log(data);
            return res.status(200).send({"data": `${data}`});
        });
    } catch (err) {
        next(err);
    }
});

router.get('/checksumAddress',async (req: Request, res: Response, next) => {
    try {
        const address = req.query.address;
        if(address == undefined || address == '') {
            return res.status(400).send({"address is null": `${address}`});
        }
        ethers.getAddress(ethers.getAddress(<string>address));
        return res.status(200).send("address is valid:");
    } catch (err) {
        next(err);
    }
});

module.exports = router;