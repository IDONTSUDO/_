import { NextFunction, Request, Response } from "express";

export const validationMiddleware = (req: Request<any>, res: Response, next: NextFunction) => {
  // if(req.url === '')
  // console.log(req.url);
  if (req.url !== '/auth') {
    console.log(200);
    console.log(req.headers.authorization);
  } else {
    return next();
  }
};

