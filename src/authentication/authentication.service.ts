import UsersService from "src/users/users.service";
import bcrypt = require('bcryptjs');
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "src/users/users.schema";
import { CreateUserDto } from "src/users/dto/createUser.interface";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import TokenPayload from "./tokenPayload.interface";
import mongoose from "mongoose";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    public async register(registrationData: CreateUserDto): Promise<User> {
        
        const hash = await bcrypt.hashSync(registrationData.password, 10);
        try {
            const createUser = await this.usersService.createUser({...registrationData, password: hash});
            createUser.password = undefined;
            return createUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
              }
              throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    public async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        try {
            const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
            if(!isPasswordMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    public  getCookieWithJwtToken(userId: mongoose.Schema.Types.ObjectId) {
        const payload: TokenPayload = {userId};
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}