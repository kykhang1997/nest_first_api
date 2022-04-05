import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({auto: true})
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({required: true})
    email: string

    @Prop()
    name: string

    @Prop({required: true})
    password?: string
}

export const UserSchema = SchemaFactory.createForClass(User);