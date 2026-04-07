import { experiences } from '@/data/experience';

export function WorkExperience() {

  return (
    <div className="pb-10">
      <p className="section-kicker">Experience</p>

      <div className="space-y-11">
        {experiences.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 gap-6">
            <div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 justify-between">
                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-black opacity-40">{exp.number}</span>
                    <div>
                      <h3 className="text-lg leading-tight text-black">{exp.position}</h3>
                      <p className="mt-1 text-sm font-bold text-black opacity-60 sm:text-xs">{exp.location}</p>
                      <p className="mt-2 text-sm font-bold uppercase tracking-wide text-black opacity-60 sm:text-xs">{exp.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-black text-right break-words">{exp.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
