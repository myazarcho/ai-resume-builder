"use client";

import type { ResumeFormData } from "../hooks/useResumeData";

type Template = "modern" | "tech" | "classic";

const defaultData: ResumeFormData = {
  name: "James Wilson",
  email: "james.wilson@example.com",
  phone: "+1 (555) 123-4567",
  address: "San Francisco, CA",
  summary:
    "Senior Product Designer with 7+ years of experience creating user-centered digital products for SaaS and e-commerce platforms.",
  jobTitle: "Senior Product Designer",
  company: "TechFlow Inc.",
  startDate: "Jan 2020",
  endDate: "Present",
  expDesc:
    "Led the end-to-end UI/UX design for a SaaS analytics dashboard used by 50,000+ monthly active users. Collaborated closely with product and engineering teams to translate business requirements into intuitive interfaces.",
  school: "University of California",
  degree: "B.A. in Design",
  gradDate: "2016",
  skills: "Figma, Adobe XD, User Research, Usability Testing, Prototyping",
  languages: "English (Native), Japanese (Intermediate)",
  awards: "Certified UX Designer, Advanced Figma Specialist",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Pills({ value }: { value?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => (
          <span
            key={item}
            className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
          >
            {item}
          </span>
        ))}
    </div>
  );
}

function ModernTemplate({ data }: { data: ResumeFormData }) {
  return (
    <div className="p-10 md:p-14">
      <div className="flex gap-6 border-b border-slate-200 pb-6">
        <div className="h-24 w-24 shrink-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-300" />
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            {data.name}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {data.email} · {data.phone} · {data.address}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
            {data.summary}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 space-y-8 md:col-span-7">
          <Section title="Work Experience">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {data.jobTitle}
                  </p>
                  <p className="text-sm text-slate-600">{data.company}</p>
                </div>
                <p className="whitespace-nowrap text-xs text-slate-500">
                  {data.startDate} - {data.endDate}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {data.expDesc}
              </p>
            </div>
          </Section>

          <Section title="Education">
            <p className="text-sm font-medium text-slate-900">
              {data.degree}, {data.school}
            </p>
            <p className="text-sm text-slate-600">{data.gradDate}</p>
          </Section>
        </div>

        <div className="col-span-12 space-y-8 md:col-span-5">
          <Section title="Skills">
            <Pills value={data.skills} />
          </Section>

          <Section title="Certifications">
            <p className="text-sm text-slate-700">{data.awards}</p>
          </Section>

          <Section title="Languages">
            <p className="text-sm text-slate-700">{data.languages}</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function TechTemplate({ data }: { data: ResumeFormData }) {
  return (
    <div className="grid min-h-[297mm] grid-cols-12">
      <aside className="col-span-12 bg-slate-950 p-10 text-white md:col-span-4">
        <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/10" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          {data.name}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {data.email}
          <br />
          {data.phone}
          <br />
          {data.address}
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Skills
            </h3>
            <Pills value={data.skills} />
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Languages
            </h3>
            <p className="text-sm text-slate-200">{data.languages}</p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Certifications
            </h3>
            <p className="text-sm text-slate-200">{data.awards}</p>
          </div>
        </div>
      </aside>

      <section className="col-span-12 p-10 md:col-span-8 md:p-14">
        <div className="border-b border-slate-200 pb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Professional Summary
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">{data.summary}</p>
        </div>

        <div className="mt-8 space-y-8">
          <Section title="Work Experience">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {data.jobTitle}
                  </p>
                  <p className="text-sm text-slate-600">{data.company}</p>
                </div>
                <p className="whitespace-nowrap text-xs text-slate-500">
                  {data.startDate} - {data.endDate}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {data.expDesc}
              </p>
            </div>
          </Section>

          <Section title="Education">
            <p className="text-sm font-medium text-slate-900">
              {data.degree}, {data.school}
            </p>
            <p className="text-sm text-slate-600">{data.gradDate}</p>
          </Section>
        </div>
      </section>
    </div>
  );
}

function ClassicTemplate({ data }: { data: ResumeFormData }) {
  return (
    <div className="p-12">
      <div className="border-b-2 border-slate-900 pb-6 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-slate-200" />
        <h1 className="mt-4 text-3xl font-bold text-slate-900">{data.name}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {data.email} · {data.phone} · {data.address}
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <Section title="Summary">
          <p className="text-sm leading-6 text-slate-700">{data.summary}</p>
        </Section>

        <Section title="Experience">
          <p className="font-semibold text-slate-900">{data.jobTitle}</p>
          <p className="text-sm text-slate-600">
            {data.company} · {data.startDate} - {data.endDate}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {data.expDesc}
          </p>
        </Section>

        <Section title="Education">
          <p className="text-sm font-medium text-slate-900">
            {data.degree}, {data.school}
          </p>
          <p className="text-sm text-slate-600">{data.gradDate}</p>
        </Section>

        <Section title="Skills">
          <p className="text-sm text-slate-700">{data.skills}</p>
        </Section>

        <Section title="Certifications">
          <p className="text-sm text-slate-700">{data.awards}</p>
        </Section>

        <Section title="Languages">
          <p className="text-sm text-slate-700">{data.languages}</p>
        </Section>
      </div>
    </div>
  );
}

export default function ResumePreview({
  data,
  template,
}: {
  data: ResumeFormData;
  template: "modern" | "tech" | "classic";
}) {
  const merged = { ...defaultData, ...data };

  return (
    <div
      id="resume-preview"
      className="w-[210mm] min-h-[297mm] overflow-hidden bg-white shadow-2xl transition-all duration-300"
    >
      {template === "modern" && <ModernTemplate data={merged} />}
      {template === "tech" && <TechTemplate data={merged} />}
      {template === "classic" && <ClassicTemplate data={merged} />}
    </div>
  );
}