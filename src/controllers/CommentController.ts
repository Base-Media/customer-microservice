import { Request, Response } from "express";
//import { IComment } from "../models/comment";
import CommentService from "../services/CommentsService";
import mongoose, { Types } from "mongoose";


class CommentController {
  async createComment(req: Request, res: Response): Promise<void> {

    try {
       const userDetails= req.userDetails;
         if (!userDetails) {
            res.status(401).json({ error: "Unauthorized" });
            return;
         }
       const commentData = req.body;
       const userId = userDetails._id;
       const customerId = commentData.customerId;
      const data ={...commentData, userId, customerId}
      const comment = await CommentService.createComment(data);
      res.status(201).json(comment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CommentController();
// Compare this snippet from src/models/comment.ts: