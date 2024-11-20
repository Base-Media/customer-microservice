/** @format */

import Address from '../models/Address';

class AddressService {
  async createAddress(addressData: any) {
    const address = new Address(addressData);
    return await address.save();
  }

  async updateAddress(id: string, addressData: any) {
    return await Address.findByIdAndUpdate(id, addressData, { new: true });
  }

  async findAddressByCustomerId(customerId: string) {
    return await Address.find({ customerId });
  }
}

export default new AddressService();
