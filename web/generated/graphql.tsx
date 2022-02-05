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
};

export type AuthToken = {
  __typename?: 'AuthToken';
  uuidLobby?: Maybe<Scalars['String']>;
  uuidUser?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Lobby = {
  __typename?: 'Lobby';
  createdAt: Scalars['String'];
  endArticle: Scalars['String'];
  options: Array<Scalars['String']>;
  startArticle: Scalars['String'];
  users: Array<Scalars['String']>;
  uuid: Scalars['String'];
};

export type LobbyResponse = {
  __typename?: 'LobbyResponse';
  accesstoken?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accesstoken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLobby: LobbyResponse;
  createUser?: Maybe<LoginResponse>;
  joinLobby: LobbyResponse;
  loginUser?: Maybe<LoginResponse>;
};


export type MutationCreateUserArgs = {
  options: CreateUserInput;
};


export type MutationJoinLobbyArgs = {
  uuid: Scalars['String'];
};


export type MutationLoginUserArgs = {
  options: LoginUserInput;
};

export type Query = {
  __typename?: 'Query';
  authenticateUser?: Maybe<AuthToken>;
  lobbies: Array<Lobby>;
  lobby: Lobby;
  lobbyFromToken?: Maybe<Lobby>;
  user?: Maybe<UserResponse>;
  userFromToken?: Maybe<User>;
  users: Array<User>;
};


export type QueryLobbyArgs = {
  uuid: Scalars['String'];
};


export type QueryUserArgs = {
  uuid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  elo: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginUserInput = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserMutationVariables = Exact<{
  options: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'LoginResponse', accesstoken?: string | null, user?: { __typename?: 'User', uuid: string, username: string, email: string, elo: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'LoginResponse', accesstoken?: string | null, user?: { __typename?: 'User', uuid: string, username: string, email: string, elo: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type LobbyFromTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type LobbyFromTokenQuery = { __typename?: 'Query', lobbyFromToken?: { __typename?: 'Lobby', uuid: string, users: Array<string> } | null };

export type UserFromTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFromTokenQuery = { __typename?: 'Query', userFromToken?: { __typename?: 'User', uuid: string, username: string, email: string, elo: number } | null };


export const LoginUserDocument = gql`
    mutation loginUser($options: loginUserInput!) {
  loginUser(options: $options) {
    accesstoken
    user {
      uuid
      username
      email
      elo
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const CreateUserDocument = gql`
    mutation createUser($username: String!, $password: String!, $email: String!) {
  createUser(options: {username: $username, password: $password, email: $email}) {
    accesstoken
    user {
      uuid
      username
      email
      elo
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const LobbyFromTokenDocument = gql`
    query lobbyFromToken {
  lobbyFromToken {
    uuid
    users
  }
}
    `;

export function useLobbyFromTokenQuery(options?: Omit<Urql.UseQueryArgs<LobbyFromTokenQueryVariables>, 'query'>) {
  return Urql.useQuery<LobbyFromTokenQuery>({ query: LobbyFromTokenDocument, ...options });
};
export const UserFromTokenDocument = gql`
    query userFromToken {
  userFromToken {
    uuid
    username
    email
    elo
  }
}
    `;

export function useUserFromTokenQuery(options?: Omit<Urql.UseQueryArgs<UserFromTokenQueryVariables>, 'query'>) {
  return Urql.useQuery<UserFromTokenQuery>({ query: UserFromTokenDocument, ...options });
};