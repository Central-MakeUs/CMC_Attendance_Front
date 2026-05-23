/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AttendanceStatus =
  | 'ABSENCE'
  | 'ATTENDANCE'
  | 'EXCUSED_ABSENCE'
  | 'LATE'
  | 'PENDING';

export type CreateGenerationInput = {
  endDate?: string | null | undefined;
  invitationCode: string;
  number: number;
  startDate?: string | null | undefined;
};

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

export type Role =
  | 'CHALLENGER'
  | 'LEAD'
  | 'ROOT';

export type SignUpInput = {
  invitationCode: string;
  loginId: string;
  name: string;
  nickname: string;
  part: Part;
  password: string;
};

export type UpdateChallengerRemarkInput = {
  loginId: string;
  remark?: string | null | undefined;
};

export type UpdateSessionAttendanceNoteInput = {
  loginId: string;
  note?: string | null | undefined;
  sessionId: string | number;
};

export type UpdateSessionAttendanceStatusInput = {
  attendanceStatus: AttendanceStatus;
  loginId: string;
  sessionId: string | number;
};

export type GenerationInvitationCodeQueryVariables = Exact<{
  generationNumber: number;
}>;


export type GenerationInvitationCodeQuery = { generationInvitationCode: { id: string, number: number, invitationCode: string } };

export type UpdateChallengerRemarkMutationVariables = Exact<{
  input: UpdateChallengerRemarkInput;
}>;


export type UpdateChallengerRemarkMutation = { updateChallengerRemark: { loginId: string, name: string, nickname: string, remark: string | null, updatedAt: string, updatedBy: string } };

export type ChallengersQueryVariables = Exact<{
  generationNumber: number;
  part?: string | null | undefined;
  name?: string | null | undefined;
  page: number;
  size: number;
}>;


export type ChallengersQuery = { challengers: { items: Array<{ loginId: string, name: string, nickname: string, part: Part, team: string | null, attendanceScore: number, remark: string | null }>, pageInfo: { page: number, size: number, totalElements: number, totalPages: number, hasNext: boolean, hasPrevious: boolean } } };

export type GenerationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerationsQuery = { generations: Array<{ id: string, number: number, startDate: string | null, endDate: string | null }> };

export type SessionAttendancesQueryVariables = Exact<{
  sessionId: string | number;
  page: number;
  size: number;
  attendanceStatus?: AttendanceStatus | null | undefined;
  part?: Part | null | undefined;
  nickname?: string | null | undefined;
}>;


export type SessionAttendancesQuery = { sessionAttendances: { items: Array<{ name: string, nickname: string, loginId: string, part: Part, team: string | null, attendanceStatus: AttendanceStatus, updatedAt: string, updatedBy: string, note: string | null }>, pageInfo: { totalPages: number } } };

export type UpdateSessionAttendanceStatusMutationVariables = Exact<{
  input: UpdateSessionAttendanceStatusInput;
}>;


export type UpdateSessionAttendanceStatusMutation = { updateSessionAttendanceStatus: { attendanceStatus: AttendanceStatus } };

export type UpdateSessionAttendanceNoteMutationVariables = Exact<{
  input: UpdateSessionAttendanceNoteInput;
}>;


export type UpdateSessionAttendanceNoteMutation = { updateSessionAttendanceNote: { note: string | null } };

export type SessionsForDetailQueryVariables = Exact<{
  generationNumber: number;
}>;


export type SessionsForDetailQuery = { sessions: Array<{ id: string, sessionName: string, description: string | null, placeName: string, attendanceStatus: AttendanceStatus | null, sessionDate: string, startTime: string, endTime: string, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string }> };

export type SessionsQueryVariables = Exact<{
  generationNumber: number;
}>;


export type SessionsQuery = { sessions: Array<{ id: string, sessionName: string, description: string | null, targetParts: Array<Part>, placeName: string, placeDetail: string, sessionDate: string, startTime: string, endTime: string, attendanceStatus: AttendanceStatus | null, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string }> };

export type CreateGenerationMutationVariables = Exact<{
  input: CreateGenerationInput;
}>;


export type CreateGenerationMutation = { createGeneration: { id: string, number: number } };

export type RequestAttendanceMutationVariables = Exact<{
  sessionId: string | number;
  latitude: number;
  longitude: number;
}>;


export type RequestAttendanceMutation = { requestAttendance: { attendanceStatus: AttendanceStatus } };

export type MemberSessionsQueryVariables = Exact<{
  generationNumber: number;
}>;


export type MemberSessionsQuery = { sessions: Array<{ id: string, sessionName: string, description: string | null, placeName: string, sessionDate: string, startTime: string, endTime: string, attendanceStatus: AttendanceStatus | null }> };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { accessToken: string, refreshToken: string, accessTokenExpiresAt: string, refreshTokenExpiresAt: string, role: Role, generation: { number: number } | null } };

export type LoginIdAvailabilityQueryVariables = Exact<{
  loginId: string;
}>;


export type LoginIdAvailabilityQuery = { loginIdAvailability: { loginId: string, available: boolean } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { signUp: { userId: string, loginId: string, name: string, nickname: string, part: Part, role: Role } };

export type PartsQueryVariables = Exact<{ [key: string]: never; }>;


export type PartsQuery = { parts: Array<Part> };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { viewer: { userId: string, loginId: string, name: string, nickname: string, part: Part, role: Role } | null };


export const GenerationInvitationCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GenerationInvitationCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generationInvitationCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generationNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"invitationCode"}}]}}]}}]} as unknown as DocumentNode<GenerationInvitationCodeQuery, GenerationInvitationCodeQueryVariables>;
export const UpdateChallengerRemarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateChallengerRemark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateChallengerRemarkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateChallengerRemark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]}}]} as unknown as DocumentNode<UpdateChallengerRemarkMutation, UpdateChallengerRemarkMutationVariables>;
export const ChallengersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Challengers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"part"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generationNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"part"},"value":{"kind":"Variable","name":{"kind":"Name","value":"part"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"part"}},{"kind":"Field","name":{"kind":"Name","value":"team"}},{"kind":"Field","name":{"kind":"Name","value":"attendanceScore"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"totalElements"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevious"}}]}}]}}]}}]} as unknown as DocumentNode<ChallengersQuery, ChallengersQueryVariables>;
export const GenerationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Generations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<GenerationsQuery, GenerationsQueryVariables>;
export const SessionAttendancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SessionAttendances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attendanceStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AttendanceStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"part"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Part"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionAttendances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"Argument","name":{"kind":"Name","value":"attendanceStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attendanceStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"part"},"value":{"kind":"Variable","name":{"kind":"Name","value":"part"}}},{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"loginId"}},{"kind":"Field","name":{"kind":"Name","value":"part"}},{"kind":"Field","name":{"kind":"Name","value":"team"}},{"kind":"Field","name":{"kind":"Name","value":"attendanceStatus"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<SessionAttendancesQuery, SessionAttendancesQueryVariables>;
export const UpdateSessionAttendanceStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSessionAttendanceStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSessionAttendanceStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSessionAttendanceStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceStatus"}}]}}]}}]} as unknown as DocumentNode<UpdateSessionAttendanceStatusMutation, UpdateSessionAttendanceStatusMutationVariables>;
export const UpdateSessionAttendanceNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSessionAttendanceNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSessionAttendanceNoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSessionAttendanceNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]} as unknown as DocumentNode<UpdateSessionAttendanceNoteMutation, UpdateSessionAttendanceNoteMutationVariables>;
export const SessionsForDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SessionsForDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generationNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"attendanceStatus"}},{"kind":"Field","name":{"kind":"Name","value":"sessionDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<SessionsForDetailQuery, SessionsForDetailQueryVariables>;
export const SessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sessions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generationNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"targetParts"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"placeDetail"}},{"kind":"Field","name":{"kind":"Name","value":"sessionDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"attendanceStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<SessionsQuery, SessionsQueryVariables>;
export const CreateGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGenerationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]} as unknown as DocumentNode<CreateGenerationMutation, CreateGenerationMutationVariables>;
export const RequestAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendanceStatus"}}]}}]}}]} as unknown as DocumentNode<RequestAttendanceMutation, RequestAttendanceMutationVariables>;
export const MemberSessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberSessions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generationNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generationNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"sessionDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"attendanceStatus"}}]}}]}}]} as unknown as DocumentNode<MemberSessionsQuery, MemberSessionsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessTokenExpiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"refreshTokenExpiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"generation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LoginIdAvailabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoginIdAvailability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginIdAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginId"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}}]}}]} as unknown as DocumentNode<LoginIdAvailabilityQuery, LoginIdAvailabilityQueryVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"loginId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"part"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const PartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Parts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parts"}}]}}]} as unknown as DocumentNode<PartsQuery, PartsQueryVariables>;
export const ViewerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"loginId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"part"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<ViewerQuery, ViewerQueryVariables>;