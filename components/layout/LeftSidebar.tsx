import React from 'react';
import { Home, Bookmark, User, FileText, BarChart2, Plus } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Bookmark, label: 'Library', href: '/library' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: FileText, label: 'Stories', href: '/stories' },
    { icon: BarChart2, label: 'Stats', href: '/stats' },
  ];

  return (
    <div className="sticky top-24 w-64 shrink-0 hidden lg:flex flex-col gap-8">
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#1a171d] text-[#845ec2] font-semibold border border-[#4b4453]/30' 
                  : 'text-gray-400 hover:text-[#b0a8b9] hover:bg-[#1a171d]/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <hr className="border-[#4b4453]/20 mx-4" />

      {/* Following Section */}
      <div className="px-4">
        <h3 className="text-xs font-semibold text-[#4b4453] uppercase tracking-wider mb-4">Following</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#1a171d] text-[#845ec2] flex items-center justify-center text-xs font-bold border border-[#4b4453]/30">
                P
              </div>
              <span className="text-sm text-[#9a7dc9] group-hover:text-white transition-colors">Pragmatic Coders</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#845ec2]"></div>
          </div>
          
          <button className="flex items-center gap-3 text-[#4b4453] hover:text-[#845ec2] transition-colors mt-2">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Find collaborators</span>
          </button>
        </div>
      </div>
    </div>
  );
}
