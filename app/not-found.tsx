import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white text-center px-4">
      <h1 className="text-4xl font-display font-bold mb-3">Page not found</h1>
      <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold text-sm">
        Back to CrossThink
      </Link>
    </div>
  );
}
