import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText, Layers, Terminal, Sparkles, Code, Users,
  MapPin, Mail, Phone, Linkedin, Award, BookOpen,
  ChevronRight, ArrowRight, CheckCircle2, Copy, Check, Send,
  ExternalLink, Briefcase, RefreshCw, AlertTriangle, FileJson,
  Menu, X, CheckSquare, ShieldCheck, HeartPulse, GraduationCap,
  Sparkle
} from "lucide-react";
import { personalInfo, skillCategories, educationAndCertifications, keyAchievements, servicesOffered } from "./data";
import { WorkTimeline } from "./components/WorkTimeline";
import { AiSandbox } from "./components/AiSandbox";
import { ShowcaseSection } from "./components/ShowcaseSection";
import { ManualsChatWidget } from "./components/ManualsChatWidget";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState(skillCategories[0].id);

  // Contact copy states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form submission mockup
  const [formState, setFormState] = useState({ name: "", email: "", msg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone.replace(/\s+/g, ''));
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", msg: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-surface text-brand-on-surface select-none">
      <ManualsChatWidget />

      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 w-full bg-brand-surface-lowest/85 backdrop-blur-md border-b border-brand-outline-variant/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo / Initials */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-serif font-bold text-white text-base group-hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20">
              P
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-brand-on-surface text-sm tracking-tight leading-none">
                Prasanna Swain
              </span>
              <span className="font-mono text-[10px] text-brand-outline leading-none mt-1 font-normal h-[14px]">
                Technical Writer
              </span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-xs font-mono text-brand-on-surface-variant hover:text-brand-primary transition-colors">
              About
            </a>
            <a href="#skills" className="text-xs font-mono text-brand-on-surface-variant hover:text-brand-primary transition-colors">
              Skills
            </a>
            <a href="#portfolio" className="text-xs font-mono text-brand-on-surface-variant hover:text-brand-primary transition-colors">
              Portfolio
            </a>
            <a href="#experience" className="text-xs font-mono text-brand-on-surface-variant hover:text-brand-primary transition-colors">
              Experience
            </a>
            <a href="#achievements" className="text-xs font-mono text-brand-on-surface-variant hover:text-brand-primary transition-colors">
              Impact
            </a>
            <a href="#services" className="text-xs font-mono text-brand-on-surface-variant hover:text-brand-primary transition-colors">
              Services
            </a>
            <a href="#ai-sandbox" className="text-xs font-mono text-brand-primary flex items-center gap-1 hover:text-brand-primary/80 transition-colors">
              <Sparkles size={11} className="animate-pulse" /> Sandbox
            </a>
          </nav>

          {/* Hire me Call to Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://linkedin.com/in/prasanna-swain-639b2811"
              target="_blank"
              referrerPolicy="no-referrer"
              className="p-2 rounded bg-brand-surface-low hover:bg-brand-surface-high border border-brand-outline-variant text-brand-outline hover:text-brand-primary transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded bg-brand-primary text-brand-on-primary text-xs font-mono font-medium hover:bg-brand-primary/95 transition-colors"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded bg-brand-surface-low border border-brand-outline-variant text-brand-on-surface cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-brand-surface-medium border-b border-brand-outline-variant overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col gap-4 font-mono text-xs">
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-brand-on-surface-variant hover:text-brand-primary"
                >
                  About
                </a>
                <a
                  href="#skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-brand-on-surface-variant hover:text-brand-primary"
                >
                  Skills
                </a>
                <a
                  href="#portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-brand-on-surface-variant hover:text-brand-primary"
                >
                  Portfolio
                </a>
                <a
                  href="#experience"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-brand-on-surface-variant hover:text-brand-primary"
                >
                  Experience
                </a>
                <a
                  href="#achievements"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-brand-on-surface-variant hover:text-brand-primary"
                >
                  Impact
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-brand-on-surface-variant hover:text-brand-primary"
                >
                  Services
                </a>
                <a
                  href="#ai-sandbox"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-brand-primary flex items-center gap-1"
                >
                  <Sparkles size={12} /> AI Sandbox
                </a>

                <div className="flex gap-2 pt-3 border-t border-brand-outline-variant/40">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 text-center rounded bg-brand-primary text-brand-on-primary font-medium"
                  >
                    Contact Swains
                  </a>
                  <a
                    href="https://linkedin.com/in/prasanna-swain-639b2811"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2.5 rounded bg-brand-surface-low border border-brand-outline-variant text-brand-outline"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-brand-surface-lowest to-brand-surface">

        {/* Subtle grid visual block */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2427_1px,transparent_1px),linear-gradient(to_bottom,#1f2427_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left side content (text & buttons) */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">

              {/* Tagline / Subtitle Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Specialist Technical Writer • 10+ Years Experience
              </div>

              {/* Name & Role Display Typography */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-on-surface mb-6 leading-tight">
                {personalInfo.name}
              </h1>

              <p className="font-sans text-lg sm:text-xl font-light text-brand-primary mb-6 tracking-normal">
                {personalInfo.tagline}
              </p>

              <p className="font-sans text-brand-on-surface-variant text-sm md:text-base mb-8 leading-relaxed max-w-2xl text-center lg:text-left">
                Leading robust structured writing programs across complex enterprise networks. Specialized in <strong>DITA/XML architectures</strong>, <strong>Docs-as-Code pipelines (Git/Markdown/CI)</strong>, and integrating <strong>basic agentic AI workflows</strong> to automate repetitive documentation tasks.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto">
                <a
                  href="#ai-sandbox"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-brand-primary text-brand-on-primary font-mono text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 hover:bg-brand-primary/90 transition-all hover:scale-[1.01]"
                >
                  <Sparkles size={16} />
                  Try AI Co-Pilot Sandbox
                </a>
                <a
                  href="#experience"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-brand-surface-medium text-brand-on-surface border border-brand-outline-variant font-mono text-sm hover:bg-brand-surface-high transition-all flex items-center justify-center"
                >
                  Explore Milestones
                </a>
              </div>

              {/* Quick core capability badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 max-w-2xl">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-brand-surface-low border border-brand-outline-variant text-brand-on-surface-variant flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> DITA Architecture
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-brand-surface-low border border-brand-outline-variant text-brand-on-surface-variant flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> Oxygen XML
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-brand-surface-low border border-brand-outline-variant text-brand-on-surface-variant flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> Docs-as-Code
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-brand-surface-low border border-brand-outline-variant text-brand-on-surface-variant flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> Agentic AI Workflows
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-brand-surface-low border border-brand-outline-variant text-brand-on-surface-variant flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> Swagger (OpenAPI)
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-brand-surface-low border border-brand-outline-variant text-brand-on-surface-variant flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> SAFe Agile
                </span>
              </div>

            </div>

            {/* Right side (Profile Image Box) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative group">
                {/* Decorative neon glow background */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-primary via-indigo-500 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

                {/* Main image container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-brand-outline-variant bg-brand-surface-lowest shadow-2xl">
                  <img
                    src="/src/assets/images/prasanna_real_face_1783168769852.jpg"
                    alt="Prasanna Kumar Swain Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-500 transform hover:scale-105 filter contrast-[1.08] brightness-[1.01] saturate-[1.04]"
                  />
                  {/* Premium studio light refraction overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 pointer-events-none" />
                  {/* High-contrast professional portrait vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surface-lowest/80 via-transparent to-black/10 pointer-events-none" />

                  {/* Subtle caption block */}
                  <div className="absolute bottom-3 left-3 right-3 bg-brand-surface-lowest/80 backdrop-blur-md border border-brand-outline-variant/60 rounded-lg p-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-brand-on-surface">Bengaluru, India</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-brand-primary/25 text-brand-primary border border-brand-primary/35">Available for Consulting</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Metrics & Stats Grid */}
      <section className="bg-brand-surface-low border-y border-brand-outline-variant py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-1">
              {personalInfo.experienceYears}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-brand-outline">
              Years Experience
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-1">
              100%
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-brand-outline">
              Compliance Record
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-1">
              5+
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-brand-outline">
              Major Industries
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-1">
              LEAN
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-brand-outline">
              Process Champion
            </div>
          </div>
        </div>
      </section>

      {/* 4. About & Philosophy Section */}
      <section id="about" className="py-20 px-4 md:px-8 bg-brand-surface">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Bio text */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="text-xs font-mono text-brand-primary uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              Professional Philosophy
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface">
              Writing is a Structural Discipline, Not Just prose.
            </h2>
            <p className="font-sans text-brand-on-surface-variant text-base leading-relaxed">
              My technical writing methodology revolves around <strong>reusable, modular architecture</strong>. Instead of typing redundant user manuals, I design structural maps and structured XML topics (DITA) that can be instantly localized, repurposed, and published across PDF formats, embedded software portals, and digital assist portals.
            </p>
            <p className="font-sans text-brand-on-surface-variant text-base leading-relaxed">
              Throughout my tenure supporting medical devices at <strong>GE HealthCare</strong> and <strong>Philips</strong>, and diagnostic platforms like KloudFuse, I have bridged high-level engineering workflows (Kubernetes clusters, Prometheus diagnostics, cloud metrics/logs) with easy-to-use operator procedures.
            </p>
          </div>

          {/* Quick summary bento block */}
          <div className="lg:col-span-5 bg-brand-surface-low border border-brand-outline-variant rounded-3xl p-6 flex flex-col gap-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-brand-primary font-semibold">
              Primary Domains Covered
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="p-2 rounded bg-brand-surface-high border border-brand-outline-variant/60 text-brand-primary flex-shrink-0">
                  <HeartPulse size={16} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold font-serif text-brand-on-surface leading-snug">Healthcare & MedTech</h4>
                  <p className="text-xs text-brand-outline mt-0.5 leading-relaxed">GE HealthCare, Philips medical systems, EMR software compliance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 rounded bg-brand-surface-high border border-brand-outline-variant/60 text-brand-primary flex-shrink-0">
                  <Code size={16} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold font-serif text-brand-on-surface leading-snug">SaaS & Observability Pipelines</h4>
                  <p className="text-xs text-brand-outline mt-0.5 leading-relaxed">Kubernetes logging, telemetry, Prometheus dashboards, and Swagger APIs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 rounded bg-brand-surface-high border border-brand-outline-variant/60 text-brand-primary flex-shrink-0">
                  <GraduationCap size={16} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold font-serif text-brand-on-surface leading-snug">Aviation & Aerospace Engineering</h4>
                  <p className="text-xs text-brand-outline mt-0.5 leading-relaxed">Airbus A350/A380 aircraft maintenance manuals and illustrated catalogs.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Core Capabilities (Interactive tabs) */}
      <section id="skills" className="py-20 px-4 md:px-8 bg-brand-surface-low border-t border-brand-outline-variant">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col items-center text-center mb-12">
            <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              Taxonomy of Skills
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface mb-3">
              Specialized Expertise Stack
            </h2>
            <p className="text-brand-on-surface-variant max-w-xl text-sm leading-relaxed">
              Explore my technical tools, structural philosophies, and modern AI automation skill blocks categorized by disciplines.
            </p>
          </div>

          {/* Skills Browser Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Left selector menu */}
            <div className="md:col-span-4 flex flex-col gap-2 bg-brand-surface-medium p-3 rounded-3xl border border-brand-outline-variant">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id)}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeSkillCategory === cat.id
                      ? "bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary pl-3 font-semibold"
                      : "text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-high/50"
                  }`}
                >
                  <span className="text-xs font-mono tracking-wide">
                    {cat.title}
                  </span>
                  <ChevronRight size={14} className={activeSkillCategory === cat.id ? "text-brand-primary" : "text-brand-outline"} />
                </button>
              ))}
            </div>

            {/* Right skills list box */}
            <div className="md:col-span-8 bg-brand-surface border border-brand-outline-variant rounded-3xl p-6 min-h-[300px] flex flex-col justify-between">

              {/* Category Intro */}
              {skillCategories.filter(c => c.id === activeSkillCategory).map((cat) => (
                <div key={cat.id} className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-brand-on-surface mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-brand-on-surface-variant leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    {/* Skill items with indicators */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="bg-brand-surface-low border border-brand-outline-variant/60 p-3 rounded-lg flex flex-col gap-1">
                          <span className="text-xs font-mono font-medium text-brand-on-surface flex items-center justify-between">
                            {skill.name}
                            <span className="text-[10px] text-brand-outline">{skill.proficiency}%</span>
                          </span>
                          {/* Soft visual percentage line */}
                          <div className="w-full h-1 bg-brand-surface-high rounded-full overflow-hidden mt-1.5">
                            <div
                              className="h-full bg-brand-primary rounded-full transition-all duration-500"
                              style={{ width: `${skill.proficiency || 80}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Badges/Methodology Tags */}
                  {cat.tags && cat.tags.length > 0 && (
                    <div className="border-t border-brand-outline-variant/40 pt-4 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-brand-outline uppercase tracking-wider mr-1">Standards:</span>
                      {cat.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-surface-high border border-brand-outline-variant/80 text-brand-on-surface-variant">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* 5.5. Portfolio Showcase: Projects, Documents, and Code */}
      <ShowcaseSection />

      {/* 6. Chronological Work Timeline */}
      <WorkTimeline />

      {/* 7. Key Achievements Section */}
      <section id="achievements" className="py-20 px-4 md:px-8 bg-brand-surface-low border-t border-brand-outline-variant">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              Verified Impact
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface mb-3">
              Professional Milestones & Quality Actions
            </h2>
            <p className="text-brand-on-surface-variant max-w-xl mx-auto text-sm leading-relaxed">
              Key initiatives and awards representing high-performance standards in technical document publishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyAchievements.map((ach, idx) => {
              // Determine iconic accent for the specific achievement card
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              return (
                <div
                  key={idx}
                  className={`border rounded-3xl p-6 transition-all hover:border-brand-primary/40 ${
                    isFirst
                      ? "bg-brand-primary/5 border-brand-primary/30 md:col-span-2"
                      : "bg-brand-surface-medium border-brand-outline-variant"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`p-2.5 rounded-lg flex-shrink-0 ${
                      isFirst
                        ? "bg-brand-primary/20 text-brand-primary"
                        : isSecond
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-brand-surface-high text-brand-outline"
                    }`}>
                      {isFirst ? <Award size={20} /> : <CheckCircle2 size={18} />}
                    </span>
                    <div>
                      {isFirst && (
                        <span className="text-[9px] font-mono uppercase tracking-wider text-brand-primary block mb-1 font-semibold">
                          Award Winner • Philips Excellence
                        </span>
                      )}
                      <p className={`font-sans leading-relaxed text-brand-on-surface ${isFirst ? "text-base md:text-lg font-medium" : "text-sm"}`}>
                        {ach}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. Education & Certifications */}
      <section className="py-20 px-4 md:px-8 bg-brand-surface border-t border-brand-outline-variant">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col items-center text-center mb-12">
            <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              Credentials
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface">
              Education & Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationAndCertifications.map((edu, idx) => (
              <div key={idx} className="bg-brand-surface-low border border-brand-outline-variant rounded-3xl p-5 flex flex-col justify-between hover:border-brand-primary/30 transition-colors">
                <div>
                  <div className="p-2 rounded bg-brand-surface-high border border-brand-outline-variant text-brand-primary w-fit mb-4">
                    {edu.type === "formal" ? <BookOpen size={16} /> : <ShieldCheck size={16} />}
                  </div>

                  <h3 className="font-serif text-base font-semibold text-brand-on-surface leading-snug mb-1">
                    {edu.degreeOrName}
                  </h3>

                  <p className="text-xs font-mono text-brand-outline mb-3">
                    {edu.institution} {edu.period ? `| ${edu.period}` : ""}
                  </p>

                  {edu.description && (
                    <p className="text-xs text-brand-on-surface-variant font-sans leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>

                {edu.tags && edu.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-brand-outline-variant/30">
                    {edu.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-surface-medium border border-brand-outline-variant text-brand-outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Services Rendered */}
      <section id="services" className="py-20 px-4 md:px-8 bg-brand-surface-low border-t border-brand-outline-variant">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              Offerings
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface mb-3">
              Consulting & Strategy Capabilities
            </h2>
            <p className="text-brand-on-surface-variant max-w-xl mx-auto text-sm leading-relaxed">
              Available for full-time technical writer positions, custom single-sourcing consulting, or pipeline migration audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {servicesOffered.map((serv, idx) => (
              <div key={idx} className="bg-brand-surface-medium border border-brand-outline-variant/80 rounded-3xl p-5 flex flex-col justify-between hover:border-brand-primary/40 transition-all hover:scale-[1.01]">
                <div>
                  <div className="font-mono text-xs text-brand-primary mb-3">0{idx + 1}.</div>
                  <h3 className="font-serif text-base font-semibold text-brand-on-surface leading-snug mb-2">
                    {serv.title}
                  </h3>
                  <p className="text-xs font-sans text-brand-on-surface-variant leading-relaxed">
                    {serv.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. AI Documentation Co-Pilot Sandbox */}
      <AiSandbox />

      {/* 11. Contact & Channels */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-brand-surface border-t border-brand-outline-variant">
        <div className="max-w-5xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Direct Coordinates card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="text-xs font-mono text-brand-primary uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                Channels
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface">
                Initiate a Documentation Audit
              </h2>

              <p className="font-sans text-brand-on-surface-variant text-sm leading-relaxed">
                Whether you need to transition unstructured legacy manuals to clean DITA XML, establish high-performance OpenAPI standards for your developers, or build automation workflows, let's explore collaborating.
              </p>

              {/* Copy widgets */}
              <div className="flex flex-col gap-3 mt-4">

                {/* Email Copy Box */}
                <div className="bg-brand-surface-low border border-brand-outline-variant rounded-lg p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded bg-brand-surface-high border border-brand-outline-variant/60 text-brand-primary">
                      <Mail size={14} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Direct Mail</span>
                      <span className="text-xs font-mono text-brand-on-surface select-all">{personalInfo.email}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-2 rounded hover:bg-brand-surface-high border border-transparent hover:border-brand-outline-variant/60 text-brand-outline hover:text-brand-primary transition-all cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone Copy Box */}
                <div className="bg-brand-surface-low border border-brand-outline-variant rounded-lg p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded bg-brand-surface-high border border-brand-outline-variant/60 text-brand-primary">
                      <Phone size={14} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Call Coordinates</span>
                      <span className="text-xs font-mono text-brand-on-surface select-all">{personalInfo.phone}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="p-2 rounded hover:bg-brand-surface-high border border-transparent hover:border-brand-outline-variant/60 text-brand-outline hover:text-brand-primary transition-all cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* LinkedIn Badge */}
                <a
                  href="https://linkedin.com/in/prasanna-swain-639b2811"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-brand-surface-low border border-brand-outline-variant hover:border-brand-primary/40 rounded-lg p-3.5 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded bg-brand-surface-high border border-brand-outline-variant/60 text-brand-primary">
                      <Linkedin size={14} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Social Network</span>
                      <span className="text-xs font-mono text-brand-on-surface">linkedin.com/in/prasanna-swain-639b2811</span>
                    </div>
                  </div>
                  <span className="p-2 text-brand-outline group-hover:text-brand-primary transition-colors">
                    <ExternalLink size={14} />
                  </span>
                </a>

              </div>
            </div>

            {/* Structured Contact Form */}
            <div className="lg:col-span-7 bg-brand-surface-low border border-brand-outline-variant rounded-3xl p-6 md:p-8">
              <h3 className="font-serif text-xl font-medium text-brand-on-surface mb-6">
                Send a Message Securely
              </h3>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-3 text-sm focus:outline-none focus:border-brand-primary/80 text-brand-on-surface font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-3 text-sm focus:outline-none focus:border-brand-primary/80 text-brand-on-surface font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Proposal Summary</label>
                  <textarea
                    rows={4}
                    value={formState.msg}
                    onChange={(e) => setFormState({ ...formState, msg: e.target.value })}
                    placeholder="Describe your documentation systems, target tools, or contract scope..."
                    className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-3 text-sm focus:outline-none focus:border-brand-primary/80 text-brand-on-surface font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formState.name || !formState.email}
                  className={`w-full py-3.5 px-4 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSubmitting
                      ? "bg-brand-surface-high border border-brand-outline-variant text-brand-outline cursor-wait"
                      : "bg-brand-primary text-brand-on-primary hover:bg-brand-primary/95"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      Dispatching Message...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Transmit Message
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 border border-green-500/20 bg-green-500/5 rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} className="text-green-400" />
                      <span className="font-mono text-xs text-green-400">
                        Thank you! Your message was mock-submitted successfully. Prasanna Swains will respond shortly.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-brand-surface-lowest border-t border-brand-outline-variant py-12 px-4 md:px-8 text-center text-xs font-mono text-brand-outline">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-brand-on-surface font-semibold font-serif text-sm">Prasanna Kumar Swain</span>
            <span>Specialist Technical Writer & Information Architect</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#about" className="hover:text-brand-primary">About</a>
            <span>•</span>
            <a href="#experience" className="hover:text-brand-primary">Experience</a>
            <span>•</span>
            <a href="#ai-sandbox" className="hover:text-brand-primary">AI Co-Pilot</a>
          </div>
          <p className="text-[10px]">
            &copy; {new Date().getFullYear()} Prasanna Kumar Swain. Editorial Precision. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
