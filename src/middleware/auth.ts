import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token = req.header('Authorization');
        if(!token){
            return res.status(401).json({message: 'Unauthorized'});
        }
        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret' );
        req.body.userId = decoded;
        next();
    }catch(error: any){
        res.status(500).json(error);
    }
}

export default auth;