import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true, collection: 'addresses' })
export class Address extends Document {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  street: string;

  @Field({ nullable: true })
  @Prop()
  aptUnit?: string;

  @Field()
  @Prop({ required: true })
  city: string;

  @Field()
  @Prop({ required: true })
  state: string;

  @Field()
  @Prop({ required: true })
  zipCode: string;

  @Field()
  @Prop({ default: 'USA' })
  country: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
export type AddressDocument = Address & Document;