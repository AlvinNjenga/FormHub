import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: ["query", "info", "warn", "error"] });
export default db;

const seedDatabase = async () => {
  if ((await db.submission.count()) === 0) {
    await db.submission.createMany({
      data: [
        {
          id: crypto.randomUUID(),
          submittedAt: new Date(),
          data: {
            name: "John Doe",
            twitter: "@johndoe",
          },
        },
      ],
    });
  }
};

seedDatabase();
