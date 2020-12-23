import { Algorithm } from 'jsonwebtoken';

interface IJwt {
  algorithm: Algorithm;
  publicKey: string;
  privateKey: string;
  expiresIn: string;
}

export default {
  jwt: {
    algorithm: 'RS256',
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    expiresIn: '1d',
  } as IJwt,
};
