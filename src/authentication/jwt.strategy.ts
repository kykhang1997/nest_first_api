import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import  { Strategy } from "passport-local"
import { ExtractJwt } from "passport-jwt";
import UsersService from "src/users/users.service";
import TokenPayload from "./tokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secrectOrKey: configService.get('JWT_SECRET')
        })
    }

    async valiadate(payload: TokenPayload) {
        return this.usersService.getById(payload.userId);
    }
}