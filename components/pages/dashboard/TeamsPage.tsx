'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Settings, MessageSquare, MoreVertical } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useDashboard } from '@/context/DashboardContext';

const TeamsPage = () => {
  const { teams, inviteTeamMember, setTeamProgress, showToast } = useDashboard();
  const [manageId, setManageId] = useState(null);

  const onInvite = (teamId) => {
    const name = window.prompt('Who are you inviting?', 'New teammate');
    if (name === null) return;
    const team = teams.find((t) => t.id === teamId);
    if (team && team.members >= team.capacity) {
      showToast('This team is at capacity.');
      return;
    }
    inviteTeamMember(teamId, name);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Teams</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your active collaborations and team members.</p>
        </div>
        <Button variant="primary" className="flex-shrink-0" type="button" onClick={() => teams[0] && onInvite(teams[0].id)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {teams.map((team, idx) => (
          <motion.div key={team.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <GlassCard className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {team.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{team.name}</h3>
                    <p className="text-sm text-gray-500">{team.status}</p>
                  </div>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => setManageId((id) => (id === team.id ? null : team.id))}>
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex -space-x-3 mb-6">
                {Array.from({ length: team.members }).map((_, i) => (
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
                    <div className="h-full bg-violet-500 transition-all" style={{ width: `${team.progress}%` }} />
                  </div>
                </div>
                {manageId === team.id && (
                  <div className="rounded-xl border border-gray-200 dark:border-white/10 p-3 bg-gray-50/50 dark:bg-white/[0.02]">
                    <label className="text-xs text-gray-500">Adjust progress</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={team.progress}
                      onChange={(e) => setTeamProgress(team.id, Number(e.target.value))}
                      className="w-full mt-2 accent-violet-600"
                    />
                    <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                      <span>{team.members}/{team.capacity} members</span>
                      <button type="button" className="text-violet-600 dark:text-purple-400" onClick={() => onInvite(team.id)}>
                        Invite
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                <Button variant="outline" size="sm" className="flex-1 justify-center" type="button" onClick={() => showToast('Team chat is a demo in this build.')}>
                  <MessageSquare className="w-4 h-4 mr-2" /> Chat
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-center" type="button" onClick={() => setManageId((id) => (id === team.id ? null : team.id))}>
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


