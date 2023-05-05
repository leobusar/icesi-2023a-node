import UserModel, {UserInput, UserDocument} from '../models/user.model';
import jwt from 'jsonwebtoken';

class UserService {
    async create(data: UserInput): Promise<UserDocument> {
        try{
            const user = await UserModel.create(data);
            return user;
        }catch(error: any){
            throw error;
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findOne({ email: email });
            return user;
        }catch(error: any){
            throw error;
        }
    }

    async findById(id: string): Promise<UserDocument | null> {
        try{
            const user = await UserModel.findById(id);
            return user;
        }catch(error: any){
            throw error;
        }
    }

    async generateToken(user: UserDocument): Promise<string> {
        try{
            const token = jwt.sign({user_id: user._id,  email: user.email, name: user.name},
                 process.env.JWT_SECRET || 'secret', {expiresIn: '1h'});
            return token;
        }catch(error: any){
            throw error;
        }
    }

    async update(user: UserDocument, data: UserInput): Promise<UserDocument> {
        try{
            user.name = data.name;
            user.email = data.email;
            user.password = data.password ? data.password : user.password;
            await user.save();
            return user;
        }catch(error: any){
            throw error;
        }
    }

}

export default new UserService();