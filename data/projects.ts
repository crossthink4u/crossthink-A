export type OpenRole = {
  title: string;
  count: number;
  skills: string[];
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  dept: string;
  category: string;
  tags: string[];
  tech: string[];
  openRoles: OpenRole[];
  teamSize: { filled: number; capacity: number };
  owner: string;
  ownerRole: string;
  ownerAvatar: string;
  deadline: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  gradient: string;
  accentColor: string;
  perks: string[];
  highlights: string[];
};

export const publicProjects: Project[] = [
  {
    id: 'neural-optimizer',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    title: 'Neural Optimizer Framework',
    tagline: 'Bridging neuroscience and ML to build smarter optimization engines',
    description:
      'We are building an open-source framework that applies biologically-inspired learning algorithms to deep neural networks. The goal is to dramatically reduce training time and energy consumption for large models. The team includes CS majors, biology researchers, and faculty advisors from both departments. You will work on cutting-edge research that bridges academia and real-world ML deployment.',
    dept: 'CS + Biology',
    category: 'Machine Learning',
    tags: ['Research', 'Open Source', 'AI/ML'],
    tech: ['Python', 'PyTorch', 'TensorFlow', 'React', 'FastAPI'],
    openRoles: [
      { title: 'Frontend Engineer', count: 1, skills: ['React', 'TypeScript', 'Data Viz'] },
      { title: 'ML Researcher', count: 1, skills: ['PyTorch', 'Python', 'Linear Algebra'] },
    ],
    teamSize: { filled: 5, capacity: 7 },
    owner: 'Dr. Emily Chen',
    ownerRole: 'Faculty Advisor · AI Lab',
    ownerAvatar: 'https://i.pravatar.cc/150?img=5',
    deadline: 'June 30, 2026',
    duration: '6 months',
    difficulty: 'Advanced',
    gradient: 'linear-gradient(135deg, #00f0ff 0%, #0055ff 100%)',
    accentColor: 'cyan',
    perks: ['Research credit', 'Conference travel fund', 'Co-authorship potential', 'Weekly mentor sessions'],
    highlights: [
      '2 open roles — apply now',
      'Conference submission planned for NeurIPS 2026',
      'Flexible hours, remote-friendly',
    ],
  },
  {
    id: 'eco-tracker',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    title: 'Eco-Tracking Campus App',
    tagline: 'Helping students visualize and reduce their carbon footprint on campus',
    description:
      'A mobile-first web app that tracks energy usage, food choices, and transportation habits of students on campus. We partner with the university sustainability office to feed real sensor data into our dashboard. The project mixes IoT, data science, and beautiful product design. Users get personalized insights, peer comparisons, and actionable challenges to reduce their impact.',
    dept: 'Design + Environmental Science',
    category: 'Sustainability',
    tags: ['Mobile', 'IoT', 'Social Impact'],
    tech: ['React Native', 'Figma', 'Node.js', 'PostgreSQL', 'Python'],
    openRoles: [
      { title: 'UI/UX Designer', count: 1, skills: ['Figma', 'User Research', 'Prototyping'] },
      { title: 'Backend Developer', count: 1, skills: ['Node.js', 'PostgreSQL', 'REST APIs'] },
    ],
    teamSize: { filled: 2, capacity: 4 },
    owner: 'Maya Roth',
    ownerRole: 'Project Lead · Environmental Science',
    ownerAvatar: 'https://i.pravatar.cc/150?img=47',
    deadline: 'August 15, 2026',
    duration: '4 months',
    difficulty: 'Intermediate',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    accentColor: 'emerald',
    perks: ['Portfolio project', 'Sustainability award nomination', 'Direct user impact', 'University sponsorship'],
    highlights: [
      '2 spots open — team is small and collaborative',
      'Real users from day one',
      'University sustainability office partnership',
    ],
  },
  {
    id: 'fintech-predictor',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    title: 'FinTech Market Predictor',
    tagline: 'Using ML to surface undervalued opportunities in emerging markets',
    description:
      'We are building a quantitative research platform that ingests financial data streams and applies transformer-based models to predict short-term price movements in emerging market equities. The project is backed by a student-run investment club and supervised by a finance professor. You will gain hands-on experience with real market data, production ML pipelines, and financial modeling.',
    dept: 'Finance + Computer Science',
    category: 'FinTech',
    tags: ['Finance', 'ML', 'Data Science'],
    tech: ['Python', 'Pandas', 'AWS', 'Streamlit', 'PostgreSQL'],
    openRoles: [
      { title: 'Data Scientist', count: 1, skills: ['Python', 'Pandas', 'ML Models'] },
      { title: 'Cloud Engineer', count: 1, skills: ['AWS', 'Docker', 'CI/CD'] },
    ],
    teamSize: { filled: 3, capacity: 5 },
    owner: 'Sarah Jenkins',
    ownerRole: 'Project Lead · Finance Club',
    ownerAvatar: 'https://i.pravatar.cc/150?img=9',
    deadline: 'July 1, 2026',
    duration: '5 months',
    difficulty: 'Advanced',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    accentColor: 'amber',
    perks: ['Real market data access', 'Investment club backing', 'Internship referrals', 'Finance credit possible'],
    highlights: [
      'Access to live Bloomberg data feed',
      '2 open roles — strong ML background preferred',
      'Direct mentorship from finance faculty',
    ],
  },
  {
    id: 'vr-campus-tour',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80',
    title: 'Virtual Reality Campus Tour',
    tagline: 'Immersive VR experiences to help prospective students fall in love with campus',
    description:
      'We are creating a photorealistic VR tour of our campus using 3D scanning, Unity, and custom spatial audio. The experience will be deployed on the university admissions website and Meta Quest headsets at open day events. The team needs 3D artists, developers, and a sound designer. This is a highly visible project — the final product will be seen by tens of thousands of prospective students.',
    dept: 'Arts + Engineering',
    category: 'XR / Immersive',
    tags: ['VR/AR', 'Game Dev', 'Creative'],
    tech: ['Unity', 'Blender', 'C#', 'Oculus SDK', 'Spatial Audio'],
    openRoles: [
      { title: '3D Environment Artist', count: 2, skills: ['Blender', 'Substance Painter', 'PBR materials'] },
      { title: 'Unity Developer', count: 1, skills: ['C#', 'Unity XR Toolkit', 'Optimization'] },
    ],
    teamSize: { filled: 4, capacity: 7 },
    owner: 'Alex Turner',
    ownerRole: 'Lead Developer · Game Dev Society',
    ownerAvatar: 'https://i.pravatar.cc/150?img=12',
    deadline: 'September 1, 2026',
    duration: '6 months',
    difficulty: 'Intermediate',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    accentColor: 'violet',
    perks: ['Prominent portfolio piece', 'University-wide recognition', 'Quest Pro device access', 'Public launch event'],
    highlights: [
      '3 open roles across art and engineering',
      'Quest Pro headsets available in the lab',
      'Launching at Open Day — October 2026',
    ],
  },
  {
    id: 'ai-study-buddy',
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80',
    title: 'AI Study Buddy',
    tagline: 'A personalized AI tutor that adapts to each student\'s learning style',
    description:
      'Study Buddy uses retrieval-augmented generation (RAG) and spaced repetition algorithms to create a truly adaptive tutoring experience. Students upload their lecture notes and textbooks; the system generates quizzes, explanations, and study plans tailored to their weak points. We are integrating with Canvas LMS and plan to pilot with 500 students in the fall semester.',
    dept: 'Computer Science + Education',
    category: 'EdTech',
    tags: ['EdTech', 'AI', 'LLMs'],
    tech: ['Next.js', 'Python', 'LangChain', 'Pinecone', 'OpenAI API'],
    openRoles: [
      { title: 'Full-Stack Developer', count: 1, skills: ['Next.js', 'Python', 'APIs'] },
      { title: 'Prompt Engineer', count: 1, skills: ['LLMs', 'RAG', 'Evaluation'] },
    ],
    teamSize: { filled: 3, capacity: 5 },
    owner: 'Prof. James Wu',
    ownerRole: 'Faculty Advisor · Ed Innovation Lab',
    ownerAvatar: 'https://i.pravatar.cc/150?img=11',
    deadline: 'July 31, 2026',
    duration: '4 months',
    difficulty: 'Intermediate',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    accentColor: 'pink',
    perks: ['LLM API credits provided', 'Education research grant', '500-student pilot launch', 'Publication opportunity'],
    highlights: [
      '500-student pilot planned for Fall 2026',
      'API credits and compute covered',
      'Direct collaboration with Education faculty',
    ],
  },
  {
    id: 'smart-campus',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    title: 'Smart Campus IoT Dashboard',
    tagline: 'Real-time sensor network visualizing energy, occupancy, and air quality',
    description:
      'We are deploying 200+ IoT sensors across campus buildings to monitor energy consumption, room occupancy, air quality, and noise levels. The data feeds into a beautiful real-time dashboard used by facilities management and students. This project has direct infrastructure impact — findings have already led to HVAC schedule changes saving $50k/year in energy costs.',
    dept: 'Engineering + Architecture',
    category: 'IoT / Infrastructure',
    tags: ['IoT', 'Real-time', 'Infrastructure'],
    tech: ['React', 'MQTT', 'InfluxDB', 'Raspberry Pi', 'Grafana', 'Python'],
    openRoles: [
      { title: 'Embedded Systems Dev', count: 1, skills: ['Raspberry Pi', 'MQTT', 'C/C++'] },
      { title: 'Data Visualization Dev', count: 1, skills: ['React', 'D3.js', 'Real-time data'] },
    ],
    teamSize: { filled: 4, capacity: 6 },
    owner: 'Dr. Ravi Patel',
    ownerRole: 'Faculty Advisor · Engineering',
    ownerAvatar: 'https://i.pravatar.cc/150?img=33',
    deadline: 'August 1, 2026',
    duration: '5 months',
    difficulty: 'Advanced',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
    accentColor: 'sky',
    perks: ['Hardware budget provided', 'Real infrastructure impact', 'Engineering credit', 'University facilities access'],
    highlights: [
      '200+ sensors already deployed',
      '$50k/yr energy savings already achieved',
      '2 open technical roles',
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return publicProjects.find((p) => p.id === id);
}
