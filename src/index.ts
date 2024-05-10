import express, { Request, Response } from 'express';

const router = express.Router();
router.use('/eth', require('./currency/eth'));

const app = express();
app.use(express.json());
app.use('/api', router);
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  res.status(500).send('Something failed!! ' + err.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
});
