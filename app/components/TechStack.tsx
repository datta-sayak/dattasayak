"use client";

import { skills } from "@/data/skills";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/kibo-ui/marquee";

const skillGroups = Object.keys(skills) as Array<keyof typeof skills>;

const skillIconLookup = Object.values(skills).reduce((obj, category) => {
  Object.entries(category).map(([skill, iconName]) => {
    obj[skill] = iconName;
  });
  return obj;
}, {} as Record<string, string>);


export function TechStack() {
  const [isFullStackOpen, setIsFullStackOpen] = useState(true);
  const allTech = Object.keys(skillIconLookup);

  return (
    <div className="pt-8">
        <p className="section-kicker">Tech Stack</p>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setIsFullStackOpen(!isFullStackOpen)}
            aria-expanded={isFullStackOpen}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 transition-colors hover:text-black"
          >
            {isFullStackOpen ? 'View Full Stack' : 'Show Less'}
            {isFullStackOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isFullStackOpen ? (
            <motion.div
              key="carousel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative mt-7 overflow-hidden py-5"
            >
            <Marquee>
              <MarqueeContent>
                {[...allTech, ...allTech].map((skill, i) => {
                  const iconSrc = `/skills/${skillIconLookup[skill]}.svg`;
                  return (
                    <MarqueeItem 
                      key={skill+i} 
                      className="flex h-12 w-12 items-center justify-center text-black" 
                      title={skill}>
                      <Image 
                        src={iconSrc} 
                        alt={skill} 
                        width={30} 
                        height={30} 
                        className="h-6 w-6 sm:h-10 sm:w-10 grayscale object-contain" 
                      />
                    </MarqueeItem>
                  );
                })}
              </MarqueeContent>
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
            </Marquee>
          </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-3"
            >
              {skillGroups.map((category) => (
                <div key={category} className="pl-3">
                  <h4 className="border-b border-black/20 pb-2 text-sm font-bold uppercase tracking-widest text-black/50">
                    {category}
                  </h4>
                  <ul className="mt-5 space-y-4 pl-1">
                    {Object.entries(skills[category]).map(([skill, iconName]) => {
                      const iconSrc = `/skills/${iconName}.svg`;

                      return (
                        <li key={skill} className="flex items-center gap-3 text-xs text-black/60 transition-all hover:text-black hover:text-extrabold">
                          <Image src={iconSrc} alt={skill} width={24} height={24} className="h-6 w-6 object-contain" />
                          <span>{skill}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  )
}