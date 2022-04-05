import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import PostsService from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/update.dto';
import JwtAuthenticationGuard from 'src/users/jwt-authentication.guard';

@Controller('posts')
export default class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get() 
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return this.postsService.getPostById(id);
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    createPost(@Body() post: CreatePostDto) {
        return this.postsService.createPost(post);
    }

    @Put(':id')
    replacePost(@Param('id') id: string, @Body() post: UpdatePostDto){
        return this.postsService.replacePost(id, post)
    }

    @Delete(':id')
    deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(id);
    }
}
