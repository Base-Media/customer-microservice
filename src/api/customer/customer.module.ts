import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { Customer, CustomerSchema } from './customer.schema';
import { EncryptSocialService } from '../../utils/encrypt-social.service';
import { CustomerIdsService } from '../../utils/customer-ids.service';
import { UserDetailsGuard } from '../../guards/user-details.guard';
import { CustomerIdsGuard } from '../../guards/customer-ids.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    HttpModule,
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerResolver,
    EncryptSocialService,
    CustomerIdsService,
    UserDetailsGuard,
    CustomerIdsGuard,
  ],
  exports: [CustomerService],
})
export class CustomerModule {}