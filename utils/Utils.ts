// var jwt = require('jsonwebtoken');
import { sign, verify } from 'jsonwebtoken';
const SECRET: string = process.env.JWT_SECRET_KEY
  ? process.env.JWT_SECRET_KEY
  : 'mysecret';

export const Utils = {
  generateCustomPassword: () => {
    const s = '<>_!"$%&/()=?\u{20ac}';
    const special = s.substr(Math.floor(s.length * Math.random()), 2);

    // generating a random index into the string and extracting the character at that position
    const passd1: any = Math.random().toString(36).slice(-6);
    const passd2: any = Math.random().toString(36).slice(-6);
    return passd1.concat(special.concat(passd2));
  },
  generateToken: (payload: any) => {
    return sign(
      {
        data: payload,
      },
      SECRET,
      { expiresIn: process.env.JWT_SECRET_EXPIRE }
    );
  },
  verifyToken: async (token: string) => {
    // let user = User.build({});
    let decoded: any = undefined;
    try {
      decoded = await verify(token, SECRET);
    } catch (err) {
      console.log(err);
      return undefined;
    }

    return decoded.data;
  },
};
