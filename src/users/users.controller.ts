import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "./dto/createUser.interface";
import JwtAuthenticationGuard from "./jwt-authentication.guard";
import { User } from "./users.schema";
import UsersService from "./users.service";

@Controller('users')
export default class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

   
}

interface RequestWithUser extends Request {
    user: User;
}