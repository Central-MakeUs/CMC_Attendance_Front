/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type LoginInput = {
  loginId: string;
  password: string;
};

export type Part =
  | 'Android'
  | 'Designer'
  | 'Flutter'
  | 'PM'
  | 'Server'
  | 'Web'
  | 'iOS';

export type Role = 'CHALLENGER' | 'LEAD' | 'ROOT';

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  login: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
    role: Role;
  };
};

export type ViewerQueryVariables = Exact<{ [key: string]: never }>;

export type ViewerQuery = {
  viewer: {
    userId: string;
    loginId: string;
    name: string;
    nickname: string;
    part: Part;
    role: Role;
  } | null;
};

export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refreshToken' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accessTokenExpiresAt' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refreshTokenExpiresAt' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ViewerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Viewer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'viewer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'loginId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'nickname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'part' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ViewerQuery, ViewerQueryVariables>;
