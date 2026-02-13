import { achievements } from '@/data/achievements';

export function Achievements() {
  return (
    <div className="relative">
      <div className="space-y-12">
        {achievements.map((achievement, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <div className="flex items-start gap-4">
                <span className="text-lg font-mono text-white/70 font-bold">{achievement.number}</span>
                <div>
                  <h3 className="text-2xl font-heading text-white mb-2">{achievement.title}</h3>
                  <p className="text-base text-white leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 md:border-l-3 md:border-white/10 md:pl-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-white/70">{achievement.type}</span>
                <span className="text-sm font-mono text-white/70">{achievement.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
