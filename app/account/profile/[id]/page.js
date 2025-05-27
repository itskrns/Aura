import { getPostById } from '@/app/_services/actions';
import PostPreviewClient from '@/app/_components/PostPreviewClient';

export default async function UserPostPage(props) {
  const { params } = await props;
  const post = await getPostById(params.id);

  if (!post) return <div className="py-10 text-center">Post not found.</div>;
  return <PostPreviewClient post={post} />;
}
