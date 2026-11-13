/**
 * @file authorProfile.mock.js
 * @description Frontend mock data for the Academic Researcher Profile UI prototype.
 *
 * ⚠️  THIS IS PROTOTYPE / DEMONSTRATION DATA ONLY.
 *      Replace each exported object with real API data when the backend is ready.
 *
 * Profile inspired by a prominent nanoenergy researcher for UI completeness.
 */

// ─── AUTHOR ─────────────────────────────────────────────────────────────────
export const MOCK_AUTHOR = {
  id: 'mock-841',
  full_name: 'Zhong Lin Wang',
  position: 'Regents Professor & Director',
  institution_1: 'Georgia Institute of Technology',
  institution_2: 'School of Materials Science and Engineering',
  email: 'zlwang@gatech.edu',
  orcid: '0000-0002-5523-0380',
  homepage: 'https://wang.gatech.edu',
  location: 'Atlanta, Georgia, United States',
  avatar_color: 'var(--primary)',
  bio: 'Zhong Lin (ZL) Wang is the Hightower Chair in Materials Science and Engineering, Regents Professor, Engineering Distinguished Professor at Georgia Institute of Technology, and the Chief Scientist and Director of the Beijing Institute of Nanoenergy and Nanosystems, Chinese Academy of Sciences. His research has led to the development of piezoelectric nanogenerators, triboelectric nanogenerators, and self-powered nanosystems. He has been ranked the #1 most cited scientist in the world in Materials Science for multiple consecutive years.',
  research_focus: ['Nanotechnology', 'Nanoenergy', 'Sensors', 'Energy Harvesting'],
  subject_areas: [
    'Nanotechnology', 'Nanoenergy', 'Nanogenerators',
    'Self-powered Systems', 'Piezotronics', 'Energy Harvesting',
  ],
};

// ─── METRICS ─────────────────────────────────────────────────────────────────
export const MOCK_METRICS = {
  publications: 3930,
  citations: 478500,
  hIndex: 322,
  i10Index: 2890,
  researchAreas: 292,
  highlyCitedPapers: 48,
};

// ─── AFFILIATIONS ─────────────────────────────────────────────────────────────
export const MOCK_AFFILIATIONS = [
  {
    id: 1,
    institution: 'Georgia Institute of Technology',
    department: 'School of Materials Science and Engineering',
    role: 'Regents Professor & Director',
    location: 'Atlanta, Georgia, United States',
    since: 1995,
    logoInitials: 'GT',
    logoColor: '#B3A369',
  },
  {
    id: 2,
    institution: 'Beijing Institute of Nanoenergy and Nanosystems',
    department: 'Chinese Academy of Sciences',
    role: 'Chief Scientist & Director',
    location: 'Beijing, China',
    since: 2011,
    logoInitials: 'BINN',
    logoColor: '#CC0000',
  },
];

// ─── RESEARCH CENTERS & LABS ──────────────────────────────────────────────────
export const MOCK_RESEARCH_CENTERS = [
  {
    id: 1,
    name: 'Georgia Tech Center for Nanostructure Characterization',
    organization: 'Georgia Institute of Technology',
    focus: 'Advanced nanostructure analysis and materials characterization',
    role: 'Principal Investigator',
    icon: 'lucide:microscope',
  },
  {
    id: 2,
    name: 'Beijing Institute of Nanoenergy and Nanosystems',
    organization: 'Chinese Academy of Sciences',
    focus: 'Nanogenerators, self-powered systems, blue energy',
    role: 'Founder & Director',
    icon: 'lucide:zap',
  },
  {
    id: 3,
    name: 'Nanoenergy Research Group',
    organization: 'Georgia Institute of Technology',
    focus: 'Triboelectric nanogenerators, energy harvesting, smart sensors',
    role: 'Group Leader',
    icon: 'lucide:atom',
  },
];

