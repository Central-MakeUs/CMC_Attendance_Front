import { GraphQLClient, ClientError } from './core';
import { clearAuthTokens } from '@/lib/cookies/client';

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

  const originalRequest = client.request.bind(client);
  client.request = async (...args) => {
    try {
      return await originalRequest(...args);
    } catch (e) {
      if (e instanceof ClientError && e.response.status === 401) {
        clearAuthTokens();
        window.location.href = '/login';
      }
      throw e;
    }
  };

  return client;
};
