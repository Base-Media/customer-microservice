import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.schema';
import { UserDetailsGuard } from '../../guards/user-details.guard';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(UserDetailsGuard)
  async createComment(@Body() commentData: any, @Req() req: any): Promise<Comment> {
    const userDetails = req.userDetails;
    if (!userDetails) {
      throw new Error('Unauthorized');
    }
    
    const userId = userDetails._id;
    const customerId = commentData.customerId;
    const data = { ...commentData, userId, customerId };
    
    return this.commentService.createComment(data);
  }
}