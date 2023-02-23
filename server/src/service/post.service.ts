import PostModel, { PostDocument } from '@/model/post.model';
import { DocumentDefinition } from 'mongoose';

export async function getPost() {
    try {
        const post = await PostModel.find();
        return post;
    } catch (e: any) {
        throw new Error('Failed to create post');
    }
}

export async function createPost(
    input: DocumentDefinition<
        Omit<PostDocument, 'createdAt' | 'updatedAt' | 'likeCount'>
    >
) {
    try {
        const post = await PostModel.create(input);
        return post;
    } catch (e: any) {
        throw new Error(e);
    }
}
