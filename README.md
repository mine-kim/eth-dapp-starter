# ✨eth-dapp-starter✨
> Node.js + express + typescript toy project <br />
Create eth wallet & send transaction tutoria
> l <br />
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
ETH_NETWORK=sepolia
INFURA_API_KEY=<YOUR_API_KEY>
PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
```

## How to Run(development)
```
 npm run dev
```

## How to Run(docker)
```
 docker build . -t eth-dapp:latest
 docker run -it -p 3001:3001 eht-dapp  
```

## SwaggerUI
http://localhost:3001/api-docs/
```
 npm run api-docs
```
![sc.png](..%2Fsc.png)
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