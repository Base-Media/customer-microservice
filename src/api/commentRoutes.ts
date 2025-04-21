import e, { Router } from "express";
import CommentController from "../controllers/CommentController";
import { userDetails } from "../middleware/userDetails";

const router = Router();

router.post("/", userDetails, CommentController.createComment); // Endpoint to create comment

export default router;