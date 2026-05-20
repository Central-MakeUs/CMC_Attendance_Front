import { GraphQLClient } from './core';

export const gqlClient = new GraphQLClient(
  `${process.env.API_BASE_URL}/graphql`
);
