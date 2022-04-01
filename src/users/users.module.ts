
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import UsersController from "./users.controller";
import { UserSchema } from "./users.schema";
import UsersService from "./users.service";

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            {name: 'Users', schema: UserSchema}
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`
                }
            })
        })
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModel {}