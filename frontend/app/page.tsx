"use client";

import { useState } from "react";
import { useResumeData } from "./hooks/useResumeData";
import ResumePreview from "./components/ResumePreview";

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#EDF9FF] flex items-center justify-center p-12">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 space-y-8">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
            AI Resume Builder
          </span>
          <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">
            Build a Resume That Gets Results.
          </h1>
          <p className="text-xl leading-relaxed text-slate-600">
            Create professional, ATS-optimized resumes in minutes.
          </p>
          <button
            onClick={onStart}
            className="rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-blue-100 transition-transform hover:scale-105 hover:bg-blue-700"
          >
            Create My Resume
          </button>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative rotate-3 transition-transform duration-500 hover:rotate-0">
            <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-10 shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 w-1/2 rounded bg-slate-800" />
                  <div className="h-4 w-1/3 rounded bg-slate-200" />
                </div>
              </div>
              <div className="space-y-4 border-t pt-6">
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-4/5 rounded bg-slate-100" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "modern" | "tech" | "classic"
  >("modern");

  const { formData, handleChange } = useResumeData();

  if (!isStarted) return <LandingPage onStart={() => setIsStarted(true)} />;

  const templates = [
    { id: "modern", name: "Modern" },
    { id: "tech", name: "Tech" },
    { id: "classic", name: "Classic" },
  ] as const;

  const downloadPDF = async () => {
  const element = document.getElementById("resume-preview");
  if (!element) return;

  const html2canvas = (await import("html2canvas-pro")).default;
  const jsPDF = (await import("jspdf")).jsPDF;

  const canvas = await html2canvas(element as HTMLElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("Resume.pdf");
};

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="w-full lg:w-[420px] lg:shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900">
              Resume Builder
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create a polished CV step by step
            </p>
            <div className="mt-5 flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    currentStep >= step ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Template
            </label>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    selectedTemplate === t.id
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {currentStep === 1 && (
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Full Name"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Email"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Phone"
                  />
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Location"
                  />
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Professional Summary
                </h3>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="builder-input min-h-40 resize-none"
                  placeholder="Write a short, strong summary..."
                />
              </section>
            )}

            {currentStep === 3 && (
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Work Experience
                </h3>
                <div className="space-y-3">
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Job Title"
                  />
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Company"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="builder-input"
                      placeholder="Start"
                    />
                    <input
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="builder-input"
                      placeholder="End"
                    />
                  </div>
                  <textarea
                    name="expDesc"
                    value={formData.expDesc}
                    onChange={handleChange}
                    className="builder-input min-h-28 resize-none"
                    placeholder="Describe responsibilities and achievements..."
                  />
                </div>
              </section>
            )}

            {currentStep === 4 && (
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Education
                </h3>
                <div className="space-y-3">
                  <input
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="School Name"
                  />
                  <input
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Degree"
                  />
                  <input
                    name="gradDate"
                    value={formData.gradDate}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Graduation Date"
                  />
                </div>
              </section>
            )}

            {currentStep === 5 && (
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Skills
                </h3>
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="builder-input"
                  placeholder="React, TypeScript, UI Design..."
                />
              </section>
            )}

            {currentStep === 6 && (
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Additional
                </h3>
                <div className="space-y-3">
                  <input
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Languages"
                  />
                  <input
                    name="awards"
                    value={formData.awards}
                    onChange={handleChange}
                    className="builder-input"
                    placeholder="Certifications / Awards"
                  />
                </div>
              </section>
            )}

            <div className="flex gap-3 pt-2">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex-1 rounded-xl border border-slate-300 bg-white py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back
                </button>
              )}
              {currentStep < 6 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="flex-1 rounded-xl bg-slate-900 py-3.5 font-semibold text-white transition hover:bg-slate-800"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={downloadPDF}
                  className="flex-1 rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Download PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="sticky top-6 flex justify-center">
          <ResumePreview data={formData} template={selectedTemplate} />
        </div>
      </main>

      <style jsx global>{`
        .builder-input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid rgb(203 213 225);
          background: white;
          padding: 0.875rem 1rem;
          font-size: 0.95rem;
          color: rgb(15 23 42);
          outline: none;
          transition: all 0.2s ease;
        }
        .builder-input::placeholder {
          color: rgb(148 163 184);
        }
        .builder-input:focus {
          border-color: rgb(59 130 246);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
        }
      `}</style>
    </div>
  );
}