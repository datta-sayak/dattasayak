"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { About } from '@/app/components/About';
import { WorkExperience } from '@/app/components/WorkExperience';
import { Projects } from '@/app/components/Projects';
import { Education } from '@/app/components/Education';
import { Achievements } from '@/app/components/Achievements';
import { useTheme } from '@/app/context/ThemeContext';
import { socialLinks } from '@/data/social';
import { TechStack } from './components/TechStack';
import { Timer } from './components/Timer';
import dynamic from "next/dynamic";
import { ThemeToggleButton } from '@/components/ui/skiper-ui/skiper26';

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then(
      (mod) => mod.GitHubCalendar
    ),
  {
    ssr: false,
  }
);

export type Activity = {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
};

export default function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative min-h-screen pb-28">
      <ThemeToggleButton
        variant="circle"
        start="top-right"
        blur
        className="fixed top-7 right-6 z-50 sm:right-8"
      />

      <main className="mx-auto w-full max-w-[54rem] px-7 pb-10 pt-8 sm:px-12 lg:px-24">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-center">
            <div className="flex flex-col items-center gap-6 text-center md:gap-8">
              <div>
                <h1 className="font-vt323 font-bold text-5xl sm:text-7xl uppercase tracking-widest">
                  Sayak Datta
                </h1>
                <div className="mt-2 flex items-center justify-center gap-3 text-xs text-black/60 sm:text-sm">
                  <p>Computer Science Student</p>
                  <span className="size-1.5 rounded-full bg-current" />
                  <Timer />
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.09,
              },
            },
          }}
          className="space-y-14 py-10"
        >
          <motion.section id="About" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <About />
          </motion.section>

          <motion.section id="Techstack" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <TechStack />
          </motion.section>

          <motion.section id="Experience" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <WorkExperience />
          </motion.section>

          <motion.section id="Projects" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <Projects />
          </motion.section>

          <motion.section id="Achievements" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <Achievements />
          </motion.section>

          <motion.section id="Education" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <Education />
          </motion.section>
        </motion.div>

        <motion.section
          id="Contributions"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          className="relative left-1/2 -translate-x-1/2 w-[100vw] max-w-[100vw] px-4 sm:px-8 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <div className="flex justify-center min-w-max">
              <div>
                <p className="section-kicker mb-4 ml-3 lg:ml-8">
                  Github Contributions
                </p>
                <GitHubCalendar
                  username="datta-sayak"
                  colorScheme={isDarkMode ? "dark" : "light"}
                  blockSize={10}
                  blockMargin={4}
                  fontSize={12}
                />
              </div>
            </div>
          </div>
        </motion.section>

        <h1 className="pt-20 text-center text-xs font-bold text-black">
          &copy; {new Date().getFullYear()} Sayak Datta
        </h1>
      </main>

      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
        <div className={`flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur-[14px] border transition-colors ${
          isDarkMode
            ? 'border-[rgba(255,255,255,0.2)] bg-[rgba(20,20,20,0.9)] shadow-[0_12px_30px_rgba(0,0,0,0.4)]'
            : 'border-[rgba(153,166,184,0.45)] bg-[rgba(245,247,250,0.9)] shadow-[0_12px_30px_rgba(46,63,82,0.16)]'
        } sm:gap-2 sm:px-3`}>
          {socialLinks.map((obj) => {
            const hasHref = obj.href.trim().length > 0;

            return (
              <a
                key={obj.alt}
                href={hasHref ? obj.href : undefined}
                target={hasHref ? '_blank' : undefined}
                rel={hasHref ? 'noopener noreferrer' : undefined}
                aria-label={obj.alt}
                className={`rounded-full p-2 transition-all duration-200 ${
                  hasHref
                    ? 'hover:-translate-y-0.5'
                    : 'pointer-events-none'
                }`}
              >
                <Image 
                  src={obj.src}
                  alt={obj.alt}
                  priority 
                  width={18} 
                  height={18} 
                  className={isDarkMode ? 'invert' : ''} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
