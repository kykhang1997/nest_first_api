
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./users.schema";
import UsersService from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Users', schema: UserSchema}
        ]),
       
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}