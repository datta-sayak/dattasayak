"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { About } from '@/app/components/About';
import { WorkExperience } from '@/app/components/WorkExperience';
import { Projects } from '@/app/components/Projects';
import { Education } from '@/app/components/Education';
import { Achievements } from '@/app/components/Achievements';
import { GitHubCalendar } from '@/app/components/GitHubCalendar';
import { useTheme } from '@/app/context/ThemeContext';
import { socialLinks } from '@/data/social';

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  const sections = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'achievements', label: 'Achievements' },
      { id: 'education', label: 'Education' },
      { id: 'github-calendar', label: 'GitHub' },
    ],
    []
  );

  return (
    <div className="relative min-h-screen pb-28">
      <button
        type="button"
        role="switch"
        aria-checked={isDarkMode}
        onClick={toggleTheme}
        className={`fixed top-8 right-7 z-50 inline-flex h-6 w-12 items-center rounded-full border transition-colors sm:right-12 lg:right-24 ${
          isDarkMode ? 'border-white/20 bg-black' : 'border-[#c5ccd4] bg-white'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full transition-transform ${
            isDarkMode ? 'translate-x-6.5 bg-white' : 'translate-x-1 bg-black'
          }`}
        />
      </button>

      <main className="mx-auto w-full max-w-[54rem] px-7 pb-10 pt-8 sm:px-12 lg:px-24">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="section-divider border-b pb-2"
        >

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex gap-6 items-end md:gap-8">
              <div className="flex-shrink-0">
                <Image
                  src="/potrait.jpg"
                  alt="Sayak Datta Portrait"
                  width={120}
                  height={120}
                  className="rounded-lg object-cover w-24 h-24 sm:w-32 sm:h-32"
                  priority
                />
              </div>
              <div>
                <h1 className="font-vt323 text-5xl sm:text-7xl">Sayak Datta</h1>
                <p className="mt-2 text-xs text-[#5e6d80] sm:text-sm">Computer Science Student</p>
              </div>
            </div>
          </div>

          <nav className="hidden sm:flex w-full justify-center flex-wrap gap-x-8 text-[11px] uppercase tracking-[0.11em] text-[#7d8999] sm:text-xs">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="transition-colors hover:text-[#1d2a3a]">
                {section.label}
              </a>
            ))}
          </nav>
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
          <motion.section id="about" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <About />
          </motion.section>

          <motion.section id="experience" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <WorkExperience />
          </motion.section>

          <motion.section id="projects" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <Projects />
          </motion.section>

          <motion.section id="achievements" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <Achievements />
          </motion.section>

          <motion.section id="education" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
            <Education />
          </motion.section>
        </motion.div>

        <motion.section
          id="github-calendar"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          className="space-y-4 pt-14"
        >
          <div>
            <p className="section-kicker">Github Contributions</p>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <div>
              <GitHubCalendar username="datta-sayak" />
            </div>
          </div>
        </motion.section>

        <footer className="pt-6 text-[11px] text-[#7d8999] sm:text-xs">
          &copy; {new Date().getFullYear()} Sayak Datta
        </footer>
      </main>

      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur-[14px] border border-[rgba(153,166,184,0.45)] bg-[rgba(245,247,250,0.9)] shadow-[0_12px_30px_rgba(46,63,82,0.16)] sm:gap-2 sm:px-3">
          {socialLinks.map((obj) => {
            const hasHref = obj.href.trim().length > 0;

            return (
              <a
                key={obj.alt}
                href={hasHref ? obj.href : undefined}
                target={hasHref ? '_blank' : undefined}
                rel={hasHref ? 'noopener noreferrer' : undefined}
                aria-label={obj.alt}
                className={`rounded-full border border-transparent p-2 transition-all duration-200 ${
                  hasHref
                    ? 'hover:-translate-y-0.5 hover:border-[#9fabbc] hover:bg-white/85'
                    : 'pointer-events-none opacity-40'
                }`}
              >
                <Image src={obj.src} alt={obj.alt} width={18} height={18} className="opacity-75" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
