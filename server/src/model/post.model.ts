import { Document, model, Schema } from 'mongoose';

export interface PostDocument extends Document {
    title: string;
    message: string;
    creator: string;
    tags: string[];
    selectedFile: string;
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        creator: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        selectedFile: {
            type: String,
            default: '',
        },
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const PostModel = model<PostDocument>('Posts', postSchema);

export default PostModel;
