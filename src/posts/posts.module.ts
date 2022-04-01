
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import PostsController from "./posts.controller";
import { PostSchema } from "./posts.schema";
import PostsService from "./posts.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Posts', schema: PostSchema}
        ])
    ],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}