'use client';

import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import supabase from '@/app/_lib/supabase';

export default function NotificationsList({ curUser }) {
  const [notifications, setNotifications] = useState([]);
  let userId = Number(curUser?.id) || null;

  useEffect(() => {
    if (!userId || isNaN(userId)) {
      console.error('Invalid User ID:', userId);
      return;
    }

    async function fetchNotifications() {
      console.log('Fetching notifications for User ID:', userId);
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const isoDate = twoDaysAgo.toISOString();

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', isoDate)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch Error:', error.message);
        return;
      }

      console.log('Fetched Notifications:', data);
      setNotifications(data);
    }

    fetchNotifications();

    const subscription = supabase
      .channel('notification_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          console.log('New Notification Received:', payload.new);
          setNotifications((prev) => [
            {
              id: payload.new.id,
              message: payload.new.message,
              created_at: payload.new.created_at,
              is_read: false,
            },
            ...prev,
          ]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  async function markAsRead(notificationId) {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, is_read: true } : notif,
      ),
    );
  }

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
                className="flex items-center justify-between rounded-lg bg-[--color-bg] p-3 shadow-sm transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  <p className="text-sm text-[--color-dark]">{notif.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(notif.created_at).toLocaleString()}
                  </span>
                </div>
                {!notif.is_read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="ml-3 text-green-500 transition hover:text-green-700"
                  >
                    <CheckIcon className="size-5" />
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
