import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import db from "./modules/db";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const app = express();
const httpServer = http.createServer(app);

// TODO: Add app.get("/") endpoint.
app.get("/", async (req, res) => {
  const submissions = await db.submission.findMany();
  res.json(submissions);
});

const startServer = async () => {
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(cors(), bodyParser.json(), expressMiddleware(server));
  app.use(morgan("dev"));

  const port = Number(process.env.PORT ?? 8080);
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}`);
};

startServer();
