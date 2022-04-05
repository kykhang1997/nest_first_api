import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { PostsModule } from './posts/posts.module';
import { UserModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://khangnk:CeJCDHbDNHEdNkwd@nest0.v3olu.mongodb.net/test'),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    UserModule,
    PostsModule,
    AuthenticationModule
  ],

})
export class AppModule { }