import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}

  async createAddress(addressData: any): Promise<Address> {
    const address = new this.addressModel(addressData);
    return await address.save();
  }

  async updateAddress(id: string, addressData: any): Promise<Address | null> {
    return await this.addressModel.findByIdAndUpdate(id, addressData, { new: true });
  }

  async findAddressByCustomerId(customerId: string): Promise<Address | null> {
    return await this.addressModel.findOne({ customerId });
  }
}