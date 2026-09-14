// Rich seed data for the Overview Dashboard redesign

export const defaultTasks = [
  { id: 'tk-1', title: 'Design auth workflow', project: 'AI Study Buddy', priority: 'urgent', dueDate: '2026-05-13T18:00:00', assignees: ['Alex T.', 'Sarah J.'], status: 'in-progress' },
  { id: 'tk-2', title: 'Finish mentor matching API', project: 'CrossThink Core', priority: 'urgent', dueDate: '2026-05-13T23:59:00', assignees: ['Alex T.'], status: 'todo' },
  { id: 'tk-3', title: 'Deploy landing page v2', project: 'Smart Campus', priority: 'medium', dueDate: '2026-05-14T12:00:00', assignees: ['Alex T.', 'David K.'], status: 'todo' },
  { id: 'tk-4', title: 'Complete AI matching logic', project: 'CrossThink Core', priority: 'planned', dueDate: '2026-05-16T18:00:00', assignees: ['Alex T.'], status: 'todo' },
  { id: 'tk-5', title: 'Write unit tests for API', project: 'AI Study Buddy', priority: 'medium', dueDate: '2026-05-15T18:00:00', assignees: ['Alex T.', 'Jessica W.'], status: 'todo' },
  { id: 'tk-6', title: 'Review PR #42 — Auth module', project: 'AI Study Buddy', priority: 'urgent', dueDate: '2026-05-12T18:00:00', assignees: ['Alex T.'], status: 'todo' },
  { id: 'tk-7', title: 'Setup CI/CD pipeline', project: 'EcoTracker', priority: 'planned', dueDate: '2026-05-18T18:00:00', assignees: ['Alex T.', 'David K.'], status: 'todo' },
  { id: 'tk-8', title: 'Create onboarding flow mockups', project: 'Smart Campus', priority: 'medium', dueDate: '2026-05-14T23:59:00', assignees: ['Alex T.'], status: 'done' },
];

export const defaultEvents = [
  { id: 'ev-c1', title: 'Sprint Review — AI Study Buddy', type: 'sprint', date: '2026-05-13T16:00:00', duration: 60 },
  { id: 'ev-c2', title: 'Mentor Session — Dr. Chen', type: 'mentor', date: '2026-05-14T10:00:00', duration: 45 },
  { id: 'ev-c3', title: 'Team Standup', type: 'meeting', date: '2026-05-14T09:00:00', duration: 15 },
  { id: 'ev-c4', title: 'Landing Page Deadline', type: 'deadline', date: '2026-05-15T23:59:00', duration: 0 },
  { id: 'ev-c5', title: 'Project Pitch Presentation', type: 'presentation', date: '2026-05-17T14:00:00', duration: 30 },
  { id: 'ev-c6', title: 'Mentor Session — Sarah Jenkins', type: 'mentor', date: '2026-05-19T11:00:00', duration: 45 },
];

export const defaultProductivity = {
  tasksCompletedThisWeek: 12,
  projectProgressIncrease: 18,
  contributionStreak: 7,
  collaborationScore: 85,
  githubCommits: 23,
  activeHours: 34,
};

export const defaultAIRecommendations = {
  projects: [
    { id: 'rec-p1', title: 'Quantum Study Tools', match: 94, reason: 'Aligns with your AI/ML skills and academic focus', action: 'View Project' },
    { id: 'rec-p2', title: 'Campus Health Tracker', match: 87, reason: 'Needs React expertise — your top skill', action: 'View Project' },
  ],
  teammates: [
    { id: 'rec-t1', name: 'David Kim', role: 'Backend Architect', match: 96, reason: 'Fills your backend gap perfectly', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: 'rec-t2', name: 'Jessica Wong', role: 'UX Researcher', match: 89, reason: 'Complements your frontend skills', avatar: 'https://i.pravatar.cc/150?img=16' },
  ],
  mentors: [
    { id: 'rec-m1', name: 'Dr. Emily Chen', field: 'AI/ML', match: 98, reason: 'Expert in your project domain' },
  ],
  skills: [
    { id: 'rec-s1', name: 'GraphQL', reason: 'Trending in 3 of your active projects', priority: 'high' },
    { id: 'rec-s2', name: 'Docker', reason: 'Required for CI/CD tasks you own', priority: 'medium' },
  ],
};

export const defaultOnlineTeammates = [
  { id: 'ot-1', name: 'Sarah Jenkins', role: 'UI/UX Lead', avatar: 'https://i.pravatar.cc/150?img=9', status: 'active' },
  { id: 'ot-2', name: 'David Kim', role: 'Backend Dev', avatar: 'https://i.pravatar.cc/150?img=14', status: 'active' },
  { id: 'ot-3', name: 'Jessica Wong', role: 'UX Research', avatar: 'https://i.pravatar.cc/150?img=16', status: 'idle' },
  { id: 'ot-4', name: 'Marcus Johnson', role: 'Finance', avatar: 'https://i.pravatar.cc/150?img=12', status: 'active' },
];

export const defaultQuickNotes = [
  { id: 'qn-1', text: 'Discuss API rate limiting with David', createdAt: '2026-05-13T10:00:00' },
  { id: 'qn-2', text: 'Check mentor availability for Friday', createdAt: '2026-05-13T09:00:00' },
];

// Enhanced project data with more fields for overview cards
export const enhancedProjects = [
  {
    id: 'p-1', title: 'AI Study Buddy', description: 'AI-powered study companion with adaptive learning paths',
    dept: 'CS + Education', progress: 72, currentSprint: 'Sprint 4', dueDate: '2026-06-01',
    teamMembers: ['Alex T.', 'Sarah J.', 'David K.', 'Jessica W.'], mentor: 'Dr. Emily Chen',
    githubStatus: '3 open PRs', taskCompletion: 18, totalTasks: 25,
    latestActivity: 'PR merged: Auth module', tech: ['React', 'Python', 'TensorFlow'],
    image: 'linear-gradient(135deg, #00f0ff 0%, #0055ff 100%)',
  },
  {
    id: 'p-2', title: 'Smart Campus', description: 'IoT-driven campus navigation and resource management',
    dept: 'Engineering + Design', progress: 45, currentSprint: 'Sprint 2', dueDate: '2026-06-15',
    teamMembers: ['Alex T.', 'Maya R.'], mentor: 'Prof. Alan Turing',
    githubStatus: '1 open PR', taskCompletion: 8, totalTasks: 20,
    latestActivity: 'New wireframes uploaded', tech: ['React Native', 'Node.js', 'IoT'],
    image: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    id: 'p-3', title: 'EcoTracker', description: 'Carbon footprint tracking for campus sustainability',
    dept: 'Env Sci + CS', progress: 28, currentSprint: 'Sprint 1', dueDate: '2026-07-01',
    teamMembers: ['Alex T.', 'Marcus J.'], mentor: null,
    githubStatus: 'No activity', taskCompletion: 4, totalTasks: 15,
    latestActivity: 'Project kickoff completed', tech: ['Vue.js', 'Python', 'AWS'],
    image: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    id: 'p-4', title: 'CrossThink Core', description: 'The platform you\'re using right now — meta!',
    dept: 'CS + Product', progress: 61, currentSprint: 'Sprint 3', dueDate: '2026-05-30',
    teamMembers: ['Alex T.', 'Sarah J.', 'David K.'], mentor: 'Sarah Jenkins',
    githubStatus: '5 open PRs', taskCompletion: 14, totalTasks: 22,
    latestActivity: 'Mentor matching API deployed', tech: ['React', 'Node.js', 'PostgreSQL'],
    image: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  },
];
