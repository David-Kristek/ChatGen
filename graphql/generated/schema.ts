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

export type Mutation = {
  __typename?: 'Mutation';
  addContact?: Maybe<Chat>;
  broadcastRandomNumber?: Maybe<Scalars['Boolean']>;
  sendMessage?: Maybe<Message>;
};


export type MutationAddContactArgs = {
  id: Scalars['ID'];
};


export type MutationSendMessageArgs = {
  body?: InputMaybe<MessageBodyInput>;
  chatId?: InputMaybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  getChats?: Maybe<Array<Chat>>;
  getMessages?: Maybe<GetMessagesOutput>;
  searchForUser?: Maybe<Array<User>>;
};


export type QueryGetMessagesArgs = {
  id: Scalars['ID'];
};


export type QuerySearchForUserArgs = {
  text: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  globalCounter?: Maybe<Message>;
  newChat?: Maybe<Chat>;
  newMessage?: Maybe<Message>;
};

export type Chat = {
  __typename?: 'chat';
  _id: Scalars['ID'];
  group: Scalars['Boolean'];
  image?: Maybe<Scalars['String']>;
  lastMessage?: Maybe<Message>;
  members: Array<User>;
  name?: Maybe<Scalars['String']>;
};

export type GetMessagesOutput = {
  __typename?: 'getMessagesOutput';
  chat?: Maybe<Chat>;
  messages?: Maybe<Array<Message>>;
};

export type Message = {
  __typename?: 'message';
  _id: Scalars['String'];
  body: MessageBody;
  chat?: Maybe<Chat>;
  sendFrom: User;
};

export type MessageBody = {
  __typename?: 'messageBody';
  text?: Maybe<Scalars['String']>;
};

export type MessageBodyInput = {
  text: Scalars['String'];
};

export type Post = {
  __typename?: 'post';
  author?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
};

export type Response = {
  __typename?: 'response';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'user';
  _id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  friends?: Maybe<Array<User>>;
  image: Scalars['String'];
  name: Scalars['String'];
};

export type SearchForUserQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchForUserQuery = { __typename?: 'Query', searchForUser?: Array<{ __typename?: 'user', name: string, email?: string | null, image: string, _id: string }> | null };

export type AddContactMutationVariables = Exact<{
  addContactId: Scalars['ID'];
}>;


export type AddContactMutation = { __typename?: 'Mutation', addContact?: { __typename?: 'chat', _id: string, group: boolean, members: Array<{ __typename?: 'user', name: string, image: string }> } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', getChats?: Array<{ __typename?: 'chat', _id: string, group: boolean, name?: string | null, image?: string | null, members: Array<{ __typename?: 'user', name: string, image: string, _id: string }>, lastMessage?: { __typename?: 'message', _id: string, sendFrom: { __typename?: 'user', name: string, _id: string, image: string }, body: { __typename?: 'messageBody', text?: string | null } } | null }> | null };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages?: { __typename?: 'getMessagesOutput', messages?: Array<{ __typename?: 'message', _id: string, body: { __typename?: 'messageBody', text?: string | null }, sendFrom: { __typename?: 'user', _id: string, image: string, name: string } }> | null, chat?: { __typename?: 'chat', _id: string, group: boolean, name?: string | null, image?: string | null, members: Array<{ __typename?: 'user', _id: string, name: string, image: string }> } | null } | null };

export type SendMessageMutationVariables = Exact<{
  body?: InputMaybe<MessageBodyInput>;
  chatId?: InputMaybe<Scalars['ID']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'message', _id: string, body: { __typename?: 'messageBody', text?: string | null }, chat?: { __typename?: 'chat', _id: string } | null, sendFrom: { __typename?: 'user', name: string, image: string, _id: string } } | null };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'message', _id: string, sendFrom: { __typename?: 'user', _id: string, name: string, image: string }, body: { __typename?: 'messageBody', text?: string | null }, chat?: { __typename?: 'chat', _id: string } | null } | null };

