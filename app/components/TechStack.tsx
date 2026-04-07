"use client";

import { skills } from "@/data/skills";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useMemo, useState } from "react";

const skillGroups = Object.keys(skills) as Array<keyof typeof skills>;

const skillIconLookup = Object.values(skills).reduce((obj, category) => {
  Object.entries(category).map(([skill, iconName]) => {
    obj[skill] = iconName;
  });
  return obj;
}, {} as Record<string, string>);


export function TechStack() {
  const [isFullStackOpen, setIsFullStackOpen] = useState(true);

  const toggleLabel = isFullStackOpen ? 'View Full Stack' : 'Show Less';
  const allTech = useMemo(() => Object.keys(skillIconLookup), []);
  
  const toggleIcon = isFullStackOpen ? (
    <ChevronDown className="h-3 w-3" />
  ) : (
    <ChevronUp className="h-3 w-3" />
  );

  const handleToggleFullStack = () => {
    setIsFullStackOpen((prev) => !prev);
  };

  return (
    <div className="pt-8">
        <p className="section-kicker">Tech Stack</p>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleToggleFullStack}
            aria-expanded={isFullStackOpen}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a97a8] transition-colors hover:text-[#5e6e84]"
          >
            {toggleLabel}
            {toggleIcon}
          </button>
        </div>

        {isFullStackOpen ? (
          <div className="relative mt-7 overflow-hidden py-5">
            <motion.div
              className="flex w-max items-center sm:gap-12 px-2"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            >
              {[...allTech, ...allTech].map((skill, i) => {
                const iconSrc = `/skills/${skillIconLookup[skill]}.svg`;

                return (
                  <div key={`${skill}-${i}`} className="flex h-12 w-12 items-center justify-center text-black" title={skill}>
                    <Image src={iconSrc} alt={skill} width={30} height={30} className="h-6 w-6 sm:h-10 sm:w-10 object-contain" />
                  </div>
                );
              })}
            </motion.div>

            <div className="skills-edge-left pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/85 to-transparent" />
            <div className="skills-edge-right pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/85 to-transparent" />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-3">
            {skillGroups.map((category) => (
              <div key={category} className="pl-3">
                <h4 className="border-b border-[#edf1f5] pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a97a8]">
                  {category}
                </h4>
                <ul className="mt-5 space-y-4 pl-1">
                  {Object.entries(skills[category]).map(([skill, iconName]) => {
                    const iconSrc = `/skills/${iconName}.svg`;

                    return (
                      <li key={skill} className="flex items-center gap-3 text-xs text-[#4a6078] transition-all hover:text-black hover:text-bold">
                        <Image src={iconSrc} alt={skill} width={24} height={24} className="h-6 w-6 object-contain" />
                        <span>{skill}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
  )
}