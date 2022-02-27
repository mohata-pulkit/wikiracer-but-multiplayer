import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  endArticle?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Scalars['String']>>;
  startArticle?: Maybe<Scalars['String']>;
  users: Array<Scalars['String']>;
  uuid: Scalars['String'];
};

export type LobbyResponse = {
  __typename?: 'LobbyResponse';
  accesstoken?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  lobby?: Maybe<Lobby>;
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
  startGame: LobbyResponse;
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


export type MutationStartGameArgs = {
  endArticle: Scalars['String'];
  options: Array<Scalars['String']>;
  startArticle: Scalars['String'];
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


export type CreateLobbyMutation = { __typename?: 'Mutation', createLobby: { __typename?: 'LobbyResponse', accesstoken?: string | null, error?: string | null, lobby?: { __typename?: 'Lobby', uuid: string, createdAt: string, users: Array<string>, startArticle?: string | null, endArticle?: string | null, options?: Array<string> | null } | null } };

export type EditUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser?: { __typename?: 'LoginResponse', accesstoken?: string | null, user?: { __typename?: 'User', username: string, email: string, elo: number, uuid: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type JoinLobbyMutationVariables = Exact<{
  lobbyID: Scalars['String'];
}>;


export type JoinLobbyMutation = { __typename?: 'Mutation', joinLobby: { __typename?: 'LobbyResponse', accesstoken?: string | null, error?: string | null, lobby?: { __typename?: 'Lobby', uuid: string, createdAt: string, users: Array<string>, startArticle?: string | null, endArticle?: string | null, options?: Array<string> | null } | null } };

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

export type StartGameMutationVariables = Exact<{
  options: Array<Scalars['String']> | Scalars['String'];
  endArticle: Scalars['String'];
  startArticle: Scalars['String'];
}>;


export type StartGameMutation = { __typename?: 'Mutation', startGame: { __typename?: 'LobbyResponse', accesstoken?: string | null, error?: string | null, lobby?: { __typename?: 'Lobby', uuid: string, createdAt: string, users: Array<string>, startArticle?: string | null, endArticle?: string | null, options?: Array<string> | null } | null } };

export type LobbyFromTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type LobbyFromTokenQuery = { __typename?: 'Query', lobbyFromToken?: { __typename?: 'Lobby', uuid: string, users: Array<string>, startArticle?: string | null, endArticle?: string | null, options?: Array<string> | null } | null };

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
    lobby {
      uuid
      createdAt
      users
      startArticle
      endArticle
      options
    }
    accesstoken
    error
  }
}
    `;
export type CreateLobbyMutationFn = Apollo.MutationFunction<CreateLobbyMutation, CreateLobbyMutationVariables>;

/**
 * __useCreateLobbyMutation__
 *
 * To run a mutation, you first call `useCreateLobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLobbyMutation, { data, loading, error }] = useCreateLobbyMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateLobbyMutation(baseOptions?: Apollo.MutationHookOptions<CreateLobbyMutation, CreateLobbyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLobbyMutation, CreateLobbyMutationVariables>(CreateLobbyDocument, options);
      }
export type CreateLobbyMutationHookResult = ReturnType<typeof useCreateLobbyMutation>;
export type CreateLobbyMutationResult = Apollo.MutationResult<CreateLobbyMutation>;
export type CreateLobbyMutationOptions = Apollo.BaseMutationOptions<CreateLobbyMutation, CreateLobbyMutationVariables>;
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
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const JoinLobbyDocument = gql`
    mutation joinLobby($lobbyID: String!) {
  joinLobby(uuid: $lobbyID) {
    lobby {
      uuid
      createdAt
      users
      startArticle
      endArticle
      options
    }
    accesstoken
    error
  }
}
    `;
export type JoinLobbyMutationFn = Apollo.MutationFunction<JoinLobbyMutation, JoinLobbyMutationVariables>;

/**
 * __useJoinLobbyMutation__
 *
 * To run a mutation, you first call `useJoinLobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinLobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinLobbyMutation, { data, loading, error }] = useJoinLobbyMutation({
 *   variables: {
 *      lobbyID: // value for 'lobbyID'
 *   },
 * });
 */
export function useJoinLobbyMutation(baseOptions?: Apollo.MutationHookOptions<JoinLobbyMutation, JoinLobbyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinLobbyMutation, JoinLobbyMutationVariables>(JoinLobbyDocument, options);
      }
export type JoinLobbyMutationHookResult = ReturnType<typeof useJoinLobbyMutation>;
export type JoinLobbyMutationResult = Apollo.MutationResult<JoinLobbyMutation>;
export type JoinLobbyMutationOptions = Apollo.BaseMutationOptions<JoinLobbyMutation, JoinLobbyMutationVariables>;
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
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const StartGameDocument = gql`
    mutation startGame($options: [String!]!, $endArticle: String!, $startArticle: String!) {
  startGame(
    options: $options
    endArticle: $endArticle
    startArticle: $startArticle
  ) {
    lobby {
      uuid
      createdAt
      users
      startArticle
      endArticle
      options
    }
    accesstoken
    error
  }
}
    `;
export type StartGameMutationFn = Apollo.MutationFunction<StartGameMutation, StartGameMutationVariables>;

/**
 * __useStartGameMutation__
 *
 * To run a mutation, you first call `useStartGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startGameMutation, { data, loading, error }] = useStartGameMutation({
 *   variables: {
 *      options: // value for 'options'
 *      endArticle: // value for 'endArticle'
 *      startArticle: // value for 'startArticle'
 *   },
 * });
 */
export function useStartGameMutation(baseOptions?: Apollo.MutationHookOptions<StartGameMutation, StartGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartGameMutation, StartGameMutationVariables>(StartGameDocument, options);
      }
export type StartGameMutationHookResult = ReturnType<typeof useStartGameMutation>;
export type StartGameMutationResult = Apollo.MutationResult<StartGameMutation>;
export type StartGameMutationOptions = Apollo.BaseMutationOptions<StartGameMutation, StartGameMutationVariables>;
export const LobbyFromTokenDocument = gql`
    query lobbyFromToken {
  lobbyFromToken {
    uuid
    users
    startArticle
    endArticle
    options
  }
}
    `;

/**
 * __useLobbyFromTokenQuery__
 *
 * To run a query within a React component, call `useLobbyFromTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useLobbyFromTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLobbyFromTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useLobbyFromTokenQuery(baseOptions?: Apollo.QueryHookOptions<LobbyFromTokenQuery, LobbyFromTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LobbyFromTokenQuery, LobbyFromTokenQueryVariables>(LobbyFromTokenDocument, options);
      }
export function useLobbyFromTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LobbyFromTokenQuery, LobbyFromTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LobbyFromTokenQuery, LobbyFromTokenQueryVariables>(LobbyFromTokenDocument, options);
        }
export type LobbyFromTokenQueryHookResult = ReturnType<typeof useLobbyFromTokenQuery>;
export type LobbyFromTokenLazyQueryHookResult = ReturnType<typeof useLobbyFromTokenLazyQuery>;
export type LobbyFromTokenQueryResult = Apollo.QueryResult<LobbyFromTokenQuery, LobbyFromTokenQueryVariables>;
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

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
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

/**
 * __useUserFromTokenQuery__
 *
 * To run a query within a React component, call `useUserFromTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFromTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFromTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserFromTokenQuery(baseOptions?: Apollo.QueryHookOptions<UserFromTokenQuery, UserFromTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFromTokenQuery, UserFromTokenQueryVariables>(UserFromTokenDocument, options);
      }
export function useUserFromTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFromTokenQuery, UserFromTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFromTokenQuery, UserFromTokenQueryVariables>(UserFromTokenDocument, options);
        }
export type UserFromTokenQueryHookResult = ReturnType<typeof useUserFromTokenQuery>;
export type UserFromTokenLazyQueryHookResult = ReturnType<typeof useUserFromTokenLazyQuery>;
export type UserFromTokenQueryResult = Apollo.QueryResult<UserFromTokenQuery, UserFromTokenQueryVariables>;
export const LobbyDocument = gql`
    subscription lobby($lobbyUuid: String!) {
  lobbySubscription(lobbyUuid: $lobbyUuid) {
    users
  }
}
    `;

/**
 * __useLobbySubscription__
 *
 * To run a query within a React component, call `useLobbySubscription` and pass it any options that fit your needs.
 * When your component renders, `useLobbySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLobbySubscription({
 *   variables: {
 *      lobbyUuid: // value for 'lobbyUuid'
 *   },
 * });
 */
export function useLobbySubscription(baseOptions: Apollo.SubscriptionHookOptions<LobbySubscription, LobbySubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LobbySubscription, LobbySubscriptionVariables>(LobbyDocument, options);
      }
export type LobbySubscriptionHookResult = ReturnType<typeof useLobbySubscription>;
export type LobbySubscriptionResult = Apollo.SubscriptionResult<LobbySubscription>;