// ─── RESEARCH INTERESTS ───────────────────────────────────────────────────────
export const MOCK_RESEARCH_INTERESTS = [
  { name: 'Nanotechnology', primary: true },
  { name: 'Nanoenergy', primary: true },
  { name: 'Nanogenerators', primary: true },
  { name: 'Triboelectric Nanogenerators', primary: true },
  { name: 'Self-powered Sensors', primary: false },
  { name: 'Piezotronics', primary: false },
  { name: 'Piezo-phototronics', primary: false },
  { name: 'Energy Harvesting', primary: false },
  { name: 'Flexible Electronics', primary: false },
  { name: 'Smart Sensors', primary: false },
  { name: 'Blue Energy', primary: false },
  { name: 'AI Applications', primary: false },
  { name: 'Wearable Devices', primary: false },
  { name: 'Nanomaterials', primary: false },
  { name: 'ZnO Nanostructures', primary: false },
];

// ─── RESEARCH AREAS (donut chart data) ────────────────────────────────────────
export const MOCK_RESEARCH_AREAS = [
  { name: 'Computer Science Applications', count: 5, percentage: 1.51 },
  { name: 'Artificial Intelligence', count: 4, percentage: 1.21 },
  { name: 'Materials Science', count: 142, percentage: 42.9 },
  { name: 'Physics & Astronomy', count: 68, percentage: 20.5 },
  { name: 'Engineering', count: 55, percentage: 16.6 },
  { name: 'Chemistry', count: 32, percentage: 9.67 },
  { name: 'Energy & Fuels', count: 18, percentage: 5.44 },
  { name: 'Nanotechnology', count: 6, percentage: 1.81 },
  { name: 'Control & Systems', count: 2, percentage: 0.60 },
];

// ─── RESEARCH IMPACT — YEARLY TREND ──────────────────────────────────────────
export const MOCK_IMPACT_TREND = [
  { year: 2018, citations: 28400, publications: 180 },
  { year: 2019, citations: 34800, publications: 210 },
  { year: 2020, citations: 41200, publications: 235 },
  { year: 2021, citations: 52600, publications: 268 },
  { year: 2022, citations: 61900, publications: 290 },
  { year: 2023, citations: 72300, publications: 315 },
  { year: 2024, citations: 84100, publications: 340 },
  { year: 2025, citations: 68700, publications: 295 },
  { year: 2026, citations: 32900, publications: 152 },
];

