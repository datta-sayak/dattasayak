import { education } from '@/data/education';

export function Education() {
  const validEducation = education.filter(
    (edu) =>
      edu.degree.trim() ||
      edu.institution.trim() ||
      edu.duration.trim() ||
      edu.gpa.trim() ||
      edu.coursework.length > 0
  );

  return (
    <div className="pb-10">
      <p className="section-kicker">Education</p>

      <div className="space-y-11">
        {validEducation.map((edu, index) => (
          <div key={index} className="grid grid-cols-1 gap-6">
            <div>
              <div className="flex items-start gap-3">
                <span className="pt-0.5 text-xs font-semibold tracking-[0.08em] text-[#8d98a8]">{edu.number}</span>
                <div>
                  <h3 className="text-lg leading-tight text-black">{edu.degree}</h3>
                  <p className="mt-1 text-sm text-[#273a52]">{edu.institution}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-[#8693a5] sm:text-xs">{edu.duration}</p>
                  <p className="mt-1 text-[11px] text-[#6f7e92] sm:text-xs">GPA: {edu.gpa}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
