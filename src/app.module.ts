import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { PostsModule } from './posts/posts.module';
import { UsersModel } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://khangnk:CeJCDHbDNHEdNkwd@nest0.v3olu.mongodb.net/test'),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    UsersModel,
    PostsModule,
  ],

})
export class AppModule { }