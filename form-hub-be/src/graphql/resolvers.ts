import { DateTimeResolver, JSONResolver } from "graphql-scalars";
import db from "../modules/db";

// A map of functions which return data for the schema.
const resolvers = {
  DateTime: DateTimeResolver,
  JSON: JSONResolver,

  Query: {
    submissions: () =>
      db.submission.findMany({ orderBy: { submittedAt: "desc" } }),
  },
};

export default resolvers;
