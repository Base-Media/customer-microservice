import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(commentData: any): Promise<Comment> {
    const comment = new this.commentModel(commentData);
    return await comment.save();
  }

  async findCommentById(id: string): Promise<Comment | null> {
    return await this.commentModel.findById(id);
  }

  async findCommentsByCustomerId(customerId: string): Promise<Comment[]> {
    return await this.commentModel.find({ customerId });
  }
}