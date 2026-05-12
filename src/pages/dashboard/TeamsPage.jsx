import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Settings, MessageSquare, MoreVertical, TrendingUp } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const teams = [
  { id: 1, name: "Neural Optimizer", members: 5, roles: ["Dev", "Design", "Bio"], progress: 75, status: "Active Sprint" },
  { id: 2, name: "Eco-Tracking App", members: 3, roles: ["Dev", "Env Sci"], progress: 40, status: "Planning" },
];

const TeamsPage = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Teams</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your active collaborations and team members.</p>
        </div>
        <Button variant="primary" className="flex-shrink-0">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {teams.map((team, idx) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {team.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{team.name}</h3>
                    <p className="text-sm text-gray-500">{team.status}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex -space-x-3 mb-6">
                {[1,2,3,4,5].slice(0, team.members).map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?img=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#121212] z-10" alt="member" />
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 font-medium">Project Progress</span>
                    <span className="text-gray-900 dark:text-white font-bold">{team.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${team.progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                <Button variant="outline" size="sm" className="flex-1 justify-center">
                  <MessageSquare className="w-4 h-4 mr-2" /> Chat
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-center">
                  <Settings className="w-4 h-4 mr-2" /> Manage
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
