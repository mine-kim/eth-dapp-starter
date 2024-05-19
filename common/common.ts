import _ from 'lodash';
import { ethers } from 'ethers';

export const getProvider = () => {
  return ethers.getDefaultProvider(process.env.ETH_NETWORK, {
    etherscan: process.env.INFURA_API_KEY,
    exclusive: ['infura']
  });
};

export const isNull = (value: any, name: string) => {
  if (_.isEmpty(value)) {
    throw new Error(`${name} is required.`);
  }
};
