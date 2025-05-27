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

const menuItems = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className="size-4 text-secondary-600" />,
  },
  {
    name: 'Profile',
    href: '/account/profile',
    icon: <UserIcon className="size-4 text-secondary-600" />,
  },
  {
    name: 'Search',
    href: '/account/search',
    icon: <MagnifyingGlassIcon className="size-4 text-secondary-600" />,
  },
  {
    name: 'Add Post',
    href: '/account/addPost',
    icon: <PlusCircleIcon className="size-4 text-secondary-600" />,
  },
  {
    name: 'Notifications',
    href: '/account/notifications',
    icon: <BellAlertIcon className="size-4 text-secondary-600" />,
  },
  {
    name: 'Settings',
    href: '/account/settings',
    icon: <WrenchIcon className="size-4 text-secondary-600" />,
  },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-4">
      {menuItems.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link href={link.href} key={link.name}>
            <span
              className={`mx-9 flex cursor-pointer items-center gap-2 rounded px-4 py-2 text-sm uppercase transition-all duration-200 ${
                isActive
                  ? 'hover:none bg-[var(--color-primary)] font-semibold text-[var(--color-light)]'
                  : ''
              } hover:translate-y-1 hover:bg-[var(--color-hover)]`}
              style={isActive ? { pointerEvents: 'none' } : {}}
            >
              {link.icon} {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
