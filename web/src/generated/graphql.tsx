import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Block = {
  __typename?: 'Block';
  createdAt: Scalars['DateTime'];
  creatorId: Scalars['Float'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  endDateTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  inboxId: Scalars['Float'];
  isComplete: Scalars['Boolean'];
  scheduleId: Scalars['Float'];
  startDateTime?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BlockInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  description: Scalars['String'];
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Inbox = {
  __typename?: 'Inbox';
  creatorId?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createBlock: Block;
  createBlockWithTimes: Block;
  createInbox: Inbox;
  createSchedule: Schedule;
  deleteBlock: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  setBlock: Block;
  setRefreshToken: Scalars['Boolean'];
  updateBlockTimes: Block;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateBlockArgs = {
  input: BlockInput;
};


export type MutationCreateBlockWithTimesArgs = {
  endDateTime: Scalars['DateTime'];
  input: BlockInput;
  startDateTime: Scalars['DateTime'];
};


export type MutationDeleteBlockArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationSetBlockArgs = {
  endDateTime: Scalars['DateTime'];
  id: Scalars['Int'];
  input: BlockInput;
  startDateTime: Scalars['DateTime'];
};


export type MutationSetRefreshTokenArgs = {
  refresh_token: Scalars['String'];
  userId: Scalars['Float'];
};


export type MutationUpdateBlockTimesArgs = {
  endDateTime: Scalars['DateTime'];
  id: Scalars['Int'];
  startDateTime: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  allBlocks: Array<Block>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  getRefreshToken: Scalars['String'];
  me?: Maybe<User>;
  unassignedBlocks: Array<Block>;
};


export type QueryBlockArgs = {
  id: Scalars['Int'];
};


export type QueryBlocksArgs = {
  date?: InputMaybe<Scalars['String']>;
};


export type QueryGetRefreshTokenArgs = {
  userId: Scalars['Float'];
};

export type Schedule = {
  __typename?: 'Schedule';
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  refresh_token: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type CreateBlockMutationVariables = Exact<{
  input: BlockInput;
}>;


export type CreateBlockMutation = { __typename?: 'Mutation', createBlock: { __typename?: 'Block', title: string, description?: string | null | undefined, id: number, inboxId: number, createdAt: any } };

export type CreateBlockWithTimesMutationVariables = Exact<{
  endDateTime: Scalars['DateTime'];
  startDateTime: Scalars['DateTime'];
  input: BlockInput;
}>;


export type CreateBlockWithTimesMutation = { __typename?: 'Mutation', createBlockWithTimes: { __typename?: 'Block', id: number, inboxId: number, description?: string | null | undefined, title: string, startDateTime?: any | null | undefined, endDateTime?: any | null | undefined } };

export type CreateInboxMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateInboxMutation = { __typename?: 'Mutation', createInbox: { __typename?: 'Inbox', id: number, title: string, creatorId?: number | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type SetBlockMutationVariables = Exact<{
  id: Scalars['Int'];
  input: BlockInput;
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
}>;


export type SetBlockMutation = { __typename?: 'Mutation', setBlock: { __typename?: 'Block', title: string, description?: string | null | undefined, id: number, inboxId: number, startDateTime?: any | null | undefined, endDateTime?: any | null | undefined } };

export type SetRefreshTokenMutationVariables = Exact<{
  userId: Scalars['Float'];
  refresh_token: Scalars['String'];
}>;


export type SetRefreshTokenMutation = { __typename?: 'Mutation', setRefreshToken: boolean };

export type UpdateBlockTimesMutationVariables = Exact<{
  id: Scalars['Int'];
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
}>;


export type UpdateBlockTimesMutation = { __typename?: 'Mutation', updateBlockTimes: { __typename?: 'Block', id: number, title: string, description?: string | null | undefined, createdAt: any, startDateTime?: any | null | undefined, endDateTime?: any | null | undefined } };

export type BlocksQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']>;
}>;


export type BlocksQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', title: string, description?: string | null | undefined, id: number, startDateTime?: any | null | undefined }> };

export type GetRefreshTokenQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetRefreshTokenQuery = { __typename?: 'Query', getRefreshToken: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type UnassignedBlocksQueryVariables = Exact<{ [key: string]: never; }>;


export type UnassignedBlocksQuery = { __typename?: 'Query', unassignedBlocks: Array<{ __typename?: 'Block', title: string, description?: string | null | undefined, id: number, createdAt: any, startDateTime?: any | null | undefined }> };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateBlockDocument = gql`
    mutation CreateBlock($input: BlockInput!) {
  createBlock(input: $input) {
    title
    description
    id
    inboxId
    createdAt
  }
}
    `;

export function useCreateBlockMutation() {
  return Urql.useMutation<CreateBlockMutation, CreateBlockMutationVariables>(CreateBlockDocument);
};
export const CreateBlockWithTimesDocument = gql`
    mutation CreateBlockWithTimes($endDateTime: DateTime!, $startDateTime: DateTime!, $input: BlockInput!) {
  createBlockWithTimes(
    endDateTime: $endDateTime
    startDateTime: $startDateTime
    input: $input
  ) {
    id
    inboxId
    description
    title
    startDateTime
    endDateTime
  }
}
    `;

export function useCreateBlockWithTimesMutation() {
  return Urql.useMutation<CreateBlockWithTimesMutation, CreateBlockWithTimesMutationVariables>(CreateBlockWithTimesDocument);
};
export const CreateInboxDocument = gql`
    mutation CreateInbox {
  createInbox {
    id
    title
    creatorId
  }
}
    `;

export function useCreateInboxMutation() {
  return Urql.useMutation<CreateInboxMutation, CreateInboxMutationVariables>(CreateInboxDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SetBlockDocument = gql`
    mutation SetBlock($id: Int!, $input: BlockInput!, $startDateTime: DateTime!, $endDateTime: DateTime!) {
  setBlock(
    id: $id
    input: $input
    startDateTime: $startDateTime
    endDateTime: $endDateTime
  ) {
    title
    description
    id
    inboxId
    startDateTime
    endDateTime
  }
}
    `;

export function useSetBlockMutation() {
  return Urql.useMutation<SetBlockMutation, SetBlockMutationVariables>(SetBlockDocument);
};
export const SetRefreshTokenDocument = gql`
    mutation SetRefreshToken($userId: Float!, $refresh_token: String!) {
  setRefreshToken(userId: $userId, refresh_token: $refresh_token)
}
    `;

export function useSetRefreshTokenMutation() {
  return Urql.useMutation<SetRefreshTokenMutation, SetRefreshTokenMutationVariables>(SetRefreshTokenDocument);
};
export const UpdateBlockTimesDocument = gql`
    mutation updateBlockTimes($id: Int!, $startDateTime: DateTime!, $endDateTime: DateTime!) {
  updateBlockTimes(
    id: $id
    startDateTime: $startDateTime
    endDateTime: $endDateTime
  ) {
    id
    title
    description
    createdAt
    startDateTime
    endDateTime
  }
}
    `;

export function useUpdateBlockTimesMutation() {
  return Urql.useMutation<UpdateBlockTimesMutation, UpdateBlockTimesMutationVariables>(UpdateBlockTimesDocument);
};
export const BlocksDocument = gql`
    query Blocks($date: String) {
  blocks(date: $date) {
    title
    description
    id
    startDateTime
  }
}
    `;

export function useBlocksQuery(options: Omit<Urql.UseQueryArgs<BlocksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BlocksQuery>({ query: BlocksDocument, ...options });
};
export const GetRefreshTokenDocument = gql`
    query GetRefreshToken($userId: Float!) {
  getRefreshToken(userId: $userId)
}
    `;

export function useGetRefreshTokenQuery(options: Omit<Urql.UseQueryArgs<GetRefreshTokenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRefreshTokenQuery>({ query: GetRefreshTokenDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const UnassignedBlocksDocument = gql`
    query UnassignedBlocks {
  unassignedBlocks {
    title
    description
    id
    createdAt
    startDateTime
  }
}
    `;

export function useUnassignedBlocksQuery(options: Omit<Urql.UseQueryArgs<UnassignedBlocksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UnassignedBlocksQuery>({ query: UnassignedBlocksDocument, ...options });
};