import { achievements } from '@/data/achievements';

export function Achievements() {
  const validAchievements = achievements.filter(
    (achievement) =>
      achievement.title.trim() ||
      achievement.description.trim() ||
      achievement.type.trim() ||
      achievement.date.trim()
  );

  return (
    <div className="pb-10">
      <p className="section-kicker">Achievements</p>

      <div className="space-y-8">
        {validAchievements.map((achievement, index) => (
          <div key={index} className="group grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-9">
            <div className="md:col-span-8">
              <div className="flex items-start gap-3">
                <span className="pt-1 text-xs font-semibold text-black opacity-40">{achievement.number}</span>
                <div>
                  <h3 className="text-lg text-black">{achievement.title}</h3>
                  <p className="mt-1 text-xs font-normal text-black/60 sm:text-sm">{achievement.description}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex items-stretch">
              <div className="w-full flex flex-col items-end gap-1 pr-2 text-sm text-black border-r-2 border-black/15 group-hover:border-black pl-4 transition-colors">
                <span>{achievement.type}</span>
                <span>{achievement.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
