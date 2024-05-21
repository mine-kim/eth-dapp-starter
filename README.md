# ✨eth-dapp-starter✨
> Node.js + express + typescript toy project <br />
Create eth wallet & send transaction tutorial <br />
ethers.js: https://docs.ethers.org/v6/

## List
1. create mnemonic and master address
2. create child address
3. send transaction
4. get balance
5. get fee data
6. get nonce
7. checksum address

## Prerequisites
>Sign up for Infura and get an API key. <br />
Infura: https://app.infura.io/ <br />
And  get testnet Ether(sepolia) <br />
https://www.infura.io/faucet/sepolia

## Features
- nvm 0.39.7
- node v20.12.
- npm 10.5.0
- express 4.19.2
- typescript 5.4.5
- eslint 8.57.0
- prettier 3.2.5
- ethers.js 6.12.1

## Install
```
git clone https://github.com/mine-kim/eth-dapp-starter.git
cd ./eth-dapp-starter
npm install

//create env file
vi .env

PORT=3000
INFURA_API_KEY=<YOUR_API_KEY>
PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
```

## How to Run
```
 npm run dev
```

## SwaggerUI
http://localhost:3001/api-docs/
```
 npm run api-docs
```

## Code Structure
```
├──📂 build
│  └── swagger.yaml
├──📂 common
│  ├── common.ts
│  └── type.ts
├──📂 dist
│  ├── auth.controller.ts
│  └── users.controller.ts
├──📂 middleware
│  ├── commonError.ts
│  ├── commonLog.ts
│  └── responseFilter.ts
├──📂 node_modules
│  └── .....
├──📂 router
│  └── eth.ts
├──📂 service
│  └── eth.ts
├──📂 swagger
│  ├── eth.yaml
│  └── openapi.yaml
├── .env
├── .gitignore
├── .prettierrc.json
├── Dockerfile
├── eslint.config.mjs
├── index.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Usage
1. GET: create mnemonic and master address
``` 
//reqeust
http://localhost:3000/api/eth/createMasterAddress

//response
{
    "info": {
        "mnemonic": "drama digital tray anger embark grape connect zero heart dragon bunker burger",
        "prvKey": "0xd4b3eed8f8ef83071b67ac0dc2c1f39afdfa91ea3589861f55bd5acd4ebdb4b5",
        "address": "0xFa84a2a11C60D3aD143db60f1BC3f8e011FCf15e"
    }
}
```
2. POST: create child address
``` 
//request
http://localhost:3000/api/eth/createChildAddress
{
    "mnemonic": "drama digital tray anger embark grape connect zero heart dragon bunker burger",
    "startnum": 2,
    "count": 3
}

//response
{
    "addresses": [
        {
            "index": 2,
            "address": "0x99603362d3F6af2C5274B21446E4422390927f10"
        },
        {
            "index": 3,
            "address": "0xe8340E1922076874C944Eee988457Fca2A798C46"
        },
        {
            "index": 4,
            "address": "0xfDF18749C9a4E4c53fAC3ea66Ac3b57A7b73306D"
        }
    ]
}
```
3. POST: send transaction
``` 
//request
{
    "to": "0x9E28854441B7675c1247b9b293e7DB2fE9E50c49",
    "value": "0.0002"
}

//response
{
    "TransactionHash": "0xfdf6416bcd0106aef2016e24925c81f4f88cefeacf9532466db71d20c8deecb5"
}
```
4. GET: get balance
``` 
//request
http://localhost:3000/api/eth/getBalance?address=0xd0964dD5d4c0b264484DCEb8dEE2e10174188325

//response
{
    "balance": "0.0 ETH"
}
```
5. GET: get fee data
``` 
//request
http://localhost:3000/api/eth/getGasPrice

//response
{
    "feeData": "{\"_type\":\"FeeData\",\"gasPrice\":\"600570958\",\"maxFeePerGas\":\"601141916\",\"maxPriorityFeePerGas\":\"600000000\"}"
}
```
6. GET: get nonce
``` 
//request
http://localhost:3000/api/eth/getNonce?address=0xd0964dD5d4c0b264484DCEb8dEE2e10174188325

//response
{
    "data": "7"
}
```
7. GET: checksum address
``` 
//request
http://localhost:3000/api/eth/checksumAddress?address=0xd0964dD5d4c0b264484DCEb8dEE2e10174188325

//response
address is valid:
or
Something failed!! invalid address (argument="address", value="0xd0964dD5d4c0b264484DCEb8dEE2e1017418832",
code=INVALID_ARGUMENT, version=6.12.1)
```
