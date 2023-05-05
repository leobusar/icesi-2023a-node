import {Request, Response, NextFunction} from 'express';
import { AnyZodObject } from 'zod';

const validateSchema = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await schema.parseAsync(req.body);
            next();
        }catch(error: any){
            res.status(400).json(error);
        }
    }
}

export default validateSchema;
