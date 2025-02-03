import PostsGrid from '../_components/PostsGrid';
import SearchBox from '../_components/SearchBox';

export default function page() {
  return (
    <div>
      <div className="lg:hidden">
        <span className="mb-[1px] flex justify-center border-b-[1px] border-[var(--color-border)] bg-[var(--color-light)] py-2 text-center">
          <SearchBox />
        </span>
      </div>

      <span className="scrollbar-hide row-start-2 mb-[6rem] mt-[3rem] overflow-y-auto scroll-smooth lg:mb-0">
        <PostsGrid />
      </span>
    </div>
  );
}
