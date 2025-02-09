import PostsGrid from '../_components/PostsGrid';
import ProfileCard from '../_components/profileCard';

export default function page() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded bg-[var(--color-light)] text-[var(--color-dark)]">
      <span className="static row-start-1">
        <ProfileCard />
      </span>

      <span className="scrollbar-hide row-start-2 mb-[4rem] mt-[3rem] overflow-y-auto scroll-smooth lg:mb-1">
        <PostsGrid />
      </span>
    </div>
  );
}
