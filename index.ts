import express, { Request, Response, NextFunction } from 'express';
import {router as ethRouter } from './router/eth';
const router = express.Router();
router.use('/eth', ethRouter);

const app = express();
app.use(express.json());

//common log
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("==================")
  console.log('requestURL:' + req.url);
  console.log('requestMethod:' + req.method);
  if(req.method !== 'GET') {
    console.log('requestBody:' + JSON.stringify(req.body));
  } else {
    console.log('requestQuery:' + JSON.stringify(req.query));
  }
  next();
});

//error handling
app.use((err: { message: string }, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: 'Server Error',
    error: err.message
  });
});

//eth api
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
});
