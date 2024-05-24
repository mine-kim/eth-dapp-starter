import express from 'express';
import { router as ethRouter } from './router/eth';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import commonLog from './middleware/commonLog';
import responseFilter from './middleware/responseFilter';
import commonError from './middleware/commonError';

// config
dotenv.config();

const app = express();
app.use(express.json());

//openAPI3
const path = require('path');
const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware - log
app.use(commonLog);

// ETH api
const router = express.Router();
router.use('/eth', ethRouter);
app.use('/api', router);

// middleware - response format
app.use(responseFilter);

// error handling
app.use(commonError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
  console.log(`Click URL: http://localhost:${PORT}`);
});
