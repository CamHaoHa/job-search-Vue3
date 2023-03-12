import type { Job } from "@/api/types";
const state1: Job = {};
const state2: Partial<Job> = {};
const state3: Partial<Job> = { organization: "teslsa" };
const invalidState: Partial<Job> = { abx: "abx" };
