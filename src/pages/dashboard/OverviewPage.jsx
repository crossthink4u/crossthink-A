import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  Users, 
  Inbox, 
  GraduationCap, 
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  GitPullRequest
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const chartData = [
  { name: 'Mon', value: 20 },
  { name: 'Tue', value: 35 },
  { name: 'Wed', value: 25 },
  { name: 'Thu', value: 50 },
  { name: 'Fri', value: 45 },
  { name: 'Sat', value: 70 },
  { name: 'Sun', value: 90 },
];

const StatCard = ({ title, value, icon, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <GlassCard className="p-5 h-full flex flex-col justify-between group cursor-pointer hover:border-blue-500/30">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex items-center text-xs font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      </div>
    </GlassCard>
  </motion.div>
);

const OverviewPage = () => {
  return (
    <div className="space-y-6 pb-20">
      
      {/* Welcome Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Alex</span> 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your projects today.</p>
        </div>
        <Button variant="primary" className="hidden sm:flex">
          + New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Projects" value="4" icon={<FolderKanban className="w-5 h-5"/>} trend="12%" delay={0.1} />
        <StatCard title="Pending Apps" value="12" icon={<Inbox className="w-5 h-5"/>} trend="8%" delay={0.2} />
        <StatCard title="Team Members" value="18" icon={<Users className="w-5 h-5"/>} trend="24%" delay={0.3} />
        <StatCard title="Mentors Connected" value="3" icon={<GraduationCap className="w-5 h-5"/>} trend="5%" delay={0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Collaboration Activity
              </h3>
              <select className="bg-gray-100 dark:bg-white/5 border-none text-sm rounded-lg px-3 py-1 outline-none text-gray-700 dark:text-gray-300">
                <option>Last 7 Days</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Live Activity Feed */}
        <div>
          <GlassCard className="p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Live Activity</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-white/10 before:to-transparent">
              {[
                { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, title: "Task Completed", desc: "Design system approved", time: "10m ago" },
                { icon: <GitPullRequest className="w-4 h-4 text-purple-500" />, title: "PR Merged", desc: "Auth module by Sarah", time: "2h ago" },
                { icon: <Users className="w-4 h-4 text-blue-500" />, title: "New Member", desc: "David joined 'Neural Optimizer'", time: "4h ago" },
                { icon: <Clock className="w-4 h-4 text-amber-500" />, title: "Meeting Scheduled", desc: "Review with Mentor", time: "Yesterday" },
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-gray-100 dark:bg-gray-800 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {item.icon}
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{item.title}</h4>
                      <span className="text-[10px] text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default OverviewPage;
