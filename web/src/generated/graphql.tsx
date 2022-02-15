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
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlock: Block;
  createInbox: Inbox;
  createSchedule: Schedule;
  login: UserResponse;
  register: UserResponse;
  updateBlockTimes: Block;
};


export type MutationCreateBlockArgs = {
  input: BlockInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateBlockTimesArgs = {
  endDateTime: Scalars['DateTime'];
  id: Scalars['Int'];
  startDateTime: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  block?: Maybe<Block>;
  blocks: Array<Block>;
  hello: Scalars['String'];
  unassignedBlocks: Array<Block>;
};


export type QueryBlockArgs = {
  id: Scalars['Int'];
};


export type QueryBlocksArgs = {
  date?: InputMaybe<Scalars['String']>;
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
  id: Scalars['Float'];
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

export type CreateBlockMutationVariables = Exact<{
  input: BlockInput;
}>;


export type CreateBlockMutation = { __typename?: 'Mutation', createBlock: { __typename?: 'Block', title: string, description?: string | null, id: number, inboxId: number, createdAt: any } };

export type UpdateBlockTimesMutationVariables = Exact<{
  id: Scalars['Int'];
  startDateTime: Scalars['DateTime'];
  endDateTime: Scalars['DateTime'];
}>;


export type UpdateBlockTimesMutation = { __typename?: 'Mutation', updateBlockTimes: { __typename?: 'Block', id: number, title: string, description?: string | null, createdAt: any, startDateTime?: any | null, endDateTime?: any | null } };

export type BlocksQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']>;
}>;


export type BlocksQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', title: string, description?: string | null, id: number, startDateTime?: any | null }> };

export type UnassignedBlocksQueryVariables = Exact<{ [key: string]: never; }>;


export type UnassignedBlocksQuery = { __typename?: 'Query', unassignedBlocks: Array<{ __typename?: 'Block', title: string, description?: string | null, id: number, createdAt: any, startDateTime?: any | null }> };


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

export function useBlocksQuery(options?: Omit<Urql.UseQueryArgs<BlocksQueryVariables>, 'query'>) {
  return Urql.useQuery<BlocksQuery>({ query: BlocksDocument, ...options });
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

export function useUnassignedBlocksQuery(options?: Omit<Urql.UseQueryArgs<UnassignedBlocksQueryVariables>, 'query'>) {
  return Urql.useQuery<UnassignedBlocksQuery>({ query: UnassignedBlocksDocument, ...options });
};