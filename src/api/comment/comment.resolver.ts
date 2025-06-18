import { Resolver, Query, Args } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './comment.schema';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  async getCommentByCustomerId(@Args('customerId') customerId: string): Promise<Comment[]> {
    return await this.commentService.findCommentsByCustomerId(customerId);
  }
}