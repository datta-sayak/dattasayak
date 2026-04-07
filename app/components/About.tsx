"use client";

import { aboutContent } from '@/data/about';

export function About() {
  

  return (
    <div className="pb-10">
      <div className="mb-8">
        <p className="section-kicker">About</p>
        <div className="space-y-5">
          {aboutContent.map((paragraph, index) => (
            <p key={index} className="text-base font-light text-black opacity-80 sm:text-lg">
              {paragraph}
            </p>
          ))}

          <button className="mt-4 inline-flex rounded-full border border-black/25 px-5 py-2 text-[0.62rem] font-semibold uppercase text-black/60 transition-colors hover:border-black/45 hover:text-black">
            CHECKOUT MY RESUME
          </button>
        </div>
      </div>

    </div>
  );
}
