import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import { response, Response } from "express";
import { CreateUserDto } from "src/users/dto/createUser.interface";
import JwtAuthenticationGuard from "src/users/jwt-authentication.guard";
import { AuthenticationService } from "./authentication.service";
import { LocalAuthenticationGurad } from "./localAuthentication.gurad";
import RequestWithUser from "./requestWithUser.interface";

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post('register')
    async register(@Body() registrationData: CreateUserDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGurad)
    @Post('log-in')
    async login(@Req() request: RequestWithUser, @Res() response: Response ) {
        const user = request.user;
        const cookie = this.authenticationService.getCookieWithJwtToken(user._id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return res.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authencate(@Req() req: RequestWithUser) {
        const user = req.user;
        user.password = undefined;
        return user;
    }
}