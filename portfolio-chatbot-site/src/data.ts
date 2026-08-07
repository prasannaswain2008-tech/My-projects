import { WorkExperience, SkillCategory, EducationItem } from "./types";

export const personalInfo = {
  name: "Prasanna Kumar Swain",
  title: "Specialist Technical Writer",
  tagline: "Bridging Technical Complexity with Human Clarity",
  experienceYears: "10+",
  location: "Bengaluru, India",
  email: "prasanna.swain2008@gmail.com",
  phone: "+91-8553818429",
  linkedin: "https://linkedin.com/in/prasanna-swain-639b2811",
  summary:
    "Results-driven Specialist Technical Writer with 10+ years of experience delivering high-quality documentation across software, healthcare, automotive, aerospace, and financial domains. Expert in DITA, XML-based authoring, Docs-as-Code pipelines (Git, Markdown, CI/CD automated checks), API documentation, and basic agentic AI workflow integration. Hands-on experience with modern AI tools including Claude Code, NotebookLM, CrewAI, and Gemini to automate repetitive writing overhead, summarize extensive specs, and construct interactive knowledge-retrieval systems that streamline documentation delivery.",
};

export const workExperiences: WorkExperience[] = [
  {
    id: "exp1",
    role: "Senior Technical Writer",
    company: "Infinite Computer Solutions",
    client: "GE HealthCare",
    period: "July 2025 – Present",
    location: "Bengaluru, India",
    isCurrent: true,
    bulletPoints: [
      "Author and maintain Installation Guides, API Guides, and Consumer Onboarding Guides for KloudFuse and Enterprise Audit Trail applications, enabling consistent observability adoption across GE HealthCare internal services.",
      "Pioneered a modern Docs-as-Code framework, converting traditional documentation sets into modular Markdown stored in Git repositories, and integrated automated linters and style checkers into GitHub Actions pull request pipelines.",
      "Designed and deployed basic agentic AI workflows and chatbots using Gemini, CrewAI, Claude Code, and NotebookLM to streamline the documentation lifecycle—automating pre-publication terminology checks, auto-generating draft release notes from engineering specs, and reading through extensive manuals in contextual snippets.",
      "Created an Agentic AI chatbot to onboard new users onto developer platforms, guiding users/customers through setup procedures and answering real-time support questions.",
      "Developed specialized AI retrieval agents that query technical manuals in logical snippets, directly helping users and customers troubleshoot issues and complete installation/configuration tasks.",
      "Translate complex technical workflows for onboarding applications, and configuring logs, metrics, and traces across Kubernetes and AWS environments into clear, actionable documentation.",
      "Produce step-by-step API documentation in Swagger, covering endpoints, authentication, error handling, and troubleshooting to accelerate developer adoption.",
      "Create Confluence articles on importing alerts and dashboards; develop monitoring and visualization guidance using Prometheus and Grafana to support self-service diagnostics.",
      "Partner with Platform, SRE, DevOps, and Engineering SMEs to validate technical accuracy, manage review cycles, and publish versioned documentation with change tracking.",
      "Authored structured DITA-based documentation using Oxygen XML Editor, applying topic-based authoring principles—concept, task, and reference topic types—to build modular, reusable content sets for KloudFuse and Enterprise Audit Trail product lines.",
    ],
    tags: ["Docs-as-Code", "AI Automation", "CrewAI", "Claude Code", "NotebookLM", "Gemini", "Swagger", "Kubernetes", "AWS", "DITA", "Oxygen XML", "Prometheus", "Grafana"],
    domain: "HealthCare & Software",
  },
  {
    id: "exp2",
    role: "Senior Technical Writer",
    company: "TekisHub Consulting Services Pvt Ltd",
    client: "Infosys",
    period: "March 2025 – July 2025",
    location: "Bengaluru, India",
    bulletPoints: [
      "Developed a comprehensive new user manual for the LIC Customer application, engaging with internal stakeholders and end-users to capture accurate functional requirements.",
      "Conducted stakeholder interviews to gather technical specifications and ensure documentation accuracy prior to publication.",
    ],
    tags: ["User Manuals", "Stakeholder Mgmt", "Infosys", "LIC"],
    domain: "Financial Services / Banking",
  },
  {
    id: "exp3",
    role: "Senior Technical Writer",
    company: "International Motors, LLC",
    period: "July 2024 – December 2024",
    location: "USA (Remote / Bengaluru)",
    bulletPoints: [
      "Led documentation for the Quality Center of Excellence (QCoE) team, authoring SOPs, Quick Reference Guides, Test Plans, Test Cases, Test Scripts, Release Notes, API Guides, and Troubleshooting Guides.",
      "Collaborated closely with QA engineers, Test Analysts, and product management to gather requirements and ensure consistency and completeness across all documentation types.",
      "Published and versioned SOPs and QRGs in ServiceNow to ensure all team members accessed current documentation at all times.",
      "Produced training videos using Camtasia for newly implemented QA tools, improving team onboarding speed and knowledge transfer.",
      "Created and managed User Stories and features in Azure DevOps (ADO), and administered SharePoint sites for QCoE and the Digital Transformation Office.",
    ],
    tags: ["SOPs", "Camtasia", "Azure DevOps", "ServiceNow", "SharePoint"],
    domain: "Automotive / QCoE",
  },
  {
    id: "exp4",
    role: "Senior Technical Writer",
    company: "Synechron Digital Payment Solutions",
    client: "Commonwealth Bank of Australia",
    period: "February 2024 – July 2024",
    location: "Bengaluru, India",
    bulletPoints: [
      "Documented Critical User Journey (CUJ) APIs for the SRE team, producing structured API reference guides that enabled consistent interpretation of complex payment workflows.",
      "Engaged diverse cross-functional stakeholders to gather product and process knowledge, and created supporting process diagrams and presentation materials.",
    ],
    tags: ["API Reference", "FinTech", "SRE", "CUJ API"],
    domain: "Banking & Financial Services",
  },
  {
    id: "exp5",
    role: "Senior Technical Writer (Lead Writer)",
    company: "GE HealthCare",
    period: "May 2021 – January 2024",
    location: "Bengaluru, India",
    isLead: true,
    bulletPoints: [
      "Managed end-to-end technical publication deliverables for multiple New Product Introduction (NPI), Variable Cost Proposition (VCP), and Installed-Base (IB) projects simultaneously.",
      "Developed and maintained Service Manuals, Installation Manuals, and Operator's Manuals for multiple product versions, coordinating with SMEs, QA, Regulatory Affairs, and cross-functional stakeholders.",
      "Created Technical Publication Plans, Localization Plans, and project schedules in Smartsheet and SharePoint; prepared deliverable dashboards with timelines, dependencies, and risk registers for project management review.",
      "Led Sprint Planning, Scrum meetings, and Sprint Closure sessions for the Technical Publications team, driving Agile delivery of documentation milestones.",
      "Managed localization workflows with print vendors, including Full Article Inspection (FAI) execution, BOM structure maintenance, and translation coordination for eIFUs.",
      "Achieved 100% regulatory compliance across all manual deliverables by coordinating Change Review Board (CCB) participation and enforcing strict adherence to documentation standards.",
      "Mentored and trained new writers, establishing best practices for topic-based authoring and documentation quality.",
      "Authored and structured product manuals using DITA methodology in Oxygen XML Editor, creating modular topic libraries that enabled efficient content reuse across product variants.",
    ],
    tags: ["DITA", "Oxygen XML", "Schema ST4 CMS", "Sprint Planning", "Change Review Board", "NPI"],
    domain: "HealthCare / Medical Devices",
  },
  {
    id: "exp6",
    role: "Senior Technical Writer",
    company: "Philips India Limited",
    period: "April 2016 – May 2021",
    location: "Bengaluru, India",
    bulletPoints: [
      "Planned and executed Technical Publication Plans, Localization Plans, and Document Testing Plans for each product release cycle.",
      "Authored and maintained user manuals, reference guides, release notes, and contextual online help, managing content in Astoria and Schema ST4 CMS with version control.",
      "Integrated HyperSTE plug-in into the CMS to enforce clarity, conciseness, and terminology consistency across all documentation, reducing review iterations.",
      "Implemented LEAN process improvements in the Technical Documentation team, eliminating redundant workflows and improving delivery throughput.",
      "Implemented a Document Testing process and authored test cases to verify the accuracy of new and updated manual content.",
      "Received the Outstanding Performer Award (2020) in recognition of documentation quality and team contributions.",
    ],
    tags: ["LEAN", "Astoria", "HyperSTE", "Document Testing", "Schema ST4", "Award Winner"],
    domain: "HealthCare / Lighting / Consumer Electronics",
  },
  {
    id: "exp7",
    role: "Technical Author",
    company: "eClinicalWorks India Pvt Ltd",
    period: "May 2015 – April 2016",
    location: "Bengaluru, India",
    bulletPoints: [
      "Authored and maintained User Manuals, Installation Guides, Release Notes, SOPs, IT and Security Policies, PDF forms, and online help for EMR and Patient Management software.",
      "Participated in daily Agile sprint meetings, collaborating with developers, SMEs, and support teams to gather requirements and validate documentation accuracy.",
    ],
    tags: ["EMR", "SOPs", "Agile", "User Manuals"],
    domain: "HealthCare Software",
  },
  {
    id: "exp8",
    role: "Technical Author",
    company: "Lionbridge Technologies Pvt Ltd",
    client: "Airbus",
    period: "January 2014 – May 2015",
    location: "Bengaluru, India",
    bulletPoints: [
      "Created Illustrated Parts Catalogues and Maintenance Manuals for Airbus A380 aircraft.",
      "Tracked documentation defects and managed team workflow using JIRA, ensuring on-time delivery.",
    ],
    tags: ["Airbus A380", "JIRA", "Illustrated Parts Catalogues"],
    domain: "Aerospace",
  },
  {
    id: "exp9",
    role: "Technical Author",
    company: "ALTEN India Pvt Ltd",
    client: "Airbus",
    period: "January 2011 – January 2013",
    location: "Bengaluru, India",
    bulletPoints: [
      "Created and updated Maintenance Manuals for Airbus A350/A380 aircraft.",
      "Coordinated with internal teams and customers to capture technical requirements and ensure content accuracy.",
    ],
    tags: ["Airbus A350", "Maintenance Manuals", "Technical Accuracy"],
    domain: "Aerospace",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "writing-editing",
    title: "Technical Writing & Editing",
    icon: "FileText",
    description: "Core structural and lexical capabilities for user assistance, style guides, and layout standards.",
    skills: [
      { name: "Topic-Based Authoring", proficiency: 95 },
      { name: "API Documentation (Swagger / OpenAPI)", proficiency: 90 },
      { name: "Online Help Development", proficiency: 92 },
      { name: "Installation & User Guides", proficiency: 95 },
      { name: "Service & Operator Manuals", proficiency: 96 },
      { name: "UX Writing & Help Systems", proficiency: 88 },
      { name: "Single-Source Authoring", proficiency: 94 },
      { name: "Release Notes & SOPs", proficiency: 95 },
    ],
    tags: ["MSTP", "Simplified Technical English", "Content Strategy"],
  },
  {
    id: "authoring-systems",
    title: "Structured Authoring & CMS",
    icon: "Layers",
    description: "Authoring platforms, CCMS systems, and structured document formats for reusable info architecture.",
    skills: [
      { name: "DITA & XML (Oxygen XML)", proficiency: 95 },
      { name: "Schema ST4 CMS", proficiency: 88 },
      { name: "Astoria CMS", proficiency: 85 },
      { name: "MadCap Flare", proficiency: 82 },
      { name: "Arbortext Editor", proficiency: 85 },
      { name: "RoboHelp", proficiency: 80 },
      { name: "Adobe FrameMaker", proficiency: 75 },
    ],
    tags: ["Information Modeling", "Single Sourcing", "CCMS"],
  },
  {
    id: "agile-devops",
    title: "Agile, DevOps & Tooling",
    icon: "Terminal",
    description: "Agility in product development, documentation-as-code pipelines, and collaboration frameworks.",
    skills: [
      { name: "Agile / SAFe Practitioner", proficiency: 90 },
      { name: "JIRA & Confluence", proficiency: 92 },
      { name: "Azure DevOps (ADO)", proficiency: 85 },
      { name: "Git & GitHub", proficiency: 80 },
      { name: "Kubernetes & AWS Onboarding", proficiency: 75 },
      { name: "Prometheus & Grafana (Diagnostics)", proficiency: 72 },
    ],
    tags: ["Scrum", "SAFe Agile", "Docs-as-Code"],
  },
  {
    id: "gen-ai-modern",
    title: "Generative AI & Media",
    icon: "Sparkles",
    description: "Leveraging next-gen artificial intelligence and multimedia for high-performance workflow automation.",
    skills: [
      { name: "AI Agent Development (Automation)", proficiency: 85 },
      { name: "Prompt Engineering (Content Generation)", proficiency: 90 },
      { name: "Localization & Translation Management", proficiency: 88 },
      { name: "Instructional Videos (Camtasia)", proficiency: 82 },
      { name: "E-Learning Modules", proficiency: 80 },
    ],
    tags: ["AI Copilots", "Workflow Automation", "Localization"],
  },
];

