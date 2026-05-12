import React from 'react';
import { Hexagon, Globe, MessageSquare, Share2, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 dark:bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Hexagon className="w-8 h-8 text-blue-600 dark:text-cyan-400" fill="currentColor" fillOpacity={0.2} />
              <span className="font-display font-bold text-2xl tracking-tight">
                Cross<span className="text-gradient">Think</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
              Where ideas meet talent. The centralized collaboration platform for students, faculty, and innovators.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Project Discovery</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">AI Smart Matching</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Collaboration Dashboard</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Mentor Integration</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">About Team A</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get the latest updates on new features and projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white w-full"
              />
              <Button variant="primary" className="px-4 py-2">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} CrossThink - Team A. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
