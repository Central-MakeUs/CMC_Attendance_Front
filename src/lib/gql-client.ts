import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';

export class ClientError extends Error {
  response: { status: number; errors?: { message: string }[] };
  request: { query: string; variables?: unknown };

  constructor(
    response: { status: number; errors?: { message: string }[] },
    request: { query: string; variables?: unknown }
  ) {
    const message =
      response.errors?.[0]?.message ??
      `GraphQL Error (Code: ${response.status})`;
    super(message);
    Object.setPrototypeOf(this, ClientError.prototype);
    this.response = response;
    this.request = request;
  }
}

export class GraphQLClient {
  private headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  constructor(private url: string) {}

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  async request<TData, TVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    variables?: TVariables,
    requestHeaders?: Record<string, string>
  ): Promise<TData> {
    const query = print(document);

    const res = await fetch(this.url, {
      method: 'POST',
      headers: { ...this.headers, ...requestHeaders },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await res.json();

    if (!res.ok || errors?.length) {
      throw new ClientError(
        { status: res.status, errors },
        { query, variables }
      );
    }

    return data;
  }
}

export const gqlClient = new GraphQLClient(
  `${process.env.API_BASE_URL}/graphql`
);

function getAccessToken() {
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
  return match ? match[1] : null;
}

export function createBrowserClient() {
  const client = new GraphQLClient('/api/graphql');
  const token = getAccessToken();
  if (token) {
    client.setHeader('Authorization', `Bearer ${token}`);
  }
  return client;
}
