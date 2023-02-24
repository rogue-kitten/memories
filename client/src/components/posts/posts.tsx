import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts } from '../../features/getPost';
import PostData from './post/postData';

export default function Posts() {
    const posts = useAppSelector((state) => state.getPost);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    if (posts.loading) return <h1 className="text-xl">Loading ...</h1>;
    if (!posts.loading && posts.error)
        return <h1 className="text-xl">{posts.error}</h1>;

    return (
        <div className="w-full mr-12 flex">
            {posts.posts.map((post, idx) => (
                <PostData key={idx} post={post} />
            ))}
        </div>
    );
}
