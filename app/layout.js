import './_styles/globals.css';

export const metadata = {
  title: 'Sign-In to Aura',
  description: 'Next Social Media Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
