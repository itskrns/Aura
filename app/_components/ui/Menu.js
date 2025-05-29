'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/app/_lib/supabase';
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
    showCount: true,
  },
  {
    name: 'Settings',
    href: '/account/settings',
    icon: <WrenchIcon className="size-4 text-secondary-600" />,
  },
];

export default function Menu({ curUser }) {
  const pathname = usePathname();
  const [notifCount, setNotifCount] = useState(0);
  let userId = Number(curUser?.id) || null;

  useEffect(() => {
    if (!userId) return; // Prevent invalid queries

    async function fetchNotificationCount() {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .eq('user_id', userId);

      if (error) {
        console.error('Fetch Error:', error.message);
        return;
      }
      setNotifCount(count);
    }

    fetchNotificationCount();

    const subscription = supabase
      .channel('notification_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifCount((prev) => prev + 1);
        },
      )
      .subscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [userId]);

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
              {link.showCount && notifCount > 0 && (
                <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                  {notifCount}
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
