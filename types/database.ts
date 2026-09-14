export interface DbProject {
  id: string;
  created_at: string;
  owner_id: string;
  title: string;
  dept: string | null;
  description: string | null;
  tech: string[];
  open_roles: { title: string; skills: string[]; count: number }[];
  image_url: string | null;
  difficulty: string;
  duration: string | null;
  deadline: string | null;
  team_size_capacity: number;
  is_public: boolean;
}

export interface DbApplication {
  id: string;
  created_at: string;
  project_id: string;
  applicant_user_id: string | null;
  name: string;
  email: string;
  role: string | null;
  major: string | null;
  tech_stack: string | null;
  github: string | null;
  linkedin: string | null;
  portfolio: string | null;
  prev_projects: string | null;
  motivation: string | null;
  status: 'pending' | 'approved' | 'rejected';
}

export interface DbProjectMember {
  id: string;
  created_at: string;
  project_id: string;
  user_id: string;
  application_id: string | null;
  role: string | null;
  profiles?: DbProfile;
}

export interface DbProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  university: string | null;
  major: string | null;
  created_at: string;
}
