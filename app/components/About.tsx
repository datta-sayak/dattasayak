"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { aboutContent } from '@/data/about';
import { skills } from '@/data/skills';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const skillIconMap: Record<string, string> = {
  Go: '/skills/go.svg',
  Python: '/skills/python.svg',
  TypeScript: '/skills/typescript.svg',
  JavaScript: '/skills/javascript.svg',
  Java: '/skills/java.svg',
  'C++': '/skills/cpp.svg',
  C: '/skills/c.svg',
  HTML: '/skills/html.svg',
  CSS: '/skills/css.svg',
  React: '/skills/react.svg',
  'Next.js': '/skills/nextjs.svg',
  'Tailwind CSS': '/skills/tailwind.svg',
  'Node.js': '/skills/nodejs.svg',
  Express: '/skills/express.svg',
  PostgreSQL: '/skills/postgress.svg',
  MongoDB: '/skills/mongodb.svg',
  Redis: '/skills/redis..svg',
  Docker: '/skills/docker.svg',
  Git: '/skills/git.svg',
  Linux: '/skills/linux.svg',
  Kubernetes: '/skills/kubernetes.svg',
  GCP: '/skills/gcp.svg',
};

const skillGroups = Object.keys(skills) as Array<keyof typeof skills>;

export function About() {
  const [isFullStackOpen, setIsFullStackOpen] = useState(true);

  const allTech = useMemo(() => {
    const tech = Object.values(skills).flat();
    return Array.from(new Set(tech)).filter((skill) => Boolean(skillIconMap[skill]));
  }, []);

  const toggleLabel = isFullStackOpen ? 'View Full Stack' : 'Show Less';
  const toggleIcon = isFullStackOpen ? (
    <ChevronDown className="h-3 w-3" />
  ) : (
    <ChevronUp className="h-3 w-3" />
  );

  const handleToggleFullStack = () => {
    setIsFullStackOpen((prev) => !prev);
  };

  return (
    <div className="pb-10">
      <div className="mb-8">
        <p className="section-kicker">About</p>
        <div className="space-y-5">
          {aboutContent.map((paragraph, index) => (
            <p key={index} className="max-w-4xl leading-[1.4] text-[#33465f] sm:text-base">
              {paragraph}
            </p>
          ))}

          <button className="mt-4 inline-flex rounded-full border border-[#b7c1ce] px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#4f6077] transition-colors hover:border-[#8f9fb4] hover:text-[#23344c]">
            CHECKOUT MY RESUME
          </button>
        </div>
      </div>

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
                const iconSrc = skillIconMap[skill];

                if (!iconSrc) {
                  return null;
                }

                return (
                  <div key={`${skill}-${i}`} className="flex h-12 w-12 items-center justify-center text-[#536883]" title={skill}>
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
                  {skills[category].map((skill) => {
                    const iconSrc = skillIconMap[skill];

                    if (!iconSrc) {
                      return null;
                    }

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
    </div>
  );
}
