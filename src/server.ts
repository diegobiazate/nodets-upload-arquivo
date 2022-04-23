import express, {Request, Response, ErrorRequestHandler} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { MulterError } from 'multer';
import apiRouter from './routes';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(apiRouter);
server.use((req: Request, res: Response)=>{
    res.status(404).send('Endpoint não encontrado!');
});

const errorHandler: ErrorRequestHandler = (err, req, res, next)=>{
    res.status(400); //bad request

    if(err instanceof MulterError){
        res.json({error: err.code});
    }else{
        console.log(err);
        res.json({error: 'Ocorreu um erro, contate o desenvolvedor'});
    }
}

server.use(errorHandler);

server.listen(process.env.PORT);