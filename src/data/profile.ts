export const profile = {
  name: 'Hesam Samani',
  location: 'Hasselt, Belgium',
  relocation: 'Open to relocation',
  tagline: 'BIM Specialist · Revit Professional · MEP & HVAC Engineer',
  roleTags: ['BIM Specialist', 'Revit Professional', 'MEP & HVAC Engineer'],
  email: 'hesamghsamani@gmail.com',
  phone: '+32 470 176161',
  linkedin: 'https://www.linkedin.com/in/hesam-samani/',
  github: 'https://github.com/Hesamsamani',
  codesSite: 'https://hesamsamani.codes',
  greeting: "Hello, I'm",
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
      company: 'Olum Fonun Kadoos Higher Education Institute',
      role: 'BIM Instructor',
      period: '2023 – 2025',
      duration: '2 Years',
      featured: true,
      tags: ['Revit', 'BIM Coordination', 'Teaching', 'LOD Standards'],
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
      duration: '1 Year',
      tags: ['Navisworks', 'Solibri', 'BEP', 'Model Federation'],
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
      duration: '2 Years',
      tags: ['Healthcare BIM', 'LOD 400', 'Navisworks', 'Revit'],
      bullets: [
        'Produced Revit construction documentation for healthcare and commercial buildings up to LOD 400',
        'Optimized BIM workflows achieving 15% fewer coordination errors, 18% less rework, and 12% fewer model errors',
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
    {
      category: 'Software',
      items: ['AutoCAD', 'Rhino', 'Python', 'SketchUp'],
    },
  ],
  projects: [
    {
      title: 'MEP and HVAC Engineer',
      category: 'MEP & HVAC',
      description:
        'Led multidisciplinary Revit MEP and HVAC production for a 12,000 m² facility expansion, delivering coordinated LOD 400 construction documentation across architecture, structure, and building services.',
      highlights: [
        'Federated 6 discipline models with weekly clash-detection cycles',
        'Delivered 180+ sheets with ISO 19650-compliant naming and revision control',
        'Reduced RFIs during documentation phase through proactive MEP coordination',
      ],
      metrics: ['LOD 400', 'MEP & HVAC', '180+ Sheets'],
    },
    {
      title: 'BIM Workflow Optimization',
      category: 'Process Improvement',
      description:
        'Redesigned model-checking and coordination protocols for a multi-project AEC team, standardizing templates, clash workflows, and QA gates across three concurrent builds.',
      highlights: [
        '15% fewer coordination errors after implementing structured QA checklists',
        '18% less rework through earlier clash resolution in design development',
        '12% fewer model errors via automated Solibri rule-based validation',
      ],
      metrics: ['−15% Errors', '−18% Rework', '−12% Model Errors'],
    },
    {
      title: 'BIM Teaching Portfolio',
      category: 'Education',
      description:
        'Developed and delivered a semester-long Revit and BIM coordination curriculum for architecture and engineering students, bridging academic theory with industry-ready deliverables.',
      highlights: [
        'Structured 14-week program covering LOD standards through model federation',
        'Mentored 50+ students on capstone projects from schematic design to CD',
        'Built reusable lab modules for clash detection, BEP writing, and Navisworks coordination',
      ],
      metrics: ['50+ Students', '14 Weeks', '3 ACP Tracks'],
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