
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PostsDocument = Posts & Document;

@Schema() 
export class Posts {
    @Prop()
    content: string;

    @Prop()
    title: string;
}

export const PostSchema = SchemaFactory.createForClass(Posts);