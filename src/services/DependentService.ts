/** @format */

import Dependent from '../models/Depedent';

class DependentService {
  async createDependent(dependentData: any) {
    const dependent = new Dependent(dependentData);
    return await dependent.save();
  }

  async updateDependent(id: string, dependentData: any) {
    return await Dependent.findByIdAndUpdate(id, dependentData, { new: true });
  }

  async findDependentByCustomerId(customerId: string) {
    return await Dependent.find({ customerId });
  }
}

export default new DependentService();
