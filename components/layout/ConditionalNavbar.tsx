'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';

const SUPPRESS_PATHS = ['/', '/landing', '/login', '/register'];

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const suppress =
    SUPPRESS_PATHS.includes(pathname) ||
    pathname.startsWith('/projects');
  if (suppress) return null;
  return <Navbar />;
}
