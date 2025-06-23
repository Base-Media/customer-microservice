import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerAddress, CustomerAddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(CustomerAddress.name) private addressModel: Model<CustomerAddressDocument>,
  ) {}

  async createAddress(addressData: any): Promise<CustomerAddress> {
    const address = new this.addressModel(addressData);
    return await address.save();
  }

  async updateAddress(id: string, addressData: any): Promise<CustomerAddress | null> {
    return await this.addressModel.findByIdAndUpdate(id, addressData, { new: true });
  }

  async findAddressByCustomerId(customerId: string): Promise<CustomerAddress | null> {
    return await this.addressModel.findOne({ customerId });
  }

  async findAddressById(id: string): Promise<CustomerAddress | null> {
    return await this.addressModel.findById(id);
  }
}