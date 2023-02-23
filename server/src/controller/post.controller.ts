import { CreatePostInput } from '@/schema/post.schema';
import { createPost, getPost } from '@/service/post.service';
import { Request, Response } from 'express';

export async function getPostHandler(req: Request, res: Response) {
    try {
        const post = await getPost();
        res.json(post);
    } catch (e: any) {
        res.status(404).json({ message: e.message });
    }
}

export async function createPostHandler(
    req: Request<
        Record<string, never>,
        Record<string, never>,
        CreatePostInput['body']
    >,
    res: Response
) {
    const body = req.body;
    try {
        const post = await createPost(body);
        res.status(201).send(post);
    } catch (e: any) {
        res.status(409).json({ message: e.message });
    }
}
