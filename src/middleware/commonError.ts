import { NextFunction, Request, Response } from 'express';

const commonError = (
  err: { message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('[ commonError ]================');
  console.error(`[errMessage]: ${err.message}`);
  res.status(500).send({
    status: 500,
    success: false,
    message: 'Server Error',
    error: err.message
  });
};

export default commonError;
