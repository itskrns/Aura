import FooterMenu from './_components/FooterMenu';
import Header from './_components/Header';
import LeftSidebar from './_components/LeftSidebar';
import RightSidebar from './_components/RightSidebar';
import './_styles/globals.css';

export const metadata = {
  title: 'Aura',
  description: 'Next Social Media Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
            <LeftSidebar />
          </aside>

          <footer className="fixed bottom-0 left-0 right-0 z-10 row-start-3 lg:hidden">
            <FooterMenu />
          </footer>
        </div>
      </body>
    </html>
  );
}
