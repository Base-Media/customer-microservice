import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true, collection: 'comments' })
export class Comment extends Document {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  subject: string;

  @Field()
  @Prop({ required: true })
  comment: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
export type CommentDocument = Comment & Document;