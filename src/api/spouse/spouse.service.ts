import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spouse, SpouseDocument } from './schemas/spouse.schema';

@Injectable()
export class SpouseService {
  constructor(
    @InjectModel(Spouse.name) private spouseModel: Model<SpouseDocument>,
  ) {}

  async createSpouse(spouseData: any): Promise<Spouse> {
    const spouse = new this.spouseModel(spouseData);
    return await spouse.save();
  }

  async updateSpouse(id: string, spouseData: any): Promise<Spouse | null> {
    return await this.spouseModel.findByIdAndUpdate(id, spouseData, { new: true });
  }

  async findSpouseByCustomerId(customerId: string): Promise<Spouse | null> {
    return await this.spouseModel.findOne({ customerId });
  }
}