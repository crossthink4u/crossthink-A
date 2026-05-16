'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'AI Matching', href: '#ai-showcase' },
  { name: 'Platform', href: '#dashboard-preview' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group"
            onClick={() => router.push('/')}
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="relative"
            >
              <Hexagon className="w-8 h-8 text-cyan-400" fill="currentColor" fillOpacity={0.15} />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Cross<span className="text-gradient">Think</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04]"
            >
              Projects
            </button>
            <button
              onClick={() => router.push('/feed')}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04]"
            >
              Feed
            </button>
            <button
              onClick={() => router.push('/dashboard/workspace')}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04]"
            >
              Workspace
            </button>
            <button
              onClick={() => router.push('/profile')}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04]"
            >
              Profile
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/login')}
              className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/[0.06]"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/register?role=student')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 border border-cyan-400/30"
            >
              Student Hub
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <button
                onClick={() => { setMobileMenuOpen(false); router.push('/'); }}
                className="block w-full text-left px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); router.push('/feed'); }}
                className="block w-full text-left px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
              >
                Feed
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); router.push('/dashboard/workspace'); }}
                className="block w-full text-left px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
              >
                Workspace
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); router.push('/profile'); }}
                className="block w-full text-left px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
              >
                Profile
              </button>
              <div className="pt-4 flex flex-col gap-3 px-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setMobileMenuOpen(false); router.push('/login'); }}
                  className="w-full py-3 text-sm font-medium text-gray-300 rounded-full border border-white/10 hover:bg-white/[0.04] transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setMobileMenuOpen(false); router.push('/register?role=student'); }}
                  className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  Student Hub
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
