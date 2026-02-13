import { aboutContent } from '@/data/about';
import { skills } from '@/data/skills';

export function About() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-3xl font-heading text-purple-400 mb-4">OVERVIEW</h3>
        <div className="space-y-6 mb-6">
          {aboutContent.map((paragraph, index) => (
            <p key={index} className="text-sm text-white text-justify">
              {paragraph}
            </p>
          ))}
          <button className="mt-8 px-6 py-3 border border-white/20 hover:border-white/40 transition-colors text-sm font-mono tracking-widest">
            CHECKOUT MY RESUME
          </button>
        </div>
      </div>

      <div className="border-t border-white/20 pt-12">
        <h3 className="text-3xl font-heading text-purple-400 mb-8">EXPERTISE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="border-l border-white/20 pl-6">
              <h4 className="text-xl font-medium text-white mb-4 tracking-wide">{category}</h4>
              <ul className="space-y-2">
                {items.map((skill, i) => (
                  <li key={i} className="text-base text-white leading-relaxed">
                    • {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
