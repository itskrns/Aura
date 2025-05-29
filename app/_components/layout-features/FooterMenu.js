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
} from '@heroicons/react/24/solid';

export default function FooterMenu({ curUser }) {
  const pathname = usePathname();
  const [notifCount, setNotifCount] = useState(0);
  let userId = Number(curUser?.id) || null;

  useEffect(() => {
    if (!userId) return;

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
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return (
    <footer className="border-t-[1px] border-[var(--color-border)] bg-[var(--color-light)] py-4">
      <nav className="flex justify-around">
        <Link href="/">
          <HomeIcon
            className={`size-6 ${pathname === '/account' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>

        <Link href="/search">
          <MagnifyingGlassIcon
            className={`size-6 ${pathname === '/account/search' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>

        <Link href="/addPost">
          <PlusCircleIcon
            className={`size-6 ${pathname === '/account/addPost' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>

        <Link href="/notifications" className="relative">
          <BellAlertIcon
            className={`size-6 ${pathname === '/account/notifications' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
          {notifCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notifCount}
            </span>
          )}
        </Link>

        <Link href="/profile">
          <UserIcon
            className={`size-6 ${pathname === '/account/profile' ? 'text-secondary-600' : ''} cursor-pointer transition-all duration-200`}
          />
        </Link>
      </nav>
    </footer>
  );
}
