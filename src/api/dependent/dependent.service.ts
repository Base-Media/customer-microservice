import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dependent, DependentDocument } from './schemas/dependent.schema';

@Injectable()
export class DependentService {
  constructor(
    @InjectModel(Dependent.name) private dependentModel: Model<DependentDocument>,
  ) {}

  async createDependent(dependentData: any): Promise<Dependent> {
    const dependent = new this.dependentModel(dependentData);
    return await dependent.save();
  }

  async updateDependent(id: string, dependentData: any): Promise<Dependent | null> {
    return await this.dependentModel.findByIdAndUpdate(id, dependentData, { new: true });
  }

  async findDependentByCustomerId(customerId: string): Promise<Dependent[]> {
    return await this.dependentModel.find({ customerId });
  }
}