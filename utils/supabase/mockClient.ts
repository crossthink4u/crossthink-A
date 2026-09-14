import type { DbProject, DbApplication, DbProjectMember, DbProfile } from '@/types/database';

export const SEED_PROJECTS: DbProject[] = [
  {
    id: 'proj-1',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    owner_id: 'user-demo-1',
    title: 'Neural Optimizer Framework',
    dept: 'Machine Learning',
    description: 'A distributed PyTorch/JAX optimization library designed for sparse gradient compression across multi-node campus GPU clusters.',
    tech: ['Python', 'PyTorch', 'CUDA', 'React'],
    open_roles: [
      { title: 'ML Systems Engineer', skills: ['PyTorch', 'Distributed Systems'], count: 1 },
      { title: 'Frontend Developer', skills: ['React', 'TypeScript', 'Tailwind'], count: 1 },
    ],
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Advanced',
    duration: '3 months',
    deadline: '2026-06-30',
    team_size_capacity: 5,
    is_public: true,
  },
  {
    id: 'proj-2',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    owner_id: 'user-demo-1',
    title: 'EcoCampus Microgrid & Carbon Tracker',
    dept: 'Sustainability',
    description: 'Real-time telemetry and IoT dashboard monitoring solar generation, dorm energy consumption, and campus carbon offsets.',
    tech: ['Next.js', 'TypeScript', 'IoT', 'Tailwind CSS'],
    open_roles: [
      { title: 'Full Stack Engineer', skills: ['Next.js', 'Node.js'], count: 2 },
      { title: 'Data Analyst', skills: ['Python', 'Pandas'], count: 1 },
    ],
    image_url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Intermediate',
    duration: '4 months',
    deadline: '2026-07-15',
    team_size_capacity: 6,
    is_public: true,
  },
  {
    id: 'proj-3',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    owner_id: 'user-demo-2',
    title: 'DeFi Market Intelligence & Arbitrage Bot',
    dept: 'FinTech',
    description: 'High-frequency algorithmic monitoring of decentralized exchange liquidity pools, slippage estimation, and smart order routing.',
    tech: ['Rust', 'Solidity', 'WebSockets', 'React'],
    open_roles: [
      { title: 'Rust Developer', skills: ['Rust', 'Async IO'], count: 1 },
      { title: 'Smart Contract Auditor', skills: ['Solidity', 'Foundry'], count: 1 },
    ],
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Advanced',
    duration: '2 months',
    deadline: '2026-05-25',
    team_size_capacity: 4,
    is_public: true,
  },
  {
    id: 'proj-4',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    owner_id: 'user-demo-3',
    title: 'Spatial Audio & VR Collaboration Hub',
    dept: 'XR / Immersive',
    description: 'Immersive WebXR environment allowing remote student study groups to interact in spatial 3D audio workspaces with shared whiteboards.',
    tech: ['Three.js', 'WebXR', 'WebRTC', 'GLSL'],
    open_roles: [
      { title: 'Three.js / WebGL Specialist', skills: ['Three.js', 'Shaders'], count: 1 },
      { title: '3D Modeler', skills: ['Blender', 'glTF'], count: 1 },
    ],
    image_url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Intermediate',
    duration: '5 months',
    deadline: '2026-08-01',
    team_size_capacity: 5,
    is_public: true,
  },
  {
    id: 'proj-5',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    owner_id: 'user-demo-1',
    title: 'Adaptive Peer Learning Platform',
    dept: 'EdTech',
    description: 'Collaborative knowledge base that clusters study guides by course curriculum and matches students for live revision cohorts.',
    tech: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
    open_roles: [
      { title: 'UI/UX Designer', skills: ['Figma', 'Prototyping'], count: 1 },
      { title: 'Frontend Developer', skills: ['React', 'Tailwind'], count: 2 },
    ],
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Beginner',
    duration: '2 months',
    deadline: '2026-05-30',
    team_size_capacity: 4,
    is_public: true,
  },
  {
    id: 'proj-6',
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    owner_id: 'user-demo-4',
    title: 'Autonomous Campus Delivery Drone',
    dept: 'IoT / Infrastructure',
    description: 'Sensor fusion and computer vision pipeline for collision avoidance and precise package delivery across university quadrangles.',
    tech: ['ROS 2', 'Python', 'OpenCV', 'C++'],
    open_roles: [
      { title: 'Computer Vision Engineer', skills: ['OpenCV', 'YOLO'], count: 1 },
      { title: 'Hardware Integration Lead', skills: ['Sensors', 'Embedded C'], count: 1 },
    ],
    image_url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Advanced',
    duration: '6 months',
    deadline: '2026-09-01',
    team_size_capacity: 5,
    is_public: true,
  },
];

export const SEED_PROFILES: DbProfile[] = [
  {
    id: 'user-demo-1',
    full_name: 'Alex Taylor',
    email: 'alex.taylor@university.edu',
    role: 'student',
    university: 'Stanford University',
    major: 'Computer Science',
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: 'user-demo-2',
    full_name: 'Sarah Jenkins',
    email: 'sarah.j@university.edu',
    role: 'student',
    university: 'UC Berkeley',
    major: 'EECS',
    created_at: new Date(Date.now() - 86400000 * 25).toISOString(),
  },
  {
    id: 'user-demo-3',
    full_name: 'Dr. Emily Chen',
    email: 'e.chen@university.edu',
    role: 'mentor',
    university: 'MIT',
    major: 'Artificial Intelligence',
    created_at: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: 'user-demo-4',
    full_name: 'David Kim',
    email: 'd.kim@university.edu',
    role: 'student',
    university: 'Carnegie Mellon',
    major: 'Robotics',
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
];

export const SEED_APPLICATIONS: DbApplication[] = [
  {
    id: 'app-1',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    project_id: 'proj-1',
    applicant_user_id: 'user-demo-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@university.edu',
    role: 'ML Systems Engineer',
    major: 'Computer Science',
    tech_stack: 'PyTorch, CUDA, Python',
    github: 'https://github.com/sarahj',
    linkedin: 'https://linkedin.com/in/sarahj',
    portfolio: 'https://sarahj.dev',
    prev_projects: 'Distributed matrix multiplication benchmarks',
    motivation: 'I have hands-on experience optimizing CUDA kernels and would love to help scale your neural optimizer.',
    status: 'pending',
  },
  {
    id: 'app-2',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    project_id: 'proj-2',
    applicant_user_id: 'user-demo-4',
    name: 'David Kim',
    email: 'd.kim@university.edu',
    role: 'Full Stack Engineer',
    major: 'Software Engineering',
    tech_stack: 'Next.js, Node.js, TypeScript',
    github: 'https://github.com/davidkim',
    linkedin: 'https://linkedin.com/in/davidkim',
    portfolio: '',
    prev_projects: 'Solar telemetry dashboard for hackathon',
    motivation: 'Excited to build clean real-time IoT charts for campus sustainability.',
    status: 'approved',
  },
];

export const SEED_MEMBERS: DbProjectMember[] = [
  {
    id: 'mem-1',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    project_id: 'proj-1',
    user_id: 'user-demo-1',
    application_id: null,
    role: 'Project Lead',
    profiles: SEED_PROFILES[0],
  },
  {
    id: 'mem-2',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    project_id: 'proj-2',
    user_id: 'user-demo-4',
    application_id: 'app-2',
    role: 'Full Stack Engineer',
    profiles: SEED_PROFILES[3],
  },
];

export interface MockUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    role?: string;
    university?: string;
    major?: string;
    year?: string;
    expertise?: string | string[];
    [key: string]: unknown;
  };
  created_at: string;
}

export class MockDatabase {
  private projects: DbProject[] = [...SEED_PROJECTS];
  private profiles: DbProfile[] = [...SEED_PROFILES];
  private applications: DbApplication[] = [...SEED_APPLICATIONS];
  private members: DbProjectMember[] = [...SEED_MEMBERS];
  private currentUser: MockUser | null = null;
  private authListeners: ((event: string, session: { user: MockUser } | null) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const p = localStorage.getItem('crossthink_projects');
      if (p) this.projects = JSON.parse(p);
      const a = localStorage.getItem('crossthink_applications');
      if (a) this.applications = JSON.parse(a);
      const u = localStorage.getItem('crossthink_user');
      if (u) this.currentUser = JSON.parse(u);
    } catch {
      // ignore
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('crossthink_projects', JSON.stringify(this.projects));
      localStorage.setItem('crossthink_applications', JSON.stringify(this.applications));
      if (this.currentUser) {
        localStorage.setItem('crossthink_user', JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem('crossthink_user');
      }
    } catch {
      // ignore
    }
  }

  async getUser(): Promise<{ data: { user: MockUser | null }; error: null }> {
    return { data: { user: this.currentUser }, error: null };
  }

  async getSession(): Promise<{ data: { session: { user: MockUser; access_token: string } | null }; error: null }> {
    return {
      data: {
        session: this.currentUser ? { user: this.currentUser, access_token: 'mock_token' } : null,
      },
      error: null,
    };
  }

  onAuthStateChange(callback: (event: string, session: { user: MockUser } | null) => void) {
    this.authListeners.push(callback);
    setTimeout(() => {
      callback(this.currentUser ? 'SIGNED_IN' : 'SIGNED_OUT', this.currentUser ? { user: this.currentUser } : null);
    }, 0);
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.authListeners = this.authListeners.filter((l) => l !== callback);
          },
        },
      },
    };
  }

  async signInWithPassword({ email }: { email: string; password?: string }) {
    let profile = this.profiles.find((p) => p.email?.toLowerCase() === email.toLowerCase());
    if (!profile) {
      profile = {
        id: `user-${Date.now()}`,
        full_name: email.split('@')[0],
        email,
        role: 'student',
        university: 'University',
        major: 'Computer Science',
        created_at: new Date().toISOString(),
      };
      this.profiles.push(profile);
    }

    this.currentUser = {
      id: profile.id,
      email: profile.email || email,
      user_metadata: {
        full_name: profile.full_name || '',
        role: profile.role || '',
        university: profile.university || '',
        major: profile.major || '',
      },
      created_at: profile.created_at,
    };

    this.saveToStorage();
    this.authListeners.forEach((l) => l('SIGNED_IN', { user: this.currentUser! }));
    return { data: { user: this.currentUser, session: { user: this.currentUser } }, error: null };
  }

  async signUp({ email, options }: { email: string; password?: string; options?: { data?: Record<string, unknown> } }) {
    const meta = options?.data || {};
    const newId = `user-${Date.now()}`;
    const newProfile: DbProfile = {
      id: newId,
      full_name: (meta.full_name as string) || email.split('@')[0],
      email,
      role: (meta.role as string) || 'student',
      university: (meta.university as string) || '',
      major: (meta.major as string) || '',
      created_at: new Date().toISOString(),
    };
    this.profiles.push(newProfile);

    this.currentUser = {
      id: newId,
      email,
      user_metadata: {
        full_name: newProfile.full_name || '',
        role: newProfile.role || '',
        university: newProfile.university || '',
        major: newProfile.major || '',
        year: (meta.year as string) || '',
        expertise: (meta.expertise as string) || '',
      },
      created_at: newProfile.created_at,
    };

    this.saveToStorage();
    this.authListeners.forEach((l) => l('SIGNED_IN', { user: this.currentUser! }));
    return { data: { user: this.currentUser, session: { user: this.currentUser } }, error: null };
  }

  async signOut() {
    this.currentUser = null;
    this.saveToStorage();
    this.authListeners.forEach((l) => l('SIGNED_OUT', null));
    return { error: null };
  }

  async resetPasswordForEmail() {
    return { data: {}, error: null };
  }

  async updateUser(updates: { data?: Record<string, unknown> }) {
    if (this.currentUser) {
      if (updates.data) {
        this.currentUser.user_metadata = { ...this.currentUser.user_metadata, ...updates.data };
      }
      this.saveToStorage();
      this.authListeners.forEach((l) => l('USER_UPDATED', { user: this.currentUser! }));
    }
    return { data: { user: this.currentUser }, error: null };
  }

  async exchangeCodeForSession() {
    if (!this.currentUser) {
      await this.signInWithPassword({ email: 'alex.taylor@university.edu' });
    }
    return { data: { user: this.currentUser, session: { user: this.currentUser! } }, error: null };
  }

  getStorage() {
    return {
      from: () => ({
        upload: async (path: string, file: unknown) => {
          let url = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
          if (typeof window !== 'undefined' && typeof Blob !== 'undefined' && file instanceof Blob) {
            try {
              url = URL.createObjectURL(file);
            } catch {
              // fallback
            }
          }
          return { data: { path, publicUrl: url }, error: null };
        },
        getPublicUrl: () => ({
          data: {
            publicUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          },
        }),
      }),
    };
  }

  from(tableName: string) {
    let list: Record<string, unknown>[] = [];
    if (tableName === 'projects') list = this.projects as unknown as Record<string, unknown>[];
    else if (tableName === 'profiles') list = this.profiles as unknown as Record<string, unknown>[];
    else if (tableName === 'applications') list = this.applications as unknown as Record<string, unknown>[];
    else if (tableName === 'project_members') list = this.members as unknown as Record<string, unknown>[];

    let filtered = [...list];

    interface QueryBuilder {
      select: (fields?: string) => QueryBuilder;
      eq: (field: string, val: unknown) => QueryBuilder;
      neq: (field: string, val: unknown) => QueryBuilder;
      order: (field: string, options?: { ascending?: boolean }) => QueryBuilder;
      limit: (n: number) => QueryBuilder;
      maybeSingle: () => Promise<{ data: Record<string, unknown> | null; error: null }>;
      single: () => Promise<{ data: Record<string, unknown> | null; error: { message: string } | null }>;
      insert: (recordOrRecords: unknown) => {
        select: () => {
          single: () => Promise<{ data: Record<string, unknown>; error: null }>;
          then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) => Promise<unknown>;
        };
        then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) => Promise<unknown>;
      };
      upsert: (record: unknown) => {
        select: () => {
          single: () => Promise<{ data: Record<string, unknown>; error: null }>;
          then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) => Promise<unknown>;
        };
        then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) => Promise<unknown>;
      };
      update: (updates: Record<string, unknown>) => {
        eq: (field: string, val: unknown) => {
          select: () => {
            single: () => Promise<{ data: Record<string, unknown> | null; error: null }>;
            then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) => Promise<unknown>;
          };
          then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) => Promise<unknown>;
        };
      };
      delete: () => {
        eq: (field: string, val: unknown) => Promise<{ data: null; error: null }>;
      };
      then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown, reject?: (err: unknown) => unknown) => Promise<unknown>;
      catch: (reject: (err: unknown) => unknown) => Promise<unknown>;
    }

    const builder: QueryBuilder = {
      select: () => builder,
      eq: (field: string, val: unknown) => {
        filtered = filtered.filter((item) => String(item[field]) === String(val));
        return builder;
      },
      neq: (field: string, val: unknown) => {
        filtered = filtered.filter((item) => String(item[field]) !== String(val));
        return builder;
      },
      order: (field: string, options?: { ascending?: boolean }) => {
        const asc = options?.ascending ?? true;
        filtered.sort((a, b) => {
          const valA = a[field] as string | number;
          const valB = b[field] as string | number;
          if (valA < valB) return asc ? -1 : 1;
          if (valA > valB) return asc ? 1 : -1;
          return 0;
        });
        return builder;
      },
      limit: (n: number) => {
        filtered = filtered.slice(0, n);
        return builder;
      },
      maybeSingle: async () => {
        return { data: filtered[0] || null, error: null };
      },
      single: async () => {
        if (!filtered[0]) {
          return { data: null, error: { message: 'Row not found' } };
        }
        return { data: filtered[0], error: null };
      },
      insert: (recordOrRecords: unknown) => {
        const records = Array.isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
        const inserted: Record<string, unknown>[] = [];
        records.forEach((rec) => {
          const newRow = {
            id: (rec as Record<string, unknown>).id || `${tableName.slice(0, 4)}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            created_at: (rec as Record<string, unknown>).created_at || new Date().toISOString(),
            ...(rec as Record<string, unknown>),
          };
          if (tableName === 'projects') this.projects.unshift(newRow as unknown as DbProject);
          else if (tableName === 'applications') this.applications.unshift(newRow as unknown as DbApplication);
          else if (tableName === 'project_members') this.members.push(newRow as unknown as DbProjectMember);
          else if (tableName === 'profiles') this.profiles.push(newRow as unknown as DbProfile);
          inserted.push(newRow);
        });
        this.saveToStorage();

        return {
          select: () => ({
            single: async () => ({ data: inserted[0], error: null }),
            then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) =>
              Promise.resolve({ data: inserted, error: null }).then(resolve),
          }),
          then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) =>
            Promise.resolve({ data: inserted, error: null }).then(resolve),
        };
      },
      upsert: (record: unknown) => {
        const recs = Array.isArray(record) ? record : [record];
        recs.forEach((item) => {
          const rec = item as Record<string, unknown>;
          if (tableName === 'project_members') {
            const idx = this.members.findIndex((m) => m.project_id === rec.project_id && m.user_id === rec.user_id);
            if (idx >= 0) this.members[idx] = { ...this.members[idx], ...(rec as unknown as Partial<DbProjectMember>) };
            else this.members.push({ id: `mem-${Date.now()}`, created_at: new Date().toISOString(), ...(rec as unknown as DbProjectMember) });
          } else if (tableName === 'profiles') {
            const idx = this.profiles.findIndex((p) => p.id === rec.id);
            if (idx >= 0) this.profiles[idx] = { ...this.profiles[idx], ...(rec as unknown as Partial<DbProfile>) };
            else this.profiles.push(rec as unknown as DbProfile);
          }
        });
        this.saveToStorage();
        return {
          select: () => ({
            single: async () => ({ data: recs[0] as Record<string, unknown>, error: null }),
            then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) =>
              Promise.resolve({ data: recs as Record<string, unknown>[], error: null }).then(resolve),
          }),
          then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) =>
            Promise.resolve({ data: recs as Record<string, unknown>[], error: null }).then(resolve),
        };
      },
      update: (updates: Record<string, unknown>) => ({
        eq: (field: string, val: unknown) => {
          filtered.forEach((item) => {
            Object.assign(item, updates);
          });
          this.saveToStorage();
          return {
            select: () => ({
              single: async () => ({ data: filtered[0] || null, error: null }),
              then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) =>
                Promise.resolve({ data: filtered, error: null }).then(resolve),
            }),
            then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown) =>
              Promise.resolve({ data: filtered, error: null }).then(resolve),
          };
        },
      }),
      delete: () => ({
        eq: async (field: string, val: unknown) => {
          if (tableName === 'projects') {
            this.projects = this.projects.filter((p) => String((p as unknown as Record<string, unknown>)[field]) !== String(val));
          } else if (tableName === 'applications') {
            this.applications = this.applications.filter((a) => String((a as unknown as Record<string, unknown>)[field]) !== String(val));
          }
          this.saveToStorage();
          return { data: null, error: null };
        },
      }),
      then: (resolve: (val: { data: Record<string, unknown>[]; error: null }) => unknown, reject?: (err: unknown) => unknown) => {
        return Promise.resolve({ data: [...filtered], error: null }).then(resolve, reject);
      },
      catch: (reject: (err: unknown) => unknown) => {
        return Promise.resolve({ data: [...filtered], error: null }).catch(reject);
      },
    };

    return builder;
  }
}

let mockDbInstance: MockDatabase | null = null;

export function getMockDatabase(): MockDatabase {
  if (!mockDbInstance) {
    mockDbInstance = new MockDatabase();
  }
  return mockDbInstance;
}

export function createMockSupabaseClient() {
  const db = getMockDatabase();
  return {
    auth: {
      getUser: () => db.getUser(),
      getSession: () => db.getSession(),
      onAuthStateChange: (cb: (event: string, session: { user: MockUser } | null) => void) => db.onAuthStateChange(cb),
      signInWithPassword: (creds: { email: string; password?: string }) => db.signInWithPassword(creds),
      signUp: (params: { email: string; password?: string; options?: { data?: Record<string, unknown> } }) => db.signUp(params),
      signOut: () => db.signOut(),
      resetPasswordForEmail: () => db.resetPasswordForEmail(),
      updateUser: (updates: { data?: Record<string, unknown> }) => db.updateUser(updates),
      exchangeCodeForSession: () => db.exchangeCodeForSession(),
    },
    from: (table: string) => db.from(table),
    storage: db.getStorage(),
  };
}
