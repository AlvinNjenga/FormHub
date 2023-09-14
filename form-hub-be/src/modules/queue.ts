import { Queue, Worker } from "bullmq";

const QUEUE_NAME = "default";
const connection = {
  host: process.env.REDIS_HOST,
};

export const queue = new Queue(QUEUE_NAME, { connection });

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    if (job.name === "generateSubmissions") {
      console.log("SHOULD GENERATE SUBMISSIONS");
    }
  },
  { connection }
);

export const enqueue = (jobName: string, data?: any) =>
  queue.add(jobName, data);
