import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { CustomerAddress, CustomerAddressSchema } from './schemas/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CustomerAddress.name, schema: CustomerAddressSchema }]),
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressResolver],
  exports: [AddressService],
})
export class AddressModule {}