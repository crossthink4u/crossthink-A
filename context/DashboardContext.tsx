'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  defaultTasks,
  defaultEvents,
  defaultProductivity,
  defaultAIRecommendations,
  defaultOnlineTeammates,
  defaultQuickNotes,
  enhancedProjects,
} from './overviewData';

const STORAGE_KEY = 'crossthink-dashboard-state-v1';

const initialWorkspace = {
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: ['task-3'] },
    review: { id: 'review', title: 'Review', taskIds: ['task-4'] },
    done: { id: 'done', title: 'Done', taskIds: [] },
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Design System setup',
      priority: 'High',
      comments: 3,
      attachments: 1,
    },
    'task-2': {
      id: 'task-2',
      content: 'Database schema design',
      priority: 'Medium',
      comments: 0,
      attachments: 2,
    },
    'task-3': {
      id: 'task-3',
      content: 'Authentication Flow',
      priority: 'High',
      comments: 5,
      attachments: 0,
    },
    'task-4': {
      id: 'task-4',
      content: 'Landing Page UI',
      priority: 'Low',
      comments: 1,
      attachments: 0,
    },
  },
  columnOrder: ['todo', 'in-progress', 'review', 'done'],
};

const defaultSeedProjects = [
  {
    id: 'p-1',
    title: 'Neural Optimizer Framework',
    dept: 'CS + Biology',
    size: '5/6',
    filled: 5,
    capacity: 6,
    match: 98,
    role: 'Frontend Engineer',
    tech: ['React', 'Python', 'TensorFlow'],
    image: 'linear-gradient(135deg, #00f0ff 0%, #0055ff 100%)',
    tags: ['Computer Science', 'Engineering'],
    owner: 'Dr. Chen',
  },
  {
    id: 'p-2',
    title: 'Eco-Tracking App',
    dept: 'Design + Env Sci',
    size: '2/4',
    filled: 2,
    capacity: 4,
    match: 85,
    role: 'UI/UX Designer',
    tech: ['Figma', 'Swift'],
    image: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    tags: ['Design', 'Engineering'],
    owner: 'Maya R.',
  },
  {
    id: 'p-3',
    title: 'FinTech Market Predictor',
    dept: 'Finance + CS',
    size: '3/5',
    filled: 3,
    capacity: 5,
    match: 92,
    role: 'Data Scientist',
    tech: ['Python', 'Pandas', 'AWS'],
    image: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    tags: ['Computer Science', 'Business'],
    owner: 'Sarah J.',
  },
  {
    id: 'p-4',
    title: 'Virtual Reality Campus Tour',
    dept: 'Arts + Engineering',
    size: '4/8',
    filled: 4,
    capacity: 8,
    match: 78,
    role: '3D Artist',
    tech: ['Unity', 'Blender', 'C#'],
    image: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    tags: ['Design', 'Engineering'],
    owner: 'Alex T.',
  },
];

const defaultApplications = [
  {
    id: 'a-1',
    projectId: 'p-x',
    projectTitle: 'Quantum Computing Simulator',
    role: 'Physics Major',
    status: 'accepted',
    date: 'Oct 12',
    owner: 'Dr. Chen',
  },
  {
    id: 'a-2',
    projectId: 'p-3',
    projectTitle: 'FinTech Market Predictor',
    role: 'Frontend Dev',
    status: 'pending',
    date: 'Oct 15',
    owner: 'Sarah J.',
  },
  {
    id: 'a-3',
    projectId: 'p-4',
    projectTitle: 'Virtual Reality Campus',
    role: '3D Modeler',
    status: 'rejected',
    date: 'Oct 05',
    owner: 'Alex T.',
  },
];

const defaultTeams = [
  {
    id: 't-1',
    name: 'Neural Optimizer',
    members: 5,
    capacity: 8,
    roles: ['Dev', 'Design', 'Bio'],
    progress: 75,
    status: 'Active Sprint',
  },
  {
    id: 't-2',
    name: 'Eco-Tracking App',
    members: 3,
    capacity: 6,
    roles: ['Dev', 'Env Sci'],
    progress: 40,
    status: 'Planning',
  },
];

