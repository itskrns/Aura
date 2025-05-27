'use client';

import Header from './Header';
import FooterMenu from './FooterMenu';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

export default function AppLayout({ curUser, children }) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] lg:grid-cols-[18rem_1fr_20rem] lg:grid-rows-[auto_1fr]">
      <header className="col-start-1 row-start-1 hidden lg:col-span-3 lg:block">
        <Header />
      </header>

      <aside className="col-start-1 row-start-2 hidden lg:block">
        <RightSidebar />
      </aside>

      <main className="scrollbar-hide row-start-2 h-full overflow-y-auto scroll-smooth bg-[var(--color-bg)] lg:col-start-2 lg:p-4">
        {children}
      </main>

      <aside className="scrollbar-hide col-start-3 row-start-2 hidden overflow-y-hidden scroll-smooth bg-[var(--color-bg)] lg:block">
        <LeftSidebar curUser={curUser} />
      </aside>

      <footer className="fixed bottom-0 left-0 right-0 z-10 row-start-3 lg:hidden">
        <FooterMenu />
      </footer>
    </div>
  );
}
