import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import crypto from "crypto";

import config from "./config";
import errorHandler from "./middleware/errorHandler";
import fourOhFour from "./middleware/fourOhFour";
import root from "./routes/root";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: ["query", "info", "warn", "error"] });

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

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // @ts-ignore no-implicit-any
    origin: config.clientCorsOrigins[config.nodeEnv] ?? "*",
  })
);

app.use(helmet());
app.use(morgan("dev"));

// Apply routes before error handling
app.use("/root", root);
app.get("/", async (req, res) => {
  const submissions = await db.submission.findMany();
  res.json(submissions);
});

// Apply error handling last
app.use(fourOhFour);
app.use(errorHandler);

export default app;
