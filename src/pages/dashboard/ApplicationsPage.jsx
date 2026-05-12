import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

const applications = [
  { id: 1, project: "Quantum Computing Simulator", role: "Physics Major", status: "accepted", date: "Oct 12", owner: "Dr. Chen" },
  { id: 2, title: "FinTech Market Predictor", role: "Frontend Dev", status: "pending", date: "Oct 15", owner: "Sarah J." },
  { id: 3, title: "Virtual Reality Campus", role: "3D Modeler", status: "rejected", date: "Oct 05", owner: "Alex T." },
];

const statusStyles = {
  accepted: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
};

const ApplicationsPage = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Applications</h1>
        <p className="text-gray-500 dark:text-gray-400">Track the status of projects you've applied to.</p>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10 text-sm text-gray-500 dark:text-gray-400">
                <th className="p-4 font-medium">Project</th>
                <th className="p-4 font-medium">Role Applied</th>
                <th className="p-4 font-medium">Owner</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <motion.tr 
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 font-semibold text-gray-900 dark:text-white">
                    {app.project || app.title}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                    {app.role}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                    {app.owner}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {app.date}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${statusStyles[app.status]} flex items-center gap-1.5 w-max`}>
                      {app.status === 'accepted' && <CheckCircle2 className="w-3 h-3" />}
                      {app.status === 'pending' && <Clock className="w-3 h-3" />}
                      {app.status === 'rejected' && <XCircle className="w-3 h-3" />}
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-white/5">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default ApplicationsPage;