const defaultMentors = [
  {
    id: 'm-1',
    name: 'Dr. Emily Chen',
    field: 'Artificial Intelligence',
    exp: '15 yrs',
    rating: 4.9,
    active: true,
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'm-2',
    name: 'Prof. Alan Turing',
    field: 'Computer Science',
    exp: '20 yrs',
    rating: 5.0,
    active: false,
    image: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 'm-3',
    name: 'Sarah Jenkins',
    field: 'UI/UX Design Lead',
    exp: '8 yrs',
    rating: 4.8,
    active: true,
    image: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 'm-4',
    name: 'Marcus Johnson',
    field: 'Startup Finance',
    exp: '12 yrs',
    rating: 4.7,
    active: true,
    image: 'https://i.pravatar.cc/150?img=12',
  },
];

const defaultSkillProfile = [
  { subject: 'Frontend', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 60, fullMark: 100 },
  { subject: 'Design', A: 85, fullMark: 100 },
  { subject: 'Data Science', A: 40, fullMark: 100 },
  { subject: 'Management', A: 75, fullMark: 100 },
  { subject: 'Marketing', A: 65, fullMark: 100 },
];

const defaultSynergyCandidates = [
  {
    id: 's-1',
    name: 'David Kim',
    role: 'Backend Architect',
    strengths: { Backend: 95, 'Data Science': 70, Frontend: 55 },
    synergy: 'Fills your technical gaps perfectly.',
  },
  {
    id: 's-2',
    name: 'Jessica Wong',
    role: 'UX Researcher',
    strengths: { Design: 92, Frontend: 72, Marketing: 60 },
    synergy: 'Complements your frontend skills.',
  },
];

function nowIso() {
  return new Date().toISOString();
}