export type NewChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewChatSubscription = { __typename?: 'Subscription', newChat?: { __typename?: 'chat', _id: string, group: boolean, name?: string | null, image?: string | null, members: Array<{ __typename?: 'user', name: string, image: string }>, lastMessage?: { __typename?: 'message', body: { __typename?: 'messageBody', text?: string | null } } | null } | null };


export const SearchForUserDocument = gql`
    query searchForUser($search: String!) {
  searchForUser(text: $search) {
    name
    email
    image
    _id
  }
}
    `;

/**
 * __useSearchForUserQuery__
 *
 * To run a query within a React component, call `useSearchForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForUserQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchForUserQuery(baseOptions: Apollo.QueryHookOptions<SearchForUserQuery, SearchForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForUserQuery, SearchForUserQueryVariables>(SearchForUserDocument, options);
      }
export function useSearchForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForUserQuery, SearchForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForUserQuery, SearchForUserQueryVariables>(SearchForUserDocument, options);
        }
export type SearchForUserQueryHookResult = ReturnType<typeof useSearchForUserQuery>;
export type SearchForUserLazyQueryHookResult = ReturnType<typeof useSearchForUserLazyQuery>;
export type SearchForUserQueryResult = Apollo.QueryResult<SearchForUserQuery, SearchForUserQueryVariables>;
export const AddContactDocument = gql`
    mutation AddContact($addContactId: ID!) {
  addContact(id: $addContactId) {
    _id
    members {
      name
      image
    }
    group
  }
}
    `;
export type AddContactMutationFn = Apollo.MutationFunction<AddContactMutation, AddContactMutationVariables>;

/**
 * __useAddContactMutation__
 *
 * To run a mutation, you first call `useAddContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContactMutation, { data, loading, error }] = useAddContactMutation({
 *   variables: {
 *      addContactId: // value for 'addContactId'
 *   },
 * });
 */
export function useAddContactMutation(baseOptions?: Apollo.MutationHookOptions<AddContactMutation, AddContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContactMutation, AddContactMutationVariables>(AddContactDocument, options);
      }
export type AddContactMutationHookResult = ReturnType<typeof useAddContactMutation>;
export type AddContactMutationResult = Apollo.MutationResult<AddContactMutation>;
export type AddContactMutationOptions = Apollo.BaseMutationOptions<AddContactMutation, AddContactMutationVariables>;
export const GetChatsDocument = gql`
    query getChats {
  getChats {
    _id
    group
    name
    image
    members {
      name
      image
      _id
    }
    lastMessage {
      _id
      sendFrom {
        name
        _id
        image
      }
      body {
        text
      }
    }
  }
}
    `;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
      }
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($chatId: ID!) {
  getMessages(id: $chatId) {
    messages {
      _id
      body {
        text
      }
      sendFrom {
        _id
        image
        name
      }
    }
    chat {
      _id
      group
      name
      image
      members {
        _id
        name
        image
      }
    }
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($body: messageBodyInput, $chatId: ID) {
  sendMessage(body: $body, chatId: $chatId) {
    _id
    body {
      text
    }
    chat {
      _id
    }
    sendFrom {
      name
      image
      _id
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      body: // value for 'body'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    _id
    sendFrom {
      _id
      name
      image
    }
    body {
      text
    }
    chat {
      _id
    }
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const NewChatDocument = gql`
    subscription NewChat {
  newChat {
    _id
    members {
      name
      image
    }
    group
    name
    image
    lastMessage {
      body {
        text
      }
    }
  }
}
    `;

/**
 * __useNewChatSubscription__
 *
 * To run a query within a React component, call `useNewChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewChatSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewChatSubscription, NewChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewChatSubscription, NewChatSubscriptionVariables>(NewChatDocument, options);
      }
export type NewChatSubscriptionHookResult = ReturnType<typeof useNewChatSubscription>;
export type NewChatSubscriptionResult = Apollo.SubscriptionResult<NewChatSubscription>;