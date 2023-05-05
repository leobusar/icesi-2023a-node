import {Request, Response} from 'express';
import  userService from '../services/user.service';
import { UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';

class UserController {
    
        async create(req: Request, res: Response) {
            try{
                const userExists: UserDocument | null = await userService.findByEmail(req.body.email);
                if(userExists){
                    return res.status(400).json({message: 'User already exists'});
                }
                req.body.password = await bcrypt.hash(req.body.password, 5);

                const user: UserDocument = await userService.create(req.body);
                res.status(201).json(user);
            }catch(error: any){
                res.status(500).json(error);
            }
        }

        async get(req: Request, res: Response) {
            try{
                const user: UserDocument | null = await userService.findById(req.params.id);
                if(!user){
                    return res.status(404).json({message: 'User not found'});
                }
                res.status(200).json(user);
            }catch(error: any){
                res.status(500).json(error);
            }
        }

        async update(req: Request, res: Response) {
            try{
                const user: UserDocument | null = await userService.findById(req.params.id);
                if(!user){
                    return res.status(404).json({message: 'User not found'});
                }
                if (req.body.password) {
                    req.body.password = await bcrypt.hash(req.body.password, 5);
                }
                const updatedUser: UserDocument = await userService.update(user, req.body);
                res.status(200).json(updatedUser);
            }catch(error: any){
                res.status(500).json(error);
            }
        }

        async login(req: Request, res: Response) {
            try{
                const user: UserDocument | null = await userService.findByEmail(req.body.email);
                if(!user){
                    return res.status(404).json({message: 'User not found'});
                }
                const isMatch = await bcrypt.compare(req.body.password, user.password);
                if(!isMatch){
                    return res.status(401).json({message: 'Incorrect password'});
                }
                const token = await userService.generateToken(user);

                return res.status(200)
                        .send({email: user.email, token})
            }catch(error: any){
                res.status(500).json(error);
            }
        }
    
}

export default new UserController();