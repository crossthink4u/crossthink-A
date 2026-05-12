import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  GitPullRequest,
  Sparkles,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import { useDashboard } from '../../context/DashboardContext';

function formatRelative(iso) {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'Yesterday';
  return `${d}d ago`;
}

function activityIcon(type) {
  if (type === 'check') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  if (type === 'pr') return <GitPullRequest className="w-4 h-4 text-purple-500" />;
  if (type === 'users') return <Users className="w-4 h-4 text-blue-500" />;
  if (type === 'inbox') return <Inbox className="w-4 h-4 text-cyan-500" />;
  if (type === 'spark') return <Sparkles className="w-4 h-4 text-yellow-500" />;
  return <Clock className="w-4 h-4 text-amber-500" />;
}

const StatCard = ({ title, value, icon, trend, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
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
  const navigate = useNavigate();
  const { user, projects, applications, teams, mentors, mentorIntro, activity } = useDashboard();
  const [chartRange, setChartRange] = useState('7d');

  const pendingApps = applications.filter((a) => a.status === 'pending').length;
  const teamMembers = teams.reduce((sum, t) => sum + (t.members || 0), 0);
  const mentorsConnected = mentors.filter((m) => mentorIntro[m.id] === 'connected').length;

  const chartData = useMemo(() => {
    const days = chartRange === '7d' ? 7 : 30;
    const buckets = Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - (days - 1 - i));
      return { d, label: d.toLocaleDateString(undefined, { weekday: 'short' }), value: 0 };
    });
    const start = buckets[0].d.getTime();
    const end = buckets[buckets.length - 1].d.getTime() + 86400000;
    activity.forEach((ev) => {
      const ts = new Date(ev.createdAt).getTime();
      if (ts < start || ts >= end) return;
      const day = new Date(ev.createdAt);
      day.setHours(0, 0, 0, 0);
      const idx = Math.round((day.getTime() - start) / 86400000);
      if (idx >= 0 && idx < buckets.length) buckets[idx].value += 1;
    });
    const maxV = Math.max(1, ...buckets.map((b) => b.value));
    return buckets.map((b) => ({
      name: chartRange === '7d' ? b.label : `${b.d.getMonth() + 1}/${b.d.getDate()}`,
      value: Math.round(10 + (b.value / maxV) * 90),
    }));
  }, [activity, chartRange]);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {user.firstName}
            </span>{' '}
            👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your projects today.</p>
        </div>
        <Button variant="primary" className="hidden sm:flex" onClick={() => navigate('/dashboard/projects', { state: { openCreate: true } })}>
          + New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Discoverable Projects" value={String(projects.length)} icon={<FolderKanban className="w-5 h-5" />} trend="Live" delay={0.1} />
        <StatCard title="Pending Apps" value={String(pendingApps)} icon={<Inbox className="w-5 h-5" />} trend={pendingApps ? 'Action' : 'Clear'} delay={0.2} />
        <StatCard title="Team Members" value={String(teamMembers)} icon={<Users className="w-5 h-5" />} trend="Roster" delay={0.3} />
        <StatCard title="Mentors Connected" value={String(mentorsConnected)} icon={<GraduationCap className="w-5 h-5" />} trend="Network" delay={0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Collaboration Activity
              </h3>
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                className="bg-gray-100 dark:bg-white/5 border-none text-sm rounded-lg px-3 py-1 outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">This Month</option>
              </select>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 10, 10, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <div>
          <GlassCard className="p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Live Activity</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-white/10 before:to-transparent">
              {activity.slice(0, 8).map((item) => (
                <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-gray-100 dark:bg-gray-800 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {activityIcon(item.type)}
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{item.title}</h4>
                      <span className="text-[10px] text-gray-500">{formatRelative(item.createdAt)}</span>
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
