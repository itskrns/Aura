import ProfilePhoto from '@/app/_components/profile-features/ProfilePhoto';
import PostDeleteMenu from './PostDeleteMenu';
import { timeAgo } from '@/app/_utils/helper';

export default function PostHeader({ post, userId }) {
  const isOwnPost = post.users.id === userId;

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <ProfilePhoto size={30} src={post.users.profilePhoto} alt="Post" />
        <p className="text-sm font-semibold">{post.users.username}</p>
      </div>
      <span className="ml-auto text-xs text-gray-400">
        {timeAgo(post.created_at)}
      </span>
      {isOwnPost && <PostDeleteMenu postId={post.id} postOwnerId={post.user_id} />}
    </div>
  );
}
