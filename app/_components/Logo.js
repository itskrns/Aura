import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="text-[2rem] font-semibold uppercase hover:text-primary-800 lg:cursor-pointer">
        aura
      </h1>
    </Link>
  );
}
