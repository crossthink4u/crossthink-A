import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import { useDashboard } from '../../context/DashboardContext';

const MentorsPage = () => {
  const { mentors, mentorIntro, requestMentorIntro, cancelMentorIntro, simulateMentorAccept, showToast } = useDashboard();

  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Expert Mentors</h1>
        <p className="text-gray-500 dark:text-gray-400">Connect with industry professionals and faculty advisors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentors.map((mentor, idx) => {
          const intro = mentorIntro[mentor.id];
          return (
            <motion.div key={mentor.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}>
              <GlassCard className="p-6 text-center group hover:border-purple-500/30">
                <div className="relative inline-block mb-4">
                  <img src={mentor.image} className="w-24 h-24 rounded-full border-4 border-white dark:border-[#121212] object-cover shadow-lg" alt={mentor.name} />
                  {mentor.active && <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#121212] rounded-full" title="Likely online" />}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{mentor.name}</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-3">{mentor.field}</p>

                <div className="flex justify-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" /> {mentor.rating}
                  </span>
                  <span>•</span>
                  <span>{mentor.exp} Exp</span>
                </div>

                {intro === 'pending' && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-300 mb-3">Intro pending…</p>
                )}
                {intro === 'connected' && (
                  <p className="text-[11px] text-green-600 dark:text-green-300 mb-3">Connected</p>
                )}

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    {!intro && (
                      <Button variant="primary" size="sm" className="flex-1 py-2" type="button" onClick={() => requestMentorIntro(mentor.id)}>
                        Request
                      </Button>
                    )}
                    {intro === 'pending' && (
                      <Button variant="primary" size="sm" className="flex-1 py-2" type="button" onClick={() => simulateMentorAccept(mentor.id)}>
                        Accept intro (demo)
                      </Button>
                    )}
                    {intro === 'connected' && (
                      <Button variant="secondary" size="sm" className="flex-1 py-2" type="button" disabled>
                        Connected
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="px-3" type="button" onClick={() => showToast('Messages are a demo in this build.')}>
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                  {intro === 'pending' && (
                    <button type="button" className="text-[11px] text-gray-500 hover:text-gray-900 dark:hover:text-white" onClick={() => cancelMentorIntro(mentor.id)}>
                      Cancel request
                    </button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorsPage;
