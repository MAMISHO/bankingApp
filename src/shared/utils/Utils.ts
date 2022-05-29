import * as Bcrypt from 'bcryptjs';
import { Request } from 'express';
import * as Jwt from 'jsonwebtoken';
const SECRET: string = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : 'mysecret';

export const Utils = {
  verifyPassword: function (password: string, passwordHash: string): boolean {
    return Bcrypt.compareSync(password, passwordHash);
  },
  hashPassword: function (password: string): string {
    const encryptedPassword = Bcrypt.hashSync(password);
    if (!encryptedPassword) {
      throw new Error('Errow meanwhile hashing password');
    }
    return encryptedPassword;
  },
  generateToken: (payload: any) => {
    return Jwt.sign(
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
      decoded = await Jwt.verify(token, SECRET);
    } catch (err) {
      console.log(err);
      return undefined;
    }

    return decoded.data;
  },
  recoverToken: (req: Request): string | undefined => {
    if (req.headers && req.headers.authorization) {
      //authorization header is present
      const parts = req.headers.authorization.split(' ');
      if (parts.length == 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          return credentials;
        }
      }
    }
    return undefined;
  },

  checkValidValue: (obj: Object): boolean => {
    return Object.values(obj).every((value) => {
      if (value === null || value === undefined || value === '') {
        return false;
      }
      return true;
    });
  },

  hasValidValue: (obj: any): boolean => {
    let valid = true;
    if (obj === null || obj === undefined) {
      valid = false;
    }
    if (valid && typeof obj === 'string' && obj === '') {
      valid = false;
    }
    return valid;
  },
};