// ─── PUBLICATIONS ─────────────────────────────────────────────────────────────
export const MOCK_PUBLICATIONS = [
  {
    id: 'pub-1',
    title: 'Triboelectric Nanogenerators as New Energy Technology and Self-Powered Sensors',
    authors: ['Zhong Lin Wang', 'Jun Chen', 'Long Lin'],
    journal: 'Nano Energy',
    year: 2024,
    citations: 1245,
    doi: '10.1016/j.nanoen.2024.109876',
    tags: ['Triboelectric', 'Nanogenerator', 'Energy Harvesting'],
  },
  {
    id: 'pub-2',
    title: 'Piezoelectric Nanogenerators Based on Zinc Oxide Nanowire Arrays',
    authors: ['Zhong Lin Wang', 'Jinhui Song'],
    journal: 'Science',
    year: 2023,
    citations: 3870,
    doi: '10.1126/science.1124273',
    tags: ['Piezoelectric', 'ZnO', 'Nanowire'],
  },
  {
    id: 'pub-3',
    title: 'Nanogenerators for Self-Powered Devices and Systems',
    authors: ['Zhong Lin Wang', 'Long Lin', 'Jun Chen', 'Simiao Niu', 'Yunlong Zi'],
    journal: 'Nature Reviews Materials',
    year: 2023,
    citations: 2140,
    doi: '10.1038/natrevmats.2023.10289',
    tags: ['Self-powered', 'Nanogenerator', 'Review'],
  },
  {
    id: 'pub-4',
    title: 'Blue Energy and Triboelectric Nanogenerators for Large-Scale Ocean Wave Energy',
    authors: ['Zhong Lin Wang', 'Tao Jiang', 'Liang Xu'],
    journal: 'Advanced Energy Materials',
    year: 2022,
    citations: 892,
    doi: '10.1002/aenm.202200wr01',
    tags: ['Blue Energy', 'Ocean Wave', 'Triboelectric'],
  },
  {
    id: 'pub-5',
    title: 'Self-Powered Flexible Sensor Systems Based on Triboelectric Nanogenerators',
    authors: ['Zhong Lin Wang', 'Qingshen Jing', 'Zhaoling Li'],
    journal: 'Advanced Materials',
    year: 2022,
    citations: 1562,
    doi: '10.1002/adma.202200wr02',
    tags: ['Flexible Electronics', 'Sensor', 'Wearable'],
  },
  {
    id: 'pub-6',
    title: 'Toward the Blue Energy Dream by Triboelectric Nanogenerator Networks',
    authors: ['Zhong Lin Wang'],
    journal: 'Nano Energy',
    year: 2021,
    citations: 2230,
    doi: '10.1016/j.nanoen.2021.105544',
    tags: ['Blue Energy', 'Network', 'Ocean'],
  },
  {
    id: 'pub-7',
    title: 'Piezotronics and Piezo-phototronics for Adaptive Electronics and Optoelectronics',
    authors: ['Zhong Lin Wang', 'Wenzhuo Wu'],
    journal: 'Nature Reviews Materials',
    year: 2021,
    citations: 1890,
    doi: '10.1038/s41578-021-00321-3',
    tags: ['Piezotronics', 'Optoelectronics', 'Review'],
  },
  {
    id: 'pub-8',
    title: 'Stretchable Nanogenerators and Integrated Systems for Human Motion Sensing',
    authors: ['Zhong Lin Wang', 'Han Jin', 'Jun Chen'],
    journal: 'ACS Nano',
    year: 2020,
    citations: 1120,
    doi: '10.1021/acsnano.0c09876',
    tags: ['Stretchable', 'Wearable', 'Motion Sensing'],
  },
  {
    id: 'pub-9',
    title: 'Triboelectric Nanogenerators: Fundamental Physics and Applications',
    authors: ['Zhong Lin Wang', 'Long Lin', 'Jun Chen'],
    journal: 'Advanced Functional Materials',
    year: 2020,
    citations: 2056,
    doi: '10.1002/adfm.202000wr09',
    tags: ['Triboelectric', 'Physics', 'Applications'],
  },
  {
    id: 'pub-10',
    title: 'On the Origin of the Output Asymmetry in Single-Electrode Triboelectric Generator',
    authors: ['Zhong Lin Wang', 'Simiao Niu', 'Yannan Hou', 'Yu Liu'],
    journal: 'Advanced Energy Materials',
    year: 2019,
    citations: 780,
    doi: '10.1002/aenm.201900wr08',
    tags: ['Triboelectric', 'Single-Electrode', 'Output'],
  },
];

// ─── MOST CITED ───────────────────────────────────────────────────────────────
export const MOCK_MOST_CITED = [
  {
    id: 'mc-1',
    title: 'Piezoelectric Nanogenerators Based on Zinc Oxide Nanowire Arrays',
    journal: 'Science',
    year: 2006,
    citations: 12480,
    doi: '10.1126/science.1124273',
  },
  {
    id: 'mc-2',
    title: 'Self-Powered Nanotechnology — Nanogenerators for Harvesting Energy from Environment',
    journal: 'Small',
    year: 2009,
    citations: 8950,
    doi: '10.1002/smll.200900098',
  },
  {
    id: 'mc-3',
    title: 'Triboelectric Nanogenerators as New Energy Technology and Self-Powered Sensors',
    journal: 'ACS Nano',
    year: 2013,
    citations: 6720,
    doi: '10.1021/nn404614z',
  },
  {
    id: 'mc-4',
    title: 'Nanopiezotronics',
    journal: 'Advanced Materials',
    year: 2007,
    citations: 5840,
    doi: '10.1002/adma.200700638',
  },
  {
    id: 'mc-5',
    title: 'Toward Self-Powered Sensor Networks',
    journal: 'Nature',
    year: 2011,
    citations: 4210,
    doi: '10.1038/nature09876',
  },
];

// ─── TOP JOURNALS ─────────────────────────────────────────────────────────────
export const MOCK_JOURNALS = [
  { id: 1, name: 'Nano Energy', publications: 128, latestYear: 2026 },
  { id: 2, name: 'Advanced Materials', publications: 76, latestYear: 2025 },
  { id: 3, name: 'Nature Communications', publications: 52, latestYear: 2026 },
  { id: 4, name: 'Advanced Energy Materials', publications: 48, latestYear: 2025 },
  { id: 5, name: 'Nano Letters', publications: 41, latestYear: 2024 },
  { id: 6, name: 'ACS Nano', publications: 38, latestYear: 2026 },
  { id: 7, name: 'Advanced Functional Materials', publications: 35, latestYear: 2025 },
  { id: 8, name: 'Science', publications: 18, latestYear: 2023 },
];

// ─── COLLABORATORS ────────────────────────────────────────────────────────────
export const MOCK_COLLABORATORS = [
  {
    id: 1,
    name: 'Xudong Wang',
    institution: 'University of Wisconsin–Madison',
    role: 'Professor',
    sharedPublications: 48,
    researchArea: 'Piezoelectric Materials',
    avatarColor: '#6366F1',
  },
  {
    id: 2,
    name: 'Jun Chen',
    institution: 'University of California, Los Angeles',
    role: 'Professor',
    sharedPublications: 62,
    researchArea: 'Flexible Electronics',
    avatarColor: '#0EA5E9',
  },
  {
    id: 3,
    name: 'Wenzhuo Wu',
    institution: 'Purdue University',
    role: 'Associate Professor',
    sharedPublications: 35,
    researchArea: 'Piezotronics',
    avatarColor: '#10B981',
  },
  {
    id: 4,
    name: 'Long Lin',
    institution: 'University of Washington',
    role: 'Professor',
    sharedPublications: 41,
    researchArea: 'Triboelectric Nanogenerators',
    avatarColor: '#F59E0B',
  },
  {
    id: 5,
    name: 'Tao Jiang',
    institution: 'Chinese Academy of Sciences',
    role: 'Researcher',
    sharedPublications: 29,
    researchArea: 'Blue Energy',
    avatarColor: '#8B5CF6',
  },
  {
    id: 6,
    name: 'Yunlong Zi',
    institution: 'Chinese University of Hong Kong',
    role: 'Associate Professor',
    sharedPublications: 23,
    researchArea: 'Nanogenerators',
    avatarColor: '#EC4899',
  },
];

// ─── RESEARCH NETWORK (SVG nodes) ─────────────────────────────────────────────
export const MOCK_NETWORK = {
  center: { label: 'Zhong Lin Wang', type: 'person' },
  nodes: [
    { id: 'n1', label: 'Georgia Tech', type: 'institution', angle: 0 },
    { id: 'n2', label: 'Chinese Academy of Sciences', type: 'institution', angle: 60 },
    { id: 'n3', label: 'Nanoenergy', type: 'topic', angle: 120 },
    { id: 'n4', label: 'Nanotechnology', type: 'topic', angle: 180 },
    { id: 'n5', label: 'Self-powered Sensors', type: 'topic', angle: 240 },
    { id: 'n6', label: 'Triboelectric TENG', type: 'topic', angle: 300 },
  ],
};

