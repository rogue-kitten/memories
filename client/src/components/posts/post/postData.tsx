import Post from '../../../types/post';

export default function PostData({ post }: { post: Post }) {
    const { title, message, selectedFile } = post;
    return (
        <div>
            <img
                src={selectedFile}
                className="w-28 h-28 rounded-md object-cover"
            />
        </div>
    );
}
