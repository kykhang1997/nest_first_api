import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { PostsDocument, Posts } from "src/posts/posts.schema";
import { CreatePostDto } from "./dto/createPost.dto";
import { UpdatePostDto } from "./dto/update.dto";

@Injectable()
export default class PostsService {
    constructor(
        @InjectModel('Posts') private readonly postModel: Model<PostsDocument>
    ) {}

    async getAllPosts(): Promise<Posts[]>  {
        const postModel = await this.postModel.find();
        return postModel;
    }

    async getPostById(id: string): Promise<Posts> {
        try {
            const post = await this.postModel.findById({_id: id});
            return post;
        } catch (error) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

    async createPost(post: CreatePostDto): Promise<Posts> {
        const newPost = new this.postModel(post);
        return await newPost.save();
    }

    async replacePost(id: string, post: UpdatePostDto): Promise<UpdatePostDto> {
        try {
            await this.postModel.replaceOne({_id: id}, post);
            return post;
        } catch (error) {
         throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

    async deletePost(id: string): Promise<Object> {
        try {
            await this.postModel.deleteOne({_id: id});
            return {};
        } catch (error) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}