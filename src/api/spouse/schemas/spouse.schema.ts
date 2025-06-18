import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { EncryptSocialService } from '../../../utils/encrypt-social.service';

@ObjectType()
@Schema({ timestamps: true, collection: 'spouses' })
export class Spouse extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  firstName: string;

  @Field()
  @Prop({ required: true })
  lastName: string;

  @Field({ nullable: true })
  @Prop()
  middleInitial?: string;

  @Field({ nullable: true })
  @Prop()
  gender?: string;

  @Field({ nullable: true })
  @Prop({
    set: (ssn: string) => {
      if (!ssn) return ssn;
      const encryptService = new EncryptSocialService();
      return encryptService.encrypt(ssn);
    },
    get: (encryptedSsn: string) => {
      if (!encryptedSsn) return encryptedSsn;
      const encryptService = new EncryptSocialService();
      return encryptService.decrypt(encryptedSsn);
    }
  })
  ssn?: string;

  @Field()
  @Prop()
  dob: Date;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId })
  customerId: Types.ObjectId;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const SpouseSchema = SchemaFactory.createForClass(Spouse);
SpouseSchema.set('toJSON', { getters: true });
SpouseSchema.set('toObject', { getters: true });
export type SpouseDocument = Spouse & Document;