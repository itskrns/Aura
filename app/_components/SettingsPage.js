'use client';

import { useState } from 'react';
import ToggleTheme from './toggleTheme';

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Handle notifications toggle
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="px-8 pt-4">
      <h1 className="mb-6 text-2xl font-bold text-[var(--color-secondary)]">
        Settings
      </h1>

      {/* Change Username */}
      <div className="mb-6">
        <label className="mb-1 block font-semibold">Update Username</label>
        <input
          type="text"
          placeholder="Enter new username"
          className="w-full rounded border-none bg-[var(--color-light)] px-4 py-2"
        />
      </div>

      {/* Change Email */}
      <div className="mb-6">
        <label className="mb-1 block font-semibold">Update Email</label>
        <input
          type="email"
          placeholder="Enter new email"
          className="w-full rounded border-none bg-[var(--color-light)] px-4 py-2"
        />
      </div>

      {/* Update Profile Picture */}
      <div className="mb-6">
        <label className="mb-1 block font-semibold">
          Update Profile Picture
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full rounded border-none bg-[var(--color-light)] px-4 py-2"
        />
      </div>

      {/* Toggle Dark Mode */}
      <div className="md:block lg:hidden">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-semibold">Dark Mode</span>
          <ToggleTheme />
        </div>
      </div>

      {/* Manage Notifications */}
      <div className="mb-6 flex items-center justify-between">
        <span className="font-semibold">Notifications</span>
        <button
          className={`rounded px-4 py-2 ${notificationsEnabled ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          onClick={toggleNotifications}
        >
          {notificationsEnabled ? 'Disable' : 'Enable'}
        </button>
      </div>

      {/* Logout */}
      <button className="mt-8 w-full rounded bg-[var(--color-secondary)] py-2 text-white">
        Logout
      </button>
    </div>
  );
}
