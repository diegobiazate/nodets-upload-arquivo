import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import apiRouter from './routes';

dotenv.config();

const server = express();

server.use(express.static(path.join(__dirname, '../public')));
server.use(apiRouter);
server.use((req: Request, res: Response)=>{
    res.status(404).send('Endpoint não encontrado!');
});

server.listen(process.env.PORT);