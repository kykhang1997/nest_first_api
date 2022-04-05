import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { CreateUserDto } from "./dto/createUser.interface";
import { User, UserDocument } from "./users.schema";
import mongoose from "mongoose";

@Injectable()
export default class UsersService {
    constructor(
        @InjectModel('Users') private usersModel: Model<UserDocument>,
    ) { }

    async createUser(user: CreateUserDto): Promise<User> {
        try {
            const newUser = await this.usersModel.create(user);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            const user = await this.usersModel.findOne({
                where: {
                    email
                }
            })
            if(user) return user;
            throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id: mongoose.Schema.Types.ObjectId) {
        try {
            const user = await this.usersModel.findById(id);
            if(user) {
                return user;
            }
            throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
        } catch (error) {
            console.log(error);
        }
    }
}

interface TokenPayload {
    userId: string;
  }