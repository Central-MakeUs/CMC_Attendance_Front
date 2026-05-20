import { GraphQLClient } from './core';

const getAccessToken = () => {
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
  return match ? match[1] : null;
};

export const createBrowserClient = () => {
  const client = new GraphQLClient('/api/graphql');
  const token = getAccessToken();
  if (token) {
    client.setHeader('Authorization', `Bearer ${token}`);
  }
  return client;
};
