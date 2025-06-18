import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpouseController } from './spouse.controller';
import { SpouseService } from './spouse.service';
import { SpouseResolver } from './spouse.resolver';
import { Spouse, SpouseSchema } from './schemas/spouse.schema';
import { EncryptSocialService } from '../../utils/encrypt-social.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Spouse.name, schema: SpouseSchema }]),
  ],
  controllers: [SpouseController],
  providers: [SpouseService, SpouseResolver, EncryptSocialService],
  exports: [SpouseService],
})
export class SpouseModule {}