import { NextFunction, Request, Response } from 'express';

const responseFilter = (req: Request, res: Response, next: NextFunction) => {
  console.log('[ responseFilter ]=============');
  console.log(res.statusCode);
  if (res.statusCode == 200) {
    const result = res.locals.apiResponse;
    res.status(200).send({
      status: 200,
      success: true,
      data: result
    });
  } else {
    next();
  }
};

export default responseFilter;
