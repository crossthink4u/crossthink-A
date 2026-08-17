'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon, User as UserIcon, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Auth Check
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
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
              <Hexagon className="w-8 h-8 text-purple-400" fill="currentColor" fillOpacity={0.15} />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Cross<span className="text-gradient">Think</span><span className="font-normal text-gray-500">: by Iris</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => router.push('/')}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-white/[0.04] ${pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Projects
            </button>
            <button
              onClick={() => router.push('/feed')}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-white/[0.04] ${pathname === '/feed' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Feed
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:outline-none"
                >
                  {user.user_metadata?.full_name ? (
                    <span className="text-sm font-medium text-white">
                      {user.user_metadata.full_name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <UserIcon className="w-5 h-5 text-gray-300" />
                  )}
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b border-white/5 mb-1">
                        <p className="text-sm font-medium text-white truncate">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={() => { setDropdownOpen(false); router.push('/dashboard/workspace'); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Workspace
                      </button>
                      
                      <button
                        onClick={() => { setDropdownOpen(false); router.push('/profile'); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <UserIcon className="w-4 h-4" /> Profile
                      </button>
                      
                      <button
                        onClick={() => { setDropdownOpen(false); handleSignOut(); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors mt-1 border-t border-white/5"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
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
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-violet-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 border border-purple-400/30"
                >
                  Student Hub
                </motion.button>
              </>
            )}
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
              <div className="pt-4 flex flex-col gap-3 px-3 border-t border-white/5 mt-2">
                {user ? (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
                    className="w-full py-3 text-sm font-medium text-rose-400 rounded-full border border-rose-500/20 hover:bg-rose-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </motion.button>
                ) : (
                  <>
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
                      className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-violet-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    >
                      Student Hub
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
