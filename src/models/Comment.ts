
import mongoose, { Document, Schema, model } from 'mongoose';

export interface Icomment extends Document {
    userId: mongoose.Types.ObjectId; 
    customerId: mongoose.Types.ObjectId;
    subject: string;
    comment: string;
    createdAt: Date;
};


const commentSchema = new Schema<Icomment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },

    },
    { timestamps: true, collection: 'comments' }
);


const Comment = model<Icomment>('Comment', commentSchema);
export default Comment;