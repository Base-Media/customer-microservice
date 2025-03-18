import Comment from "../models/Comment";

class CommentService {
 static async createComment(commentData: any) {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  static async findCommentById(id: string) {
    return await Comment.findById(id);
  }

  static async findCommentsByCustomerId(customerId: string) {
    return await Comment.find({ customerId });
  }
}

export default  CommentService;