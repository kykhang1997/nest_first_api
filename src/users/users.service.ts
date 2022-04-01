import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from "./dto/createUser.interface";
import { User, UserDocument } from "./users.schema";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class UsersService {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async createUser(user: CreateUserDto): Promise<User> {
        try {
            //! 4779+format password
            const hash = await bcrypt.hash(user.password, 10);
            await bcrypt.compare(user.password, hash);
            user.password = hash;

            const newUser = new this.usersModel(user);
            await newUser.save();
            newUser.set('password', undefined);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = {userId}
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`
    }
}

interface TokenPayload {
    userId: number;
  }