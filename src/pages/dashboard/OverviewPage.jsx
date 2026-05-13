import { motion } from 'framer-motion';
import HeroSection from '../../components/dashboard/overview/HeroSection';
import QuickActions from '../../components/dashboard/overview/QuickActions';
import ActiveProjects from '../../components/dashboard/overview/ActiveProjects';
import TasksDeadlines from '../../components/dashboard/overview/TasksDeadlines';
import AIRecommendations from '../../components/dashboard/overview/AIRecommendations';
import ActivityFeed from '../../components/dashboard/overview/ActivityFeed';
import CalendarEvents from '../../components/dashboard/overview/CalendarEvents';
import ProductivityInsights from '../../components/dashboard/overview/ProductivityInsights';

const OverviewPage = () => {
  return (
    <div className="space-y-6 pb-20">
      {/* Hero */}
      <HeroSection />

      {/* Quick Actions */}
      <QuickActions />

      {/* Active Projects + Tasks */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ActiveProjects />
        </div>
        <div className="lg:col-span-2">
          <TasksDeadlines />
        </div>
      </div>

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Activity + Calendar */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <ActivityFeed />
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <CalendarEvents />
        </div>
      </div>

      {/* Productivity Insights */}
      <ProductivityInsights />
    </div>
  );
};

export default OverviewPage;
