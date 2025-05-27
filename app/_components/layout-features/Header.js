import Logo from '../ui/Logo';
import ToggleTheme from '../ui/toggleTheme';
import SignOutButton from '../auth-features/SignOutButton';

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-[1px] border-[var(--color-border)] bg-transparent px-4">
      <Logo />

      <span className="flex items-center gap-2">
        <ToggleTheme />
        <SignOutButton />
      </span>
    </header>
  );
}
