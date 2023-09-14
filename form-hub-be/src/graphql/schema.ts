// The GraphQL schema
const schema = `#graphql
    scalar DateTime
    scalar JSON

    type Query {
        submissions: [Submission!]!
    }

    type Mutation {
        queueSubmissionGeneration: Boolean!
    }

    type Submission {
        id: ID!
        submittedAt: DateTime!
        data: JSON!
    }
`;

export default schema;
