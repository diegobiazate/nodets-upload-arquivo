import {unlink} from 'fs/promises';
import {Request, Response} from 'express';
import sharp from 'sharp';
import { User } from '../models/User';


export const upload = async (req: Request, res: Response)=>{
    let {name, email} = req.body;

    if(req.file){
        const avatar = `${req.file.filename}.jpg`;
        await sharp(req.file.path)
            .resize(500,500, {
                fit: sharp.fit.cover
            })
            .toFormat('jpeg')
            .toFile(`./public/media/${avatar}`);
        
        const user = User.build({name, email, avatar});
        //salvando no banco de dados    
        await user.save();
        //deletando arquivo temporário
        await unlink(req.file.path);
        
        //retornando o nome do arquivo
        res.json({image: `${avatar}`});
    }else{
        res.status(400);
        res.json({error: 'Arquivo inválido'});
    }
}