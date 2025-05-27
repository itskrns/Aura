'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth');
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <p>Connecting Aura...</p>;
    </div>
  );
}
