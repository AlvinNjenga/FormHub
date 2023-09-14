import { DateTimeResolver, JSONResolver } from "graphql-scalars";
import db from "../modules/db";
import { enqueue } from "../modules/queue";

// A map of functions which return data for the schema.
const resolvers = {
  DateTime: DateTimeResolver,
  JSON: JSONResolver,

  Query: {
    submissions: () =>
      db.submission.findMany({ orderBy: { submittedAt: "desc" } }),
  },

  Mutation: {
    queueSubmissionGeneration: async () => {
      enqueue("generateSubmissions");
    },
  },
};

export default resolvers;
