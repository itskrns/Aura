'use client';

import { useState, useEffect } from 'react';
import supabase from '@/app/_lib/supabase';

export default function NotificationsList({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error) {
        setNotifications(data);
      }
    }

    fetchNotifications();

    // Real-time listener for new notifications
    const subscription = supabase
      .channel('notification_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]); // New notifications added instantly
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return (
    <div className="flex min-h-screen flex-col items-center rounded-sm bg-light p-0 md:p-6">
      <div className="w-full p-4">
        <h2 className="text-xl font-semibold text-[--color-secondary]">
          Notifications
        </h2>
        <ul className="mt-4 space-y-3">
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            notifications.map((notif, index) => (
              <li
                key={notif.id || index}
                className="rounded-lg bg-[--color-bg] p-3 shadow-sm transition-all duration-200 hover:-translate-y-1"
              >
                <p className="text-sm text-[--color-dark]">{notif.message}</p>
                <span className="text-xs text-gray-500">
                  {new Date(notif.created_at).toLocaleString()}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
