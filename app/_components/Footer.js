'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BellAlertIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserIcon,
  WrenchIcon,
} from '@heroicons/react/24/solid';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t-[1px] border-[var(--color-border)] bg-[var(--color-light)] py-4">
      <nav className="flex justify-around">
        <Link href="/">
          <HomeIcon
            className={`size-6 ${pathname === '/' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>

        <Link href="/search">
          <MagnifyingGlassIcon
            className={`size-6 ${pathname === '/search' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>

        <Link href="/addPost">
          <PlusCircleIcon
            className={`size-6 ${pathname === '/addPost' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>

        <Link href="/notifications">
          <BellAlertIcon
            className={`size-6 ${pathname === '/notifications' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>

        <Link href="account">
          <UserIcon
            className={`size-6 ${pathname === '/account' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>
      </nav>
    </footer>
  );
}
