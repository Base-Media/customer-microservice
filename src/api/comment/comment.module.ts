import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { Comment, CommentSchema } from './comment.schema';
import { UserDetailsGuard } from '../../guards/user-details.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    HttpModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentResolver, UserDetailsGuard],
  exports: [CommentService],
})
export class CommentModule {}