import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID, Directive } from '@nestjs/graphql';
import { EncryptSocialService } from '../../utils/encrypt-social.service';

// Define the Office type that exists in another subgraph
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Office {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@key(fields: "_id")')
@Schema({ timestamps: true, collection: 'customers' })
export class Customer extends Document {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  @Prop()
  firstName?: string;

  @Field({ nullable: true })
  @Prop()
  lastName?: string;

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

  @Field({ nullable: true })
  @Prop()
  dob?: Date;

  @Field({ nullable: true })
  @Prop()
  occupation?: string;

  @Field({ nullable: true })
  @Prop()
  householdIncome?: string;

  @Field({ nullable: true })
  @Prop()
  phoneNumber?: string;

  @Field({ nullable: true })
  @Prop()
  email?: string;

  @Field({ nullable: true })
  @Prop()
  FFMId?: string;

  
  @Field({ nullable: true })
  @Prop()
  memberId?: string;

  @Field({ nullable: true })
  @Prop()
  leadId?: string;

  @Field({ nullable: true })
  @Prop()
  AOR: string;

  @Field({ nullable: true })
  @Prop()
  NPN: string;

  @Field({ nullable: true })
  @Prop()
  QLE: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId })
  officeId?: Types.ObjectId;

  // Add the office field that resolves to the Office subgraph
  @Field(() => Office, { nullable: true })
  office?: Office;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
CustomerSchema.set('toJSON', { getters: true });
CustomerSchema.set('toObject', { getters: true });

export type CustomerDocument = Customer & Document;