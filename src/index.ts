import express, { Express, Request, Response } from 'express';
import  dotenv from 'dotenv';
import routes from './routes';
import connect from './utils/connect';

dotenv.config();

const app: Express = express();

const port: number = parseInt(process.env.PORT as string) || 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + typescript server');
});

routes(app);

connect();

app.listen(port, () => console.log('Server running'));
