import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DependentController } from './dependent.controller';
import { DependentService } from './dependent.service';
import { DependentResolver } from './dependent.resolver';
import { Dependent, DependentSchema } from './schemas/dependent.schema';
import { EncryptSocialService } from '../../utils/encrypt-social.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dependent.name, schema: DependentSchema }]),
  ],
  controllers: [DependentController],
  providers: [DependentService, DependentResolver, EncryptSocialService],
  exports: [DependentService],
})
export class DependentModule {}