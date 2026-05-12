import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/dashboard/OverviewPage';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import TeamsPage from './pages/dashboard/TeamsPage';
import ApplicationsPage from './pages/dashboard/ApplicationsPage';
import MentorsPage from './pages/dashboard/MentorsPage';
import AIMatchPage from './pages/dashboard/AIMatchPage';
import WorkspacePage from './pages/dashboard/WorkspacePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="mentors" element={<MentorsPage />} />
          <Route path="ai-match" element={<AIMatchPage />} />
          <Route path="workspace" element={<WorkspacePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
