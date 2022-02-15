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
  editUser?: Maybe<LoginResponse>;
  joinLobby: LobbyResponse;
  loginUser?: Maybe<LoginResponse>;
};


export type MutationCreateUserArgs = {
  options: CreateUserInput;
};


export type MutationEditUserArgs = {
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

export type Subscription = {
  __typename?: 'Subscription';
  lobbySubscription: Lobby;
};


export type SubscriptionLobbySubscriptionArgs = {
  lobbyUuid: Scalars['String'];
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

export type CreateLobbyMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateLobbyMutation = { __typename?: 'Mutation', createLobby: { __typename?: 'LobbyResponse', accesstoken?: string | null, error?: string | null } };

export type EditUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser?: { __typename?: 'LoginResponse', accesstoken?: string | null, user?: { __typename?: 'User', username: string, email: string, elo: number, uuid: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type JoinLobbyMutationVariables = Exact<{
  lobbyID: Scalars['String'];
}>;


export type JoinLobbyMutation = { __typename?: 'Mutation', joinLobby: { __typename?: 'LobbyResponse', accesstoken?: string | null, error?: string | null } };

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

export type UserQueryVariables = Exact<{
  userUuid: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'UserResponse', user?: { __typename?: 'User', uuid: string, username: string, createdAt: string, email: string, elo: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type UserFromTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFromTokenQuery = { __typename?: 'Query', userFromToken?: { __typename?: 'User', uuid: string, username: string, email: string, elo: number } | null };

export type LobbySubscriptionVariables = Exact<{
  lobbyUuid: Scalars['String'];
}>;


export type LobbySubscription = { __typename?: 'Subscription', lobbySubscription: { __typename?: 'Lobby', users: Array<string> } };


export const CreateLobbyDocument = gql`
    mutation createLobby {
  createLobby {
    accesstoken
    error
  }
}
    `;

export function useCreateLobbyMutation() {
  return Urql.useMutation<CreateLobbyMutation, CreateLobbyMutationVariables>(CreateLobbyDocument);
};
export const EditUserDocument = gql`
    mutation editUser($username: String!, $password: String!, $email: String!) {
  editUser(options: {username: $username, password: $password, email: $email}) {
    user {
      username
      email
      elo
      uuid
    }
    accesstoken
    errors {
      field
      message
    }
  }
}
    `;

export function useEditUserMutation() {
  return Urql.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument);
};
export const JoinLobbyDocument = gql`
    mutation joinLobby($lobbyID: String!) {
  joinLobby(uuid: $lobbyID) {
    accesstoken
    error
  }
}
    `;

export function useJoinLobbyMutation() {
  return Urql.useMutation<JoinLobbyMutation, JoinLobbyMutationVariables>(JoinLobbyDocument);
};
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
export const UserDocument = gql`
    query user($userUuid: String!) {
  user(uuid: $userUuid) {
    user {
      uuid
      username
      createdAt
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

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
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
export const LobbyDocument = gql`
    subscription lobby($lobbyUuid: String!) {
  lobbySubscription(lobbyUuid: $lobbyUuid) {
    users
  }
}
    `;

export function useLobbySubscription<TData = LobbySubscription>(options: Omit<Urql.UseSubscriptionArgs<LobbySubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<LobbySubscription, TData>) {
  return Urql.useSubscription<LobbySubscription, TData, LobbySubscriptionVariables>({ query: LobbyDocument, ...options }, handler);
};