function defaultActivity() {
  const t = Date.now();
  return [
    {
      id: 'ev-1',
      type: 'check',
      title: 'Task Completed',
      desc: 'Design system approved',
      createdAt: new Date(t - 10 * 60 * 1000).toISOString(),
    },
    {
      id: 'ev-2',
      type: 'pr',
      title: 'PR Merged',
      desc: 'Auth module by Sarah',
      createdAt: new Date(t - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'ev-3',
      type: 'users',
      title: 'New Member',
      desc: "David joined 'Neural Optimizer'",
      createdAt: new Date(t - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'ev-4',
      type: 'clock',
      title: 'Meeting Scheduled',
      desc: 'Review with Mentor',
      createdAt: new Date(t - 26 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

function getDefaultState() {
  return {
    user: { firstName: 'Alex', lastName: 'Turner', major: 'Computer Science' },
    projects: defaultSeedProjects,
    enhancedProjects,
    bookmarks: [],
    applications: defaultApplications,
    teams: defaultTeams,
    mentors: defaultMentors,
    mentorIntro: {},
    skillProfile: defaultSkillProfile,
    synergyCandidates: defaultSynergyCandidates,
    synergyConnections: [],
    activity: defaultActivity(),
    workspace: initialWorkspace,
    overviewTasks: defaultTasks,
    calendarEvents: defaultEvents,
    productivity: defaultProductivity,
    aiRecommendations: defaultAIRecommendations,
    onlineTeammates: defaultOnlineTeammates,
    quickNotes: defaultQuickNotes,
    rightSidebarOpen: false,
    toast: null,
    headerSearch: '',
    notificationCount: 2,
  };
}

function mergeDefaults(parsed) {
  const base = getDefaultState();
  if (!parsed || typeof parsed !== 'object') return base;
  return {
    ...base,
    ...parsed,
    user: { ...base.user, ...(parsed.user || {}) },
    projects: Array.isArray(parsed.projects) && parsed.projects.length ? parsed.projects : base.projects,
    bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
    applications: Array.isArray(parsed.applications) && parsed.applications.length
      ? parsed.applications
      : base.applications,
    teams: Array.isArray(parsed.teams) && parsed.teams.length ? parsed.teams : base.teams,
    mentors: Array.isArray(parsed.mentors) && parsed.mentors.length ? parsed.mentors : base.mentors,
    mentorIntro: parsed.mentorIntro && typeof parsed.mentorIntro === 'object' ? parsed.mentorIntro : {},
    skillProfile: Array.isArray(parsed.skillProfile) && parsed.skillProfile.length
      ? parsed.skillProfile
      : base.skillProfile,
    synergyCandidates:
      Array.isArray(parsed.synergyCandidates) && parsed.synergyCandidates.length
        ? parsed.synergyCandidates
        : base.synergyCandidates,
    synergyConnections: Array.isArray(parsed.synergyConnections) ? parsed.synergyConnections : [],
    activity: Array.isArray(parsed.activity) && parsed.activity.length ? parsed.activity : base.activity,
    workspace: parsed.workspace?.columns ? parsed.workspace : base.workspace,
    overviewTasks: Array.isArray(parsed.overviewTasks) && parsed.overviewTasks.length ? parsed.overviewTasks : defaultTasks,
    calendarEvents: Array.isArray(parsed.calendarEvents) && parsed.calendarEvents.length ? parsed.calendarEvents : defaultEvents,
    productivity: parsed.productivity && typeof parsed.productivity === 'object' ? parsed.productivity : defaultProductivity,
    aiRecommendations: parsed.aiRecommendations || defaultAIRecommendations,
    onlineTeammates: Array.isArray(parsed.onlineTeammates) ? parsed.onlineTeammates : defaultOnlineTeammates,
    quickNotes: Array.isArray(parsed.quickNotes) ? parsed.quickNotes : defaultQuickNotes,
    enhancedProjects: Array.isArray(parsed.enhancedProjects) && parsed.enhancedProjects.length ? parsed.enhancedProjects : enhancedProjects,
    rightSidebarOpen: false,
    toast: null,
    headerSearch: typeof parsed.headerSearch === 'string' ? parsed.headerSearch : '',
    notificationCount: typeof parsed.notificationCount === 'number' ? parsed.notificationCount : 2,
  };
}

function loadState() {
  if (typeof window === 'undefined') return getDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    return mergeDefaults(JSON.parse(raw));
  } catch {
    return getDefaultState();
  }
}

function computeSynergyMatch(skillProfile, strengths) {
  const map = Object.fromEntries(skillProfile.map((s) => [s.subject, s.A]));
  const keys = Object.keys(strengths);
  if (!keys.length) return 0;
  let sum = 0;
  keys.forEach((k) => {
    const mine = map[k] ?? 50;
    const theirs = strengths[k] ?? 0;
    sum += Math.min(100, mine + (100 - mine) * (theirs / 100) * 0.35);
  });
  return Math.round(sum / keys.length);
}

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [state, setState] = useState(getDefaultState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState(mergeDefaults(JSON.parse(raw)));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    const persist = { ...state };
    delete persist.toast;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
  }, [state, mounted]);

  const dismissToast = useCallback(() => {
    setState((s) => ({ ...s, toast: null }));
  }, []);

  const showToast = useCallback((message, variant = 'info') => {
    setState((s) => ({ ...s, toast: { id: String(Date.now()), message, variant } }));
  }, []);

  useEffect(() => {
    if (!state.toast) return undefined;
    const t = setTimeout(dismissToast, 3200);
    return () => clearTimeout(t);
  }, [state.toast, dismissToast]);

  const pushActivity = useCallback((entry) => {
    setState((s) => ({
      ...s,
      activity: [{ id: `ev-${Date.now()}`, createdAt: nowIso(), ...entry }, ...s.activity].slice(0, 40),
    }));
  }, []);

  const setHeaderSearch = useCallback((headerSearch) => {
    setState((s) => ({ ...s, headerSearch }));
  }, []);

  const clearNotifications = useCallback(() => {
    setState((s) => ({ ...s, notificationCount: 0 }));
  }, []);

  const toggleBookmark = useCallback((projectId) => {
    setState((s) => {
      const has = s.bookmarks.includes(projectId);
      const bookmarks = has ? s.bookmarks.filter((id) => id !== projectId) : [...s.bookmarks, projectId];
      return { ...s, bookmarks };
    });
  }, []);

  const addProject = useCallback(
    ({ title, dept, role, tech, tags }) => {
      const id = `p-${Date.now()}`;
      const techList = tech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const tagList = tags
        ? tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : ['Computer Science'];
      const image = 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)';
      setState((s) => {
        const owner = `${s.user.firstName} ${s.user.lastName}`;
        const project = {
          id,
          title,
          dept,
          size: '1/4',
          filled: 1,
          capacity: 4,
          match: 88,
          role,
          tech: techList.length ? techList : ['General'],
          image,
          tags: tagList,
          owner,
        };
        return { ...s, projects: [project, ...s.projects] };
      });
      pushActivity({ type: 'spark', title: 'Project created', desc: title });
      showToast('Project published to the board.');
    },
    [pushActivity, showToast],
  );

  const applyToProject = useCallback(
    (project) => {
      setState((s) => {
        const exists = s.applications.some(
          (a) => a.projectId === project.id && a.role === project.role && a.status === 'pending',
        );
        if (exists) {
          return { ...s, toast: { id: String(Date.now()), message: 'You already have a pending application for this role.', variant: 'warn' } };
        }
        const app = {
          id: `a-${Date.now()}`,
          projectId: project.id,
          projectTitle: project.title,
          role: project.role,
          status: 'pending',
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          owner: project.owner || 'Team',
        };
        return {
          ...s,
          applications: [app, ...s.applications],
        };
      });
      pushActivity({
        type: 'inbox',
        title: 'Application sent',
        desc: `${project.title} — ${project.role}`,
      });
      showToast(`Applied to “${project.title}”.`);
    },
    [pushActivity, showToast],
  );

  const inviteTeamMember = useCallback(
    (teamId, invitedName) => {
      const label = (invitedName || '').trim() || 'New teammate';
      setState((s) => ({
        ...s,
        teams: s.teams.map((team) => {
          if (team.id !== teamId) return team;
          if (team.members >= team.capacity) return team;
          return { ...team, members: team.members + 1 };
        }),
      }));
      pushActivity({ type: 'users', title: 'Invite sent', desc: `${label} added to roster` });
      showToast('Invitation queued (demo). Team size updated.');
    },
    [pushActivity, showToast],
  );

  const setTeamProgress = useCallback((teamId, progress) => {
    setState((s) => ({
      ...s,
      teams: s.teams.map((t) => (t.id === teamId ? { ...t, progress } : t)),
    }));
  }, []);

  const requestMentorIntro = useCallback(
    (mentorId) => {
      setState((s) => ({
        ...s,
        mentorIntro: { ...s.mentorIntro, [mentorId]: 'pending' },
      }));
      pushActivity({ type: 'clock', title: 'Mentor request', desc: 'Intro request sent' });
      showToast('Intro request sent.');
    },
    [pushActivity, showToast],
  );

  const cancelMentorIntro = useCallback((mentorId) => {
    setState((s) => {
      const next = { ...s.mentorIntro };
      delete next[mentorId];
      return { ...s, mentorIntro: next };
    });
    showToast('Request withdrawn.');
  }, [showToast]);

  const simulateMentorAccept = useCallback(
    (mentorId) => {
      setState((s) => ({
        ...s,
        mentorIntro: { ...s.mentorIntro, [mentorId]: 'connected' },
      }));
      pushActivity({ type: 'check', title: 'Mentor connected', desc: 'Intro accepted' });
      showToast('You are now connected with this mentor.');
    },
    [pushActivity, showToast],
  );

  const connectSynergy = useCallback(
    (candidateId) => {
      let already = false;
      let label = 'Collaborator';
      setState((s) => {
        if (s.synergyConnections.includes(candidateId)) {
          already = true;
          return s;
        }
        const c = s.synergyCandidates.find((x) => x.id === candidateId);
        if (c) label = c.name;
        return { ...s, synergyConnections: [...s.synergyConnections, candidateId] };
      });
      if (already) {
        showToast('Already in your synergy list.');
        return;
      }
      pushActivity({
        type: 'users',
        title: 'Synergy match',
        desc: `Connected with ${label}`,
      });
      showToast('Connection saved to your workspace.');
    },
    [pushActivity, showToast],
  );

  const setWorkspaceBoard = useCallback((workspace) => {
    setState((s) => ({ ...s, workspace }));
  }, []);

  const toggleTaskDone = useCallback((taskId) => {
    setState((s) => ({
      ...s,
      overviewTasks: s.overviewTasks.map((t) =>
        t.id === taskId ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t
      ),
    }));
  }, []);

  const addQuickNote = useCallback((text) => {
    setState((s) => ({
      ...s,
      quickNotes: [{ id: `qn-${Date.now()}`, text, createdAt: new Date().toISOString() }, ...s.quickNotes],
    }));
  }, []);

  const removeQuickNote = useCallback((noteId) => {
    setState((s) => ({
      ...s,
      quickNotes: s.quickNotes.filter((n) => n.id !== noteId),
    }));
  }, []);

  const toggleRightSidebar = useCallback(() => {
    setState((s) => ({ ...s, rightSidebarOpen: !s.rightSidebarOpen }));
  }, []);

  const addWorkspaceTask = useCallback(
    (columnId, { content, priority }) => {
      const id = `task-${Date.now()}`;
      setState((s) => {
        const col = s.workspace.columns[columnId];
        if (!col) return s;
        const nextTask = {
          id,
          content,
          priority: priority || 'Medium',
          comments: 0,
          attachments: 0,
        };
        const nextCol = { ...col, taskIds: [...col.taskIds, id] };
        return {
          ...s,
          workspace: {
            ...s.workspace,
            tasks: { ...s.workspace.tasks, [id]: nextTask },
            columns: { ...s.workspace.columns, [columnId]: nextCol },
          },
        };
      });
      pushActivity({ type: 'check', title: 'Task added', desc: content });
      showToast('Task added to the board.');
    },
    [pushActivity, showToast],
  );

  const rankedSynergy = useMemo(() => {
    return state.synergyCandidates.map((c) => ({
      ...c,
      match: computeSynergyMatch(state.skillProfile, c.strengths || {}),
    }));
  }, [state.skillProfile, state.synergyCandidates]);

  const value = useMemo(
    () => ({
      ...state,
      rankedSynergy,
      dismissToast,
      showToast,
      pushActivity,
      setHeaderSearch,
      clearNotifications,
      toggleBookmark,
      addProject,
      applyToProject,
      inviteTeamMember,
      setTeamProgress,
      requestMentorIntro,
      cancelMentorIntro,
      simulateMentorAccept,
      connectSynergy,
      setWorkspaceBoard,
      addWorkspaceTask,
      toggleTaskDone,
      addQuickNote,
      removeQuickNote,
      toggleRightSidebar,
    }),
    [
      state,
      rankedSynergy,
      dismissToast,
      showToast,
      pushActivity,
      setHeaderSearch,
      clearNotifications,
      toggleBookmark,
      addProject,
      applyToProject,
      inviteTeamMember,
      setTeamProgress,
      requestMentorIntro,
      cancelMentorIntro,
      simulateMentorAccept,
      connectSynergy,
      setWorkspaceBoard,
      addWorkspaceTask,
      toggleTaskDone,
      addQuickNote,
      removeQuickNote,
      toggleRightSidebar,
    ],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

// Hook colocated with provider for this app slice (dashboard-only).
// eslint-disable-next-line react-refresh/only-export-components -- useDashboard is stable alongside Provider
export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}

