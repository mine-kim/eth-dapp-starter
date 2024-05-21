import { NextFunction, Request, Response } from 'express';

const commonLog = (req: Request, res: Response, next: NextFunction) => {
  console.log('[ commonLog ]==================');
  console.log('requestURL: ' + req.url);
  console.log('requestMethod: ' + req.method);
  if (req.method !== 'GET') {
    console.log('requestBody: ' + JSON.stringify(req.body));
  }
  next();
};

export default commonLog;
