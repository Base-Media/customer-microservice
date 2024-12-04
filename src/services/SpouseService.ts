/** @format */

import Spouse from '../models/SpouseModel';

class SpouseService {
  async createSpouse(spouseData: any) {
    const spouse = new Spouse(spouseData);
    return await spouse.save();
  }

  async updateSpouse(id: string, spouseData: any) {
    return await Spouse.findByIdAndUpdate(id, spouseData, { new: true });
  }

  async findSpouseByCustomerId(customerId: string) {
    return await Spouse.findOne({ customerId });
  }
}

export default new SpouseService();