export const educationAndCertifications: EducationItem[] = [
  {
    type: "formal",
    degreeOrName: "Aircraft Maintenance Engineering",
    institution: "Utkal Aerospace & Engineering",
    location: "Bhubaneswar, India",
    description:
      "Provided foundational technical rigor required to digest complex engineering diagrams and author highly accurate technical and maintenance manuals.",
    tags: ["Aviation Engineering", "Airframe & Engines"],
  },
  {
    type: "certification",
    degreeOrName: "Certified SAFe® Agile Practitioner",
    institution: "Scaled Agile",
    period: "Professional Certification",
    description: "Equipped with scaling agile practices, scrum methodologies, PI planning, and sprint ceremonies.",
    tags: ["SAFe Practitioner", "Agile at Scale"],
  },
  {
    type: "certification",
    degreeOrName: "Certification in Technical Writing",
    institution: "Techtotal Soft Pvt. Ltd.",
    period: "Professional Certification",
    description: "Structured specialization covering tech writing theories, DDLC, style guides, and XML publishing.",
    tags: ["DITA-XML", "Style Guides", "Technical Writing Core"],
  },
];

export const keyAchievements = [
  "Outstanding Performer Award – Philips India Limited (2020), awarded for documentation excellence and cross-team collaboration.",
  "Designed and deployed an Agentic AI onboarding chatbot that guides new users through platform setup, accelerating developer onboarding speed by 40%.",
  "Engineered contextual multi-agent systems using CrewAI, Gemini, and Claude Code to parse complex product manuals into snippet-sized solutions, helping users/customers complete configuration tasks autonomously.",
  "Integrated NotebookLM-powered semantic documentation search engines to enable instant technical query resolution for enterprise customers.",
  "Implemented LEAN process improvements in the Technical Documentation team, streamlining workflows and eliminating redundant practices.",
  "Designed and deployed a Document Testing process with test cases to verify accuracy of new documentation content before publication.",
  "Integrated HyperSTE plug-in into the CMS, enforcing content clarity and consistency standards across all product documentation.",
];

export const servicesOffered = [
  {
    title: "DITA & Structured XML Authoring",
    icon: "Layers",
    description:
      "Design and authoring of highly reusable, modular information architectures using Oxygen XML, Schema ST4, or Astoria, ensuring multi-channel output consistency.",
  },
  {
    title: "Developer Documentation & API Ref",
    icon: "Code",
    description:
      "Drafting clear, step-by-step developer guides, OpenAPI / Swagger specifications, and SDK onboarding manuals for SaaS or enterprise software pipelines.",
  },
  {
    title: "Generative AI Documentation Workflows",
    icon: "Sparkles",
    description:
      "Prompt engineering and custom AI agent setups to automate, proofread, translate, or streamline complex documentation tasks without losing editorial precision.",
  },
  {
    title: "Agile Program Lead & Lead Writing",
    icon: "Users",
    description:
      "Coordinating writing groups, leading technical publication plans, and establishing sprint milestones in highly collaborative SAFe environments.",
  },
];
