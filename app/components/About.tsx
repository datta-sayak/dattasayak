"use client";

import { aboutContent } from '@/data/about';

export function About() {
  

  return (
    <div className="pb-10">
      <div className="mb-8">
        <p className="section-kicker">About</p>
        <div className="space-y-5">
          {aboutContent.map((paragraph, index) => (
            <p key={index} className="text-base font-light  text-black opacity-80 sm:text-lg">
              {paragraph}
            </p>
          ))}

          <button className="mt-4 inline-flex rounded-full border border-[#b7c1ce] px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#4f6077] transition-colors hover:border-[#8f9fb4] hover:text-[#23344c]">
            CHECKOUT MY RESUME
          </button>
        </div>
      </div>

    </div>
  );
}
