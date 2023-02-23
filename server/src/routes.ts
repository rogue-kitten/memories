import {
    createPostHandler,
    getPostHandler,
} from '@/controller/post.controller';
import validateResource from '@/middleware/validateResource';
import { createPostSchema } from '@/schema/post.schema';
import { Express } from 'express';

export default function routes(app: Express) {
    app.get('/api/posts', getPostHandler);

    app.post(
        '/api/posts',
        validateResource(createPostSchema),
        createPostHandler
    );
}
