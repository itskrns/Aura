import Logo from './Logo';
import SearchBox from './SearchBox';
import ToggleTheme from './toggleTheme';
import SignOutButton from './SignOutButton';

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b-[1px] border-[var(--color-border)] bg-transparent px-4">
      <Logo />

      <span className="hidden lg:block">
        <SearchBox />
      </span>

      <span>
        <span className="flex items-center gap-2">
          <ToggleTheme />
          <span className="hidden lg:block">
            <SignOutButton />
          </span>
        </span>
      </span>
    </div>
  );
}
