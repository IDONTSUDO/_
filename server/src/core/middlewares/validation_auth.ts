/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
interface Payload { id: string, iat: number, exp: number }


function decodeToken(token: string): null | Payload {
  try {
    return jwt.verify(token, 's') as Payload;
  } catch (error) {
    return null;
  }
}

export const validationMiddleware = (req: Request<any>, res: Response, next: NextFunction) => {
  if (req.url !== '/auth') {
    if (req.headers.authorization === undefined) {
      return res.status(400).json('need authorization');
    }
    const result = decodeToken(req.headers.authorization?.replace('Bearer ', ''));
    if (result === null) {
      return res.status(400).json('need authorization');
    }

    // @ts-expect-error
    req.authId = result.id;
    next();
  } else {
    return next();
  }
};

