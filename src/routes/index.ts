import { Router } from "express";
import multer from "multer";
import * as UserController from '../controllers/userController';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb)=>{
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes(file.mimetype));
    },
    limits:{fieldSize: 2000000}
});

const router = Router();

router.post('/upload', upload.single('avatar'), UserController.upload);

export default router;