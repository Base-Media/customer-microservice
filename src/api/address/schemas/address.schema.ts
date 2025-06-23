import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID, Directive } from '@nestjs/graphql';

@ObjectType('CustomerAddress')
@Directive('@key(fields: "_id")')
@Schema({ timestamps: true, collection: 'addresses' })
export class CustomerAddress extends Document {
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

export const CustomerAddressSchema = SchemaFactory.createForClass(CustomerAddress);
export type CustomerAddressDocument = CustomerAddress & Document;