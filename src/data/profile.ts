export const profile = {
  name: 'Hesam Samani',
  location: 'Hasselt, Belgium',
  relocation: 'Open to relocation',
  tagline: 'BIM Specialist · Revit Professional · Healthcare Projects',
  email: 'hesamghsamani@gmail.com',
  phone: '+32 470 176161',
  linkedin: 'https://www.linkedin.com/in/hesam-samani/',
  codesSite: 'https://hesamsamani.codes',
  stats: [
    { value: '4+', label: 'Years BIM Experience' },
    { value: '3', label: 'Autodesk ACP Certs' },
    { value: '50+', label: 'Students Taught' },
  ],
  about: [
    'BIM specialist with hands-on experience delivering healthcare and commercial projects from concept through construction documentation.',
    'Proficient across the full Revit ecosystem — Architecture, Structure, and MEP — with strong coordination workflows in Navisworks and Solibri.',
    'Passionate about raising BIM standards through teaching, ISO 19650 compliance, and LOD 350–400 model production.',
  ],
  experience: [
    {
      company: 'Olum Fonun',
      role: 'BIM Instructor',
      period: '2023 – 2025',
      bullets: [
        'Delivered structured Revit and BIM coordination curricula to 50+ architecture and engineering students',
        'Developed hands-on lab exercises covering LOD standards, clash detection, and model federation workflows',
        'Mentored student capstone projects from schematic design through coordinated BIM deliverables',
      ],
    },
    {
      company: 'Guilan University',
      role: 'BIM Coordinator',
      period: '2021 – 2022',
      bullets: [
        'Coordinated multidisciplinary Revit models across architecture, structure, and MEP disciplines',
        'Established BIM execution plans and clash-detection protocols for academic research projects',
        'Trained faculty and graduate researchers on Navisworks coordination and Solibri quality checks',
      ],
    },
    {
      company: 'ABAD Consulting Engineers',
      role: 'Junior Architect',
      period: '2019 – 2021',
      bullets: [
        'Produced Revit construction documentation for healthcare and commercial buildings up to LOD 400',
        'Created parametric families and detail components reducing drawing revision time by 30%',
        'Participated in design coordination meetings and resolved 200+ clash reports via Navisworks',
      ],
    },
  ],
  skills: [
    {
      category: 'BIM Authoring',
      items: ['Revit Architecture', 'Revit Structure', 'Revit MEP'],
    },
    {
      category: 'Coordination & QA',
      items: ['Navisworks', 'Solibri', 'BIM 360'],
    },
    {
      category: 'Standards & Delivery',
      items: ['ISO 19650', 'LOD 350–400', 'BEP Development'],
    },
  ],
  certifications: [
    { name: 'Autodesk Certified Professional — Revit Architecture', issuer: 'Autodesk' },
    { name: 'Autodesk Certified Professional — Revit Structure', issuer: 'Autodesk' },
    { name: 'Autodesk Certified Professional — Revit MEP', issuer: 'Autodesk' },
    { name: 'Programming for Everybody (Python)', issuer: 'University of Michigan' },
    { name: '3D Modeling with Rhino', issuer: 'University of Michigan' },
  ],
  languages: [
    { language: 'English', level: 'Work proficient', proficiency: 90 },
    { language: 'Dutch', level: 'Intermediate', proficiency: 55 },
  ],
} as const;