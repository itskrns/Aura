import PostsCard from './_components/PostsCard';
import img from '../public/globe.svg';
import post from '../public/file.svg';

export default function Page() {
  return (
    <>
      <PostsCard
        profilePic={img}
        username="username"
        postImage={post}
        likes={0}
        caption="coming soon"
        timeAgo="x min ago"
      />

      <PostsCard
        profilePic={img}
        username="username"
        postImage={post}
        likes={0}
        caption="coming soon"
        timeAgo="x min ago"
      />

      <PostsCard
        profilePic={img}
        username="username"
        postImage={post}
        likes={0}
        caption="coming soon"
        timeAgo="x min ago"
      />

      <PostsCard
        profilePic={img}
        username="username"
        postImage={post}
        likes={0}
        caption="coming soon"
        timeAgo="x min ago"
      />
    </>
  );
}
