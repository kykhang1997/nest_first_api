import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.interface";
import UsersService from "./users.service";

@Controller('users')
export default class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post('register')
    createUser(@Body() user: CreateUserDto) {
        return this.usersService.createUser(user);
    }
}