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
    "\n  mutation UpdateChallengerRemark($input: UpdateChallengerRemarkInput!) {\n    updateChallengerRemark(input: $input) {\n      loginId\n      name\n      nickname\n      remark\n      updatedAt\n      updatedBy\n    }\n  }\n": typeof types.UpdateChallengerRemarkDocument,
    "\n  query Challengers(\n    $generationNumber: Int!\n    $part: String\n    $name: String\n    $page: Int!\n    $size: Int!\n  ) {\n    challengers(\n      generationNumber: $generationNumber\n      part: $part\n      name: $name\n      page: $page\n      size: $size\n    ) {\n      items {\n        loginId\n        name\n        nickname\n        part\n        team\n        attendanceScore\n        remark\n      }\n      pageInfo {\n        page\n        size\n        totalElements\n        totalPages\n        hasNext\n        hasPrevious\n      }\n    }\n  }\n": typeof types.ChallengersDocument,
    "\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n    }\n  }\n": typeof types.GenerationsDocument,
    "\n  query SessionAttendances(\n    $sessionId: ID!\n    $page: Int!\n    $size: Int!\n    $attendanceStatus: AttendanceStatus\n    $part: Part\n    $nickname: String\n  ) {\n    sessionAttendances(\n      sessionId: $sessionId\n      page: $page\n      size: $size\n      attendanceStatus: $attendanceStatus\n      part: $part\n      nickname: $nickname\n    ) {\n      items {\n        name\n        nickname\n        loginId\n        part\n        team\n        attendanceStatus\n        updatedAt\n        updatedBy\n        note\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n  }\n": typeof types.SessionAttendancesDocument,
    "\n  mutation UpdateSessionAttendanceStatus($input: UpdateSessionAttendanceStatusInput!) {\n    updateSessionAttendanceStatus(input: $input) {\n      attendanceStatus\n    }\n  }\n": typeof types.UpdateSessionAttendanceStatusDocument,
    "\n  mutation UpdateSessionAttendanceNote($input: UpdateSessionAttendanceNoteInput!) {\n    updateSessionAttendanceNote(input: $input) {\n      note\n    }\n  }\n": typeof types.UpdateSessionAttendanceNoteDocument,
    "\n  mutation UpdateSessionFromDetail($input: UpdateSessionInput!) {\n    updateSession(input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateSessionFromDetailDocument,
    "\n  mutation DeleteSessionFromDetail($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      deletedSessionId\n    }\n  }\n": typeof types.DeleteSessionFromDetailDocument,
    "\n  query SessionsForDetail($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      placeName\n      placeDetail\n      targetParts\n      attendanceStatus\n      sessionDate\n      startTime\n      endTime\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.SessionsForDetailDocument,
    "\n  mutation CreateSession($input: CreateSessionInput!) {\n    createSession(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateSessionDocument,
    "\n  mutation UpdateSession($input: UpdateSessionInput!) {\n    updateSession(input: $input) {\n      id\n    }\n  }\n": typeof types.UpdateSessionDocument,
    "\n  mutation DeleteSession($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      deletedSessionId\n    }\n  }\n": typeof types.DeleteSessionDocument,
    "\n  query Sessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      targetParts\n      placeName\n      placeDetail\n      sessionDate\n      startTime\n      endTime\n      attendanceStatus\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.SessionsDocument,
    "\n  query Users($name: String, $page: Int!, $size: Int!) {\n    users(name: $name, page: $page, size: $size) {\n      items {\n        loginId\n        name\n        nickname\n        role\n        generation {\n          number\n        }\n      }\n      pageInfo {\n        page\n        size\n        totalElements\n        totalPages\n        hasNext\n        hasPrevious\n      }\n    }\n  }\n": typeof types.UsersDocument,
    "\n  query GenerationsForUsers {\n    generations {\n      id\n      number\n    }\n  }\n": typeof types.GenerationsForUsersDocument,
    "\n  mutation UpdateUserRole($input: UpdateUserRoleInput!) {\n    updateUserRole(input: $input) {\n      loginId\n      name\n      nickname\n      role\n      generation {\n        number\n      }\n    }\n  }\n": typeof types.UpdateUserRoleDocument,
    "\n  mutation UpdateUserGeneration($input: UpdateUserGenerationInput!) {\n    updateUserGeneration(input: $input) {\n      loginId\n      name\n      nickname\n      role\n      generation {\n        number\n      }\n    }\n  }\n": typeof types.UpdateUserGenerationDocument,
    "\n  mutation CreateGeneration($input: CreateGenerationInput!) {\n    createGeneration(input: $input) {\n      id\n      number\n    }\n  }\n": typeof types.CreateGenerationDocument,
    "\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n}\n  }\n": typeof types.GenerationsDocument,
    "\n  mutation RequestAttendance($sessionId: ID!, $latitude: Float!, $longitude: Float!) {\n    requestAttendance(input: { sessionId: $sessionId, latitude: $latitude, longitude: $longitude }) {\n      attendanceStatus\n    }\n  }\n": typeof types.RequestAttendanceDocument,
    "\n  query MemberSessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      placeName\n      sessionDate\n      startTime\n      endTime\n      attendanceStatus\n    }\n  }\n": typeof types.MemberSessionsDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n      refreshTokenExpiresAt\n      role\n      generation {\n        number\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  query LoginIdAvailability($loginId: String!) {\n    loginIdAvailability(loginId: $loginId) {\n      loginId\n      available\n    }\n  }\n": typeof types.LoginIdAvailabilityDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n": typeof types.SignUpDocument,
    "\n  query Parts {\n    parts\n  }\n": typeof types.PartsDocument,
    "\n  query Viewer {\n    viewer {\n      userId\n      loginId\n      name\n      nickname\n      part\n      role\n    }\n  }\n": typeof types.ViewerDocument,
};
const documents: Documents = {
    "\n  query GenerationInvitationCode($generationNumber: Int!) {\n    generationInvitationCode(generationNumber: $generationNumber) {\n      id\n      number\n      invitationCode\n    }\n  }\n": types.GenerationInvitationCodeDocument,
    "\n  mutation UpdateChallengerRemark($input: UpdateChallengerRemarkInput!) {\n    updateChallengerRemark(input: $input) {\n      loginId\n      name\n      nickname\n      remark\n      updatedAt\n      updatedBy\n    }\n  }\n": types.UpdateChallengerRemarkDocument,
    "\n  query Challengers(\n    $generationNumber: Int!\n    $part: String\n    $name: String\n    $page: Int!\n    $size: Int!\n  ) {\n    challengers(\n      generationNumber: $generationNumber\n      part: $part\n      name: $name\n      page: $page\n      size: $size\n    ) {\n      items {\n        loginId\n        name\n        nickname\n        part\n        team\n        attendanceScore\n        remark\n      }\n      pageInfo {\n        page\n        size\n        totalElements\n        totalPages\n        hasNext\n        hasPrevious\n      }\n    }\n  }\n": types.ChallengersDocument,
    "\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n    }\n  }\n": types.GenerationsDocument,
    "\n  query SessionAttendances(\n    $sessionId: ID!\n    $page: Int!\n    $size: Int!\n    $attendanceStatus: AttendanceStatus\n    $part: Part\n    $nickname: String\n  ) {\n    sessionAttendances(\n      sessionId: $sessionId\n      page: $page\n      size: $size\n      attendanceStatus: $attendanceStatus\n      part: $part\n      nickname: $nickname\n    ) {\n      items {\n        name\n        nickname\n        loginId\n        part\n        team\n        attendanceStatus\n        updatedAt\n        updatedBy\n        note\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n  }\n": types.SessionAttendancesDocument,
    "\n  mutation UpdateSessionAttendanceStatus($input: UpdateSessionAttendanceStatusInput!) {\n    updateSessionAttendanceStatus(input: $input) {\n      attendanceStatus\n    }\n  }\n": types.UpdateSessionAttendanceStatusDocument,
    "\n  mutation UpdateSessionAttendanceNote($input: UpdateSessionAttendanceNoteInput!) {\n    updateSessionAttendanceNote(input: $input) {\n      note\n    }\n  }\n": types.UpdateSessionAttendanceNoteDocument,
    "\n  mutation UpdateSessionFromDetail($input: UpdateSessionInput!) {\n    updateSession(input: $input) {\n      id\n    }\n  }\n": types.UpdateSessionFromDetailDocument,
    "\n  mutation DeleteSessionFromDetail($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      deletedSessionId\n    }\n  }\n": types.DeleteSessionFromDetailDocument,
    "\n  query SessionsForDetail($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      placeName\n      placeDetail\n      targetParts\n      attendanceStatus\n      sessionDate\n      startTime\n      endTime\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n": types.SessionsForDetailDocument,
    "\n  mutation CreateSession($input: CreateSessionInput!) {\n    createSession(input: $input) {\n      id\n    }\n  }\n": types.CreateSessionDocument,
    "\n  mutation UpdateSession($input: UpdateSessionInput!) {\n    updateSession(input: $input) {\n      id\n    }\n  }\n": types.UpdateSessionDocument,
    "\n  mutation DeleteSession($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      deletedSessionId\n    }\n  }\n": types.DeleteSessionDocument,
    "\n  query Sessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      targetParts\n      placeName\n      placeDetail\n      sessionDate\n      startTime\n      endTime\n      attendanceStatus\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n": types.SessionsDocument,
    "\n  query Users($name: String, $page: Int!, $size: Int!) {\n    users(name: $name, page: $page, size: $size) {\n      items {\n        loginId\n        name\n        nickname\n        role\n        generation {\n          number\n        }\n      }\n      pageInfo {\n        page\n        size\n        totalElements\n        totalPages\n        hasNext\n        hasPrevious\n      }\n    }\n  }\n": types.UsersDocument,
    "\n  query GenerationsForUsers {\n    generations {\n      id\n      number\n    }\n  }\n": types.GenerationsForUsersDocument,
    "\n  mutation UpdateUserRole($input: UpdateUserRoleInput!) {\n    updateUserRole(input: $input) {\n      loginId\n      name\n      nickname\n      role\n      generation {\n        number\n      }\n    }\n  }\n": types.UpdateUserRoleDocument,
    "\n  mutation UpdateUserGeneration($input: UpdateUserGenerationInput!) {\n    updateUserGeneration(input: $input) {\n      loginId\n      name\n      nickname\n      role\n      generation {\n        number\n      }\n    }\n  }\n": types.UpdateUserGenerationDocument,
    "\n  mutation CreateGeneration($input: CreateGenerationInput!) {\n    createGeneration(input: $input) {\n      id\n      number\n    }\n  }\n": types.CreateGenerationDocument,
    "\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n}\n  }\n": types.GenerationsDocument,
    "\n  mutation RequestAttendance($sessionId: ID!, $latitude: Float!, $longitude: Float!) {\n    requestAttendance(input: { sessionId: $sessionId, latitude: $latitude, longitude: $longitude }) {\n      attendanceStatus\n    }\n  }\n": types.RequestAttendanceDocument,
    "\n  query MemberSessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      placeName\n      sessionDate\n      startTime\n      endTime\n      attendanceStatus\n    }\n  }\n": types.MemberSessionsDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n      refreshTokenExpiresAt\n      role\n      generation {\n        number\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query LoginIdAvailability($loginId: String!) {\n    loginIdAvailability(loginId: $loginId) {\n      loginId\n      available\n    }\n  }\n": types.LoginIdAvailabilityDocument,
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
export function gql(source: "\n  mutation UpdateChallengerRemark($input: UpdateChallengerRemarkInput!) {\n    updateChallengerRemark(input: $input) {\n      loginId\n      name\n      nickname\n      remark\n      updatedAt\n      updatedBy\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateChallengerRemark($input: UpdateChallengerRemarkInput!) {\n    updateChallengerRemark(input: $input) {\n      loginId\n      name\n      nickname\n      remark\n      updatedAt\n      updatedBy\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Challengers(\n    $generationNumber: Int!\n    $part: String\n    $name: String\n    $page: Int!\n    $size: Int!\n  ) {\n    challengers(\n      generationNumber: $generationNumber\n      part: $part\n      name: $name\n      page: $page\n      size: $size\n    ) {\n      items {\n        loginId\n        name\n        nickname\n        part\n        team\n        attendanceScore\n        remark\n      }\n      pageInfo {\n        page\n        size\n        totalElements\n        totalPages\n        hasNext\n        hasPrevious\n      }\n    }\n  }\n"): (typeof documents)["\n  query Challengers(\n    $generationNumber: Int!\n    $part: String\n    $name: String\n    $page: Int!\n    $size: Int!\n  ) {\n    challengers(\n      generationNumber: $generationNumber\n      part: $part\n      name: $name\n      page: $page\n      size: $size\n    ) {\n      items {\n        loginId\n        name\n        nickname\n        part\n        team\n        attendanceScore\n        remark\n      }\n      pageInfo {\n        page\n        size\n        totalElements\n        totalPages\n        hasNext\n        hasPrevious\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  query Generations {\n    generations {\n      id\n      number\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SessionAttendances(\n    $sessionId: ID!\n    $page: Int!\n    $size: Int!\n    $attendanceStatus: AttendanceStatus\n    $part: Part\n    $nickname: String\n  ) {\n    sessionAttendances(\n      sessionId: $sessionId\n      page: $page\n      size: $size\n      attendanceStatus: $attendanceStatus\n      part: $part\n      nickname: $nickname\n    ) {\n      items {\n        name\n        nickname\n        loginId\n        part\n        team\n        attendanceStatus\n        updatedAt\n        updatedBy\n        note\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query SessionAttendances(\n    $sessionId: ID!\n    $page: Int!\n    $size: Int!\n    $attendanceStatus: AttendanceStatus\n    $part: Part\n    $nickname: String\n  ) {\n    sessionAttendances(\n      sessionId: $sessionId\n      page: $page\n      size: $size\n      attendanceStatus: $attendanceStatus\n      part: $part\n      nickname: $nickname\n    ) {\n      items {\n        name\n        nickname\n        loginId\n        part\n        team\n        attendanceStatus\n        updatedAt\n        updatedBy\n        note\n      }\n      pageInfo {\n        totalPages\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSessionAttendanceStatus($input: UpdateSessionAttendanceStatusInput!) {\n    updateSessionAttendanceStatus(input: $input) {\n      attendanceStatus\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSessionAttendanceStatus($input: UpdateSessionAttendanceStatusInput!) {\n    updateSessionAttendanceStatus(input: $input) {\n      attendanceStatus\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSessionAttendanceNote($input: UpdateSessionAttendanceNoteInput!) {\n    updateSessionAttendanceNote(input: $input) {\n      note\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSessionAttendanceNote($input: UpdateSessionAttendanceNoteInput!) {\n    updateSessionAttendanceNote(input: $input) {\n      note\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSessionFromDetail($input: UpdateSessionInput!) {\n    updateSession(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSessionFromDetail($input: UpdateSessionInput!) {\n    updateSession(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteSessionFromDetail($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      deletedSessionId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSessionFromDetail($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      deletedSessionId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SessionsForDetail($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      placeName\n      placeDetail\n      targetParts\n      attendanceStatus\n      sessionDate\n      startTime\n      endTime\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query SessionsForDetail($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      placeName\n      placeDetail\n      targetParts\n      attendanceStatus\n      sessionDate\n      startTime\n      endTime\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSession($input: CreateSessionInput!) {\n    createSession(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSession($input: CreateSessionInput!) {\n    createSession(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSession($input: UpdateSessionInput!) {\n    updateSession(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSession($input: UpdateSessionInput!) {\n    updateSession(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteSession($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      deletedSessionId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSession($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      deletedSessionId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Sessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      targetParts\n      placeName\n      placeDetail\n      sessionDate\n      startTime\n      endTime\n      attendanceStatus\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Sessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      targetParts\n      placeName\n      placeDetail\n      sessionDate\n      startTime\n      endTime\n      attendanceStatus\n      createdBy\n      updatedBy\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users($name: String, $page: Int!, $size: Int!) {\n    users(name: $name, page: $page, size: $size) {\n      items {\n        loginId\n        name\n        nickname\n        role\n        generation {\n          number\n        }\n      }\n      pageInfo {\n        page\n        size\n        totalElements\n        totalPages\n        hasNext\n        hasPrevious\n      }\n    }\n  }\n"): (typeof documents)["\n  query Users($name: String, $page: Int!, $size: Int!) {\n    users(name: $name, page: $page, size: $size) {\n      items {\n        loginId\n        name\n        nickname\n        role\n        generation {\n          number\n        }\n      }\n      pageInfo {\n        page\n        size\n        totalElements\n        totalPages\n        hasNext\n        hasPrevious\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GenerationsForUsers {\n    generations {\n      id\n      number\n    }\n  }\n"): (typeof documents)["\n  query GenerationsForUsers {\n    generations {\n      id\n      number\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserRole($input: UpdateUserRoleInput!) {\n    updateUserRole(input: $input) {\n      loginId\n      name\n      nickname\n      role\n      generation {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserRole($input: UpdateUserRoleInput!) {\n    updateUserRole(input: $input) {\n      loginId\n      name\n      nickname\n      role\n      generation {\n        number\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserGeneration($input: UpdateUserGenerationInput!) {\n    updateUserGeneration(input: $input) {\n      loginId\n      name\n      nickname\n      role\n      generation {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserGeneration($input: UpdateUserGenerationInput!) {\n    updateUserGeneration(input: $input) {\n      loginId\n      name\n      nickname\n      role\n      generation {\n        number\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  mutation RequestAttendance($sessionId: ID!, $latitude: Float!, $longitude: Float!) {\n    requestAttendance(input: { sessionId: $sessionId, latitude: $latitude, longitude: $longitude }) {\n      attendanceStatus\n    }\n  }\n"): (typeof documents)["\n  mutation RequestAttendance($sessionId: ID!, $latitude: Float!, $longitude: Float!) {\n    requestAttendance(input: { sessionId: $sessionId, latitude: $latitude, longitude: $longitude }) {\n      attendanceStatus\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MemberSessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      placeName\n      sessionDate\n      startTime\n      endTime\n      attendanceStatus\n    }\n  }\n"): (typeof documents)["\n  query MemberSessions($generationNumber: Int!) {\n    sessions(generationNumber: $generationNumber) {\n      id\n      sessionName\n      description\n      placeName\n      sessionDate\n      startTime\n      endTime\n      attendanceStatus\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n      refreshTokenExpiresAt\n      role\n      generation {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n      refreshTokenExpiresAt\n      role\n      generation {\n        number\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LoginIdAvailability($loginId: String!) {\n    loginIdAvailability(loginId: $loginId) {\n      loginId\n      available\n    }\n  }\n"): (typeof documents)["\n  query LoginIdAvailability($loginId: String!) {\n    loginIdAvailability(loginId: $loginId) {\n      loginId\n      available\n    }\n  }\n"];
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