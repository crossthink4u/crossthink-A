import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Calendar } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const mentors = [
  { id: 1, name: "Dr. Emily Chen", field: "Artificial Intelligence", exp: "15 yrs", rating: 4.9, active: true, image: "https://i.pravatar.cc/150?img=5" },
  { id: 2, name: "Prof. Alan Turing", field: "Computer Science", exp: "20 yrs", rating: 5.0, active: false, image: "https://i.pravatar.cc/150?img=11" },
  { id: 3, name: "Sarah Jenkins", field: "UI/UX Design Lead", exp: "8 yrs", rating: 4.8, active: true, image: "https://i.pravatar.cc/150?img=9" },
  { id: 4, name: "Marcus Johnson", field: "Startup Finance", exp: "12 yrs", rating: 4.7, active: true, image: "https://i.pravatar.cc/150?img=12" },
];

const MentorsPage = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Expert Mentors</h1>
        <p className="text-gray-500 dark:text-gray-400">Connect with industry professionals and faculty advisors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentors.map((mentor, idx) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard className="p-6 text-center group hover:border-purple-500/30">
              <div className="relative inline-block mb-4">
                <img src={mentor.image} className="w-24 h-24 rounded-full border-4 border-white dark:border-[#121212] object-cover shadow-lg" alt={mentor.name} />
                {mentor.active && (
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#121212] rounded-full" />
                )}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{mentor.name}</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-3">{mentor.field}</p>
              
              <div className="flex justify-center gap-4 text-xs text-gray-500 mb-6">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> {mentor.rating}</span>
                <span>•</span>
                <span>{mentor.exp} Exp</span>
              </div>

              <div className="flex gap-2">
                <Button variant="primary" size="sm" className="flex-1 py-2">
                  Request
                </Button>
                <Button variant="outline" size="sm" className="px-3">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MentorsPage;
