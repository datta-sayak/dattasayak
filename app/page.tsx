"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { About } from '@/app/components/About';
import { WorkExperience } from '@/app/components/WorkExperience';
import { Projects } from '@/app/components/Projects';
import { Education } from '@/app/components/Education';
import { Achievements } from '@/app/components/Achievements';
import { MapPin, Briefcase } from 'lucide-react';
import { socialLinks } from '@/data/social';

type TabType = 'about' | 'experience' | 'projects' | 'achievements' | 'education';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const tabs = [
    { id: 'about' as TabType, label: 'About' },
    { id: 'experience' as TabType, label: 'Experience' },
    { id: 'projects' as TabType, label: 'Projects' },
    { id: 'achievements' as TabType, label: 'Achievements' },
    { id: 'education' as TabType, label: 'Education' },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-black text-white overflow-hidden relative"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(600px at ${x}px ${y}px, rgba(168, 85, 247, 0.15), transparent 80%)`
          ),
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-3 sm:px-6 py-4 sm:py-8 border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-3 sm:gap-8">
              <div className="flex-1">
                <h1 className="font-mono text-6xl mb-2">
                  Sayak Datta
                </h1>
                <p className="text-sm sm:text-lg text-gray-400 mb-3 sm:mb-4">
                  Computer Science Student
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>West Bengal, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Computer Science Student</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {socialLinks.map((obj) => (
                  <a
                    key={obj.alt}
                    href={obj.href}
                    rel="noopener noreferrer"
                    className="px-2 py-2 border border-white/10 hover:border-purple-400 rounded-lg"
                  >
                    <Image src={obj.src} alt={obj.alt} width={20} height={20} className="filter invert brightness-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex mt-8 -mb-4 sm:-mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2 py-2 sm:px-4 sm:py-4 text-sm sm:text-lg font-mono uppercase duration-200 border-b-2 ${
                    activeTab === tab.id 
                      ? 'text-purple-400 border-purple-400' 
                      : 'hover:text-purple-200 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 font-content">
            {activeTab === 'about' && <About />}
            {activeTab === 'experience' && <WorkExperience />}
            {activeTab === 'projects' && <Projects />}
            {activeTab === 'achievements' && <Achievements />}
            {activeTab === 'education' && <Education />}
          </div>
        </main>

        <footer className="border-t border-white/10 bg-black/10 py-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Sayak Datta
        </footer>
      </div>
    </motion.div>
  );
}
