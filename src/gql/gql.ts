/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GenerationInvitationCode($generationNumber: Int!) {\n    generationInvitationCode(generationNumber: $generationNumber) {\n      id\n      number\n      invitationCode\n    }\n  }\n": typeof types.GenerationInvitationCodeDocument,
    "\n  query SessionAttendances(\n    $sessionId: ID!\n    $page: Int!\n    $size: Int!\n    $attendanceStatus: AttendanceStatus\n    $part: Part\n    $nickname: String\n  ) {\n    sessionAttendances(\n      sessionId: $sessionId\n      page: $page\n      size: $size\n      attendanceStatus: $attendanceStatus\n      part: $part\n      nickname: $nickname\n    ) {\n      items {\n        name\n        nickname\n        part\n        team\n        attendanceStatus\n        updatedAt\n        updatedBy\n        note\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n  }\n": typeof types.SessionAttendancesDocument,
    "\n  query Sessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      generation {\n        id\n        number\n      }\n      sessionName\n      description\n      placeName\n      attendanceStatus\n      sessionDate\n      startTime\n      endTime\n      attendanceStartTime\n      attendanceEndTime\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.SessionsDocument,
    "\n  mutation CreateGeneration($input: CreateGenerationInput!) {\n    createGeneration(input: $input) {\n      id\n      number\n    }\n  }\n": typeof types.CreateGenerationDocument,
    "\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n}\n  }\n": typeof types.GenerationsDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n      refreshTokenExpiresAt\n      role\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n": typeof types.SignUpDocument,
    "\n  query Parts {\n    parts\n  }\n": typeof types.PartsDocument,
    "\n  query Viewer {\n    viewer {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n": typeof types.ViewerDocument,
};
const documents: Documents = {
    "\n  query GenerationInvitationCode($generationNumber: Int!) {\n    generationInvitationCode(generationNumber: $generationNumber) {\n      id\n      number\n      invitationCode\n    }\n  }\n": types.GenerationInvitationCodeDocument,
    "\n  query SessionAttendances(\n    $sessionId: ID!\n    $page: Int!\n    $size: Int!\n    $attendanceStatus: AttendanceStatus\n    $part: Part\n    $nickname: String\n  ) {\n    sessionAttendances(\n      sessionId: $sessionId\n      page: $page\n      size: $size\n      attendanceStatus: $attendanceStatus\n      part: $part\n      nickname: $nickname\n    ) {\n      items {\n        name\n        nickname\n        part\n        team\n        attendanceStatus\n        updatedAt\n        updatedBy\n        note\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n  }\n": types.SessionAttendancesDocument,
    "\n  query Sessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      generation {\n        id\n        number\n      }\n      sessionName\n      description\n      placeName\n      attendanceStatus\n      sessionDate\n      startTime\n      endTime\n      attendanceStartTime\n      attendanceEndTime\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n": types.SessionsDocument,
    "\n  mutation CreateGeneration($input: CreateGenerationInput!) {\n    createGeneration(input: $input) {\n      id\n      number\n    }\n  }\n": types.CreateGenerationDocument,
    "\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n}\n  }\n": types.GenerationsDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n      refreshTokenExpiresAt\n      role\n    }\n  }\n": types.LoginDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n": types.SignUpDocument,
    "\n  query Parts {\n    parts\n  }\n": types.PartsDocument,
    "\n  query Viewer {\n    viewer {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n": types.ViewerDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GenerationInvitationCode($generationNumber: Int!) {\n    generationInvitationCode(generationNumber: $generationNumber) {\n      id\n      number\n      invitationCode\n    }\n  }\n"): (typeof documents)["\n  query GenerationInvitationCode($generationNumber: Int!) {\n    generationInvitationCode(generationNumber: $generationNumber) {\n      id\n      number\n      invitationCode\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SessionAttendances(\n    $sessionId: ID!\n    $page: Int!\n    $size: Int!\n    $attendanceStatus: AttendanceStatus\n    $part: Part\n    $nickname: String\n  ) {\n    sessionAttendances(\n      sessionId: $sessionId\n      page: $page\n      size: $size\n      attendanceStatus: $attendanceStatus\n      part: $part\n      nickname: $nickname\n    ) {\n      items {\n        name\n        nickname\n        part\n        team\n        attendanceStatus\n        updatedAt\n        updatedBy\n        note\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query SessionAttendances(\n    $sessionId: ID!\n    $page: Int!\n    $size: Int!\n    $attendanceStatus: AttendanceStatus\n    $part: Part\n    $nickname: String\n  ) {\n    sessionAttendances(\n      sessionId: $sessionId\n      page: $page\n      size: $size\n      attendanceStatus: $attendanceStatus\n      part: $part\n      nickname: $nickname\n    ) {\n      items {\n        name\n        nickname\n        part\n        team\n        attendanceStatus\n        updatedAt\n        updatedBy\n        note\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Sessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      generation {\n        id\n        number\n      }\n      sessionName\n      description\n      placeName\n      attendanceStatus\n      sessionDate\n      startTime\n      endTime\n      attendanceStartTime\n      attendanceEndTime\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Sessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      generation {\n        id\n        number\n      }\n      sessionName\n      description\n      placeName\n      attendanceStatus\n      sessionDate\n      startTime\n      endTime\n      attendanceStartTime\n      attendanceEndTime\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateGeneration($input: CreateGenerationInput!) {\n    createGeneration(input: $input) {\n      id\n      number\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGeneration($input: CreateGenerationInput!) {\n    createGeneration(input: $input) {\n      id\n      number\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n}\n  }\n"): (typeof documents)["\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n}\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n      refreshTokenExpiresAt\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n      refreshTokenExpiresAt\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Parts {\n    parts\n  }\n"): (typeof documents)["\n  query Parts {\n    parts\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Viewer {\n    viewer {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n"): (typeof documents)["\n  query Viewer {\n    viewer {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;