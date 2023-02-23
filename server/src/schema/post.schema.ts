import { TypeOf, z } from 'zod';

export const createPostSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        message: z.string().min(1, 'Message is required'),
        creator: z.string().min(1, 'Creator is required'),
        tags: z.string().array(),
        selectedFile: z.string(),
    }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