// ─── AWARDS & HONORS ─────────────────────────────────────────────────────────
export const MOCK_AWARDS = [
  {
    id: 1,
    year: 2019,
    award: 'Albert Einstein World Award of Science',
    organization: 'World Cultural Council',
    description: 'For pioneering contributions to nanogenerators and self-powered nanosystems.',
  },
  {
    id: 2,
    year: 2018,
    award: 'ENI Award',
    organization: 'ENI Energy Company',
    description: 'Frontier of Energy Award for contributions to nanoenergy science.',
  },
  {
    id: 3,
    year: 2015,
    award: 'Materials Research Society Medal',
    organization: 'Materials Research Society',
    description: 'For outstanding research in nanogenerators and self-powered systems.',
  },
  {
    id: 4,
    year: 2014,
    award: 'ACS Nano Lectureship Award',
    organization: 'American Chemical Society',
    description: 'Asia/Pacific region for contributions in nanotechnology.',
  },
  {
    id: 5,
    year: 2013,
    award: 'World Technology Award — Energy',
    organization: 'World Technology Network',
    description: 'For breakthrough research in nanoscale energy harvesting.',
  },
];

// ─── EDUCATION & CAREER ───────────────────────────────────────────────────────
export const MOCK_EDUCATION = [
  {
    id: 1,
    year: '1982',
    degree: "Bachelor's Degree in Applied Physics",
    institution: 'Central South University of Technology',
    location: 'Changsha, China',
    type: 'education',
  },
  {
    id: 2,
    year: '1987',
    degree: 'PhD in Physics',
    institution: 'Arizona State University',
    location: 'Tempe, Arizona, USA',
    type: 'education',
  },
  {
    id: 3,
    year: '1995',
    degree: 'Associate Professor',
    institution: 'Georgia Institute of Technology',
    location: 'Atlanta, Georgia, USA',
    type: 'career',
  },
  {
    id: 4,
    year: '2006',
    degree: 'Regents Professor',
    institution: 'Georgia Institute of Technology',
    location: 'Atlanta, Georgia, USA',
    type: 'career',
  },
  {
    id: 5,
    year: '2011',
    degree: 'Director & Chief Scientist',
    institution: 'Beijing Institute of Nanoenergy and Nanosystems, CAS',
    location: 'Beijing, China',
    type: 'career',
  },
  {
    id: 6,
    year: '2022',
    degree: 'Hightower Chair in Materials Science',
    institution: 'Georgia Institute of Technology',
    location: 'Atlanta, Georgia, USA',
    type: 'career',
  },
];

// ─── RELATED RESEARCHERS ─────────────────────────────────────────────────────
export const MOCK_RELATED_RESEARCHERS = [
  {
    id: 1,
    name: 'Charles M. Lieber',
    institution: 'Harvard University',
    role: 'Professor',
    areas: ['Nanowire Electronics', 'Bioelectronics'],
    avatarColor: '#6366F1',
  },
  {
    id: 2,
    name: 'Yi Cui',
    institution: 'Stanford University',
    role: 'Professor',
    areas: ['Nanomaterials', 'Energy Storage'],
    avatarColor: '#0EA5E9',
  },
  {
    id: 3,
    name: 'Peidong Yang',
    institution: 'UC Berkeley',
    role: 'Professor',
    areas: ['Nanoscience', 'Solar Energy'],
    avatarColor: '#10B981',
  },
  {
    id: 4,
    name: 'Liangbing Hu',
    institution: 'University of Maryland',
    role: 'Professor',
    areas: ['Cellulose Nanostructures', 'Energy'],
    avatarColor: '#F59E0B',
  },
  {
    id: 5,
    name: 'Nanshu Lu',
    institution: 'University of Texas at Austin',
    role: 'Professor',
    areas: ['Stretchable Electronics', 'Sensors'],
    avatarColor: '#8B5CF6',
  },
  {
    id: 6,
    name: 'Xiangfeng Duan',
    institution: 'UCLA',
    role: 'Professor',
    areas: ['2D Materials', 'Electronic Devices'],
    avatarColor: '#EC4899',
  },
];
