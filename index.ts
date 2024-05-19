import express, { Request, Response, NextFunction } from 'express';
import { router as ethRouter } from './router/eth';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

//config
dotenv.config();

const app = express();
app.use(express.json());

//common log
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('==================');
  console.log('requestURL:' + req.url);
  console.log('requestMethod:' + req.method);
  if (req.method !== 'GET') {
    console.log('requestBody:' + JSON.stringify(req.body));
  }
  next();
});

//eth api
const router = express.Router();
router.use('/eth', ethRouter);
app.use('/api', router);

//error handling
app.use(
  (
    err: { message: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(`[Server error]: ${err.message}`);
    res.status(500).send({
      message: 'Server Error',
      error: err.message
    });
  }
);

const path = require('path');
const swaggerSpec = YAML.load(path.join(__dirname, 'build/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
});
