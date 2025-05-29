'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '@/app/_services/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [curUser, setCurUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserSession() {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        const userData = await getUser(session.user.email);
        setCurUser(userData);
        console.log(`Use session: ${curUser}`);
      }
      setLoading(false);
    }
    fetchUserSession();
  }, []);

  return (
    <UserContext.Provider value={{ curUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
