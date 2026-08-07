import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase, Calendar, MapPin, Building, ChevronDown,
  ChevronUp, CheckCircle, ExternalLink, Filter, HelpCircle
} from "lucide-react";
import { workExperiences } from "../data";

const DOMAINS = [
  { id: "all", label: "All Industries" },
  { id: "healthcare", label: "Healthcare & Life Sciences" },
  { id: "software", label: "Software & Cloud Tech" },
  { id: "banking", label: "FinTech & Banking" },
  { id: "aerospace", label: "Aerospace & Aviation" },
];

export const WorkTimeline: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [expandedIds, setExpandedIds] = useState<string[]>(["exp1", "exp5"]); // Default open the GE Healthcare current and lead roles

  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const filteredExperiences = useMemo(() => {
    if (selectedDomain === "all") return workExperiences;

    return workExperiences.filter((exp) => {
      const domainLower = (exp.domain || "").toLowerCase();
      const tagsLower = exp.tags.map(t => t.toLowerCase());

      if (selectedDomain === "healthcare") {
        return domainLower.includes("healthcare") || domainLower.includes("medical");
      }
      if (selectedDomain === "software") {
        return domainLower.includes("software") || tagsLower.includes("kubernetes") || tagsLower.includes("aws");
      }
      if (selectedDomain === "banking") {
        return domainLower.includes("banking") || domainLower.includes("fintech") || domainLower.includes("financial");
      }
      if (selectedDomain === "aerospace") {
        return domainLower.includes("aerospace") || domainLower.includes("aviation");
      }
      return true;
    });
  }, [selectedDomain]);

  return (
    <div id="experience" className="py-20 px-4 md:px-8 bg-brand-surface border-t border-brand-outline-variant">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              Chronological Path
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface">
              10+ Years of Professional Milestones
            </h2>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-brand-outline flex items-center gap-1 mr-1">
              <Filter size={12} /> Filter:
            </span>
            {DOMAINS.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                  selectedDomain === domain.id
                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                    : "bg-brand-surface-low border-brand-outline-variant text-brand-on-surface-variant hover:text-brand-on-surface hover:border-brand-outline/30"
                }`}
              >
                {domain.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative pl-6 md:pl-8 border-l border-brand-outline-variant/60 ml-3 md:ml-4 flex flex-col gap-10">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp, index) => {
              const isExpanded = expandedIds.includes(exp.id);
              return (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Timeline node icon */}
                  <span className={`absolute -left-[35px] md:-left-[43px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    exp.isCurrent
                      ? "bg-brand-primary border-brand-primary text-brand-on-primary animate-pulse"
                      : "bg-brand-surface-medium border-brand-outline-variant text-brand-outline"
                  }`}>
                    <Briefcase size={12} />
                  </span>

                  {/* Header metadata row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div className="flex items-start md:items-center gap-2 flex-wrap">
                      <h3 className="font-serif text-lg md:text-xl font-medium text-brand-on-surface">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] font-mono uppercase font-semibold">
                          Active
                        </span>
                      )}
                      {exp.isLead && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[10px] font-mono uppercase font-semibold">
                          Lead Writer
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-brand-outline">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {exp.period}
                      </span>
                      {exp.location && (
                        <span className="hidden sm:flex items-center gap-1">
                          <MapPin size={12} /> {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company info bar */}
                  <div className="flex items-center gap-2 text-sm text-brand-on-surface-variant font-medium mb-3 flex-wrap">
                    <span className="flex items-center gap-1.5 font-sans">
                      <Building size={14} className="text-brand-outline" /> {exp.company}
                    </span>
                    {exp.client && (
                      <>
                        <span className="text-brand-outline-variant">•</span>
                        <span className="text-xs bg-brand-surface-high border border-brand-outline-variant px-2 py-0.5 rounded text-brand-on-surface-variant">
                          Client: <strong className="text-brand-on-surface">{exp.client}</strong>
                        </span>
                      </>
                    )}
                    {exp.domain && (
                      <>
                        <span className="text-brand-outline-variant">•</span>
                        <span className="text-xs text-brand-outline italic font-mono">{exp.domain}</span>
                      </>
                    )}
                  </div>

                  {/* Expandable Box */}
                  <div className="bg-brand-surface-low border border-brand-outline-variant rounded-xl overflow-hidden transition-all duration-200">
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-brand-surface-medium/50 transition-colors text-xs font-mono text-brand-on-surface-variant cursor-pointer"
                    >
                      <span>
                        {isExpanded ? "Collapse contribution specifics" : "Expand contribution specifics"}
                      </span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-brand-outline-variant/45"
                        >
                          <div className="p-5 flex flex-col gap-3.5">
                            <ul className="flex flex-col gap-2.5">
                              {exp.bulletPoints.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2 text-sm leading-relaxed text-brand-on-surface-variant">
                                  <span className="text-brand-primary mt-1.5 flex-shrink-0">•</span>
                                  <span className="font-sans text-brand-on-surface-variant">{bullet}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Tag badges row */}
                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-outline-variant/30">
                              {exp.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-surface-medium border border-brand-outline-variant text-brand-on-surface hover:text-brand-primary hover:border-brand-primary transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
