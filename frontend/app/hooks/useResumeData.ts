"use client";

import { useState } from "react";

export type ResumeFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  expDesc: string;
  school: string;
  degree: string;
  gradDate: string;
  skills: string;
  languages: string;
  awards: string;
};

export function useResumeData() {
  const [formData, setFormData] = useState<ResumeFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    expDesc: "",
    school: "",
    degree: "",
    gradDate: "",
    skills: "",
    languages: "",
    awards: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { formData, handleChange, setFormData };
}