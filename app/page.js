import PostsCard from './_components/PostsCard';
import img from '../public/globe.svg';
import post from '../public/file.svg';
import Logo from './_components/Logo';

export default function Page() {
  return (
    <div className="mb-[4rem] lg:mb-0">
      <div className="mb-[1px] border-b-[1px] border-[var(--color-border)] bg-[var(--color-light)] text-center lg:hidden">
        <Logo />
      </div>

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
    </div>
  );
}
