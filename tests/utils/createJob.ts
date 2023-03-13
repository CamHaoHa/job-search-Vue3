import type { Job } from "@/api/types";
export const createJob = (job: Partial<Job> = {}): Job => ({
  id: 1,
  title: "Angular Developer",
  organization: "Vue",
  degree: "Bachelor",
  jobType: "Intern",
  location: ["Sydney"],
  minimumQualifications: ["Mesh granular deliverables"],
  preferredQualifications: ["Mesh wireless metrics"],
  description: ["Awewoms"],
  dateAdded: "2021",
  ...job,
});
