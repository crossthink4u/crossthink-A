import React from 'react';
import { Hexagon, Globe, GitBranch, Link2, ArrowRight } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/[0.06] pt-20 pb-10 relative overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Hexagon className="w-7 h-7 text-cyan-400" fill="currentColor" fillOpacity={0.15} />
            <span className="font-display font-bold text-xl tracking-tight text-white">Cross<span className="text-gradient">Think</span></span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">Where ideas meet talent. The centralized collaboration platform for students, faculty, and innovators.</p>
          <div className="flex gap-3">
            {[GitBranch, Link2, Globe].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {/* Platform links */}
        <div>
          <h4 className="font-semibold text-white mb-5 text-sm">Platform</h4>
          <ul className="space-y-3">
            {['Project Discovery', 'AI Smart Matching', 'Team Workspaces', 'Mentor Integration', 'Analytics'].map((item) => (
              <li key={item}><a href="#" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        {/* Company links */}
        <div>
          <h4 className="font-semibold text-white mb-5 text-sm">Company</h4>
          <ul className="space-y-3">
            {['About Team A', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
              <li key={item}><a href="#" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-white mb-5 text-sm">Stay Updated</h4>
          <p className="text-sm text-gray-500 mb-4">Get the latest updates on new features and projects.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="auth-input text-xs py-2.5 flex-1" />
            <button className="px-3 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} CrossThink — Team A. All rights reserved.</p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Systems Operational
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
