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
  Date: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  addContact?: Maybe<Chat>;
  broadcastRandomNumber?: Maybe<Scalars['Boolean']>;
  lastActive?: Maybe<Scalars['Boolean']>;
  messageRead?: Maybe<Scalars['Boolean']>;
  sendMessage?: Maybe<Message>;
  userTyping?: Maybe<Scalars['Boolean']>;
};


export type MutationAddContactArgs = {
  id: Scalars['ID'];
};


export type MutationLastActiveArgs = {
  chatId: Scalars['ID'];
};


export type MutationMessageReadArgs = {
  messageId: Scalars['ID'];
};


export type MutationSendMessageArgs = {
  body?: InputMaybe<MessageBodyInput>;
  chatId?: InputMaybe<Scalars['ID']>;
};


export type MutationUserTypingArgs = {
  chatId: Scalars['ID'];
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
  isUserTyping?: Maybe<User>;
  newChat?: Maybe<Chat>;
  newMessage?: Maybe<Message>;
  nowActiveInChat?: Maybe<NowActiveInChatOutput>;
};


export type SubscriptionIsUserTypingArgs = {
  chatId: Scalars['ID'];
};


export type SubscriptionNowActiveInChatArgs = {
  chatId: Scalars['ID'];
};

export type Chat = {
  __typename?: 'chat';
  _id: Scalars['ID'];
  group: Scalars['Boolean'];
  image?: Maybe<Scalars['String']>;
  lastMessage?: Maybe<Message>;
  members: Array<Member>;
  name?: Maybe<Scalars['String']>;
};

export type GetMessagesOutput = {
  __typename?: 'getMessagesOutput';
  chat: Chat;
  messages?: Maybe<Array<Message>>;
};

export type Member = {
  __typename?: 'member';
  lastActive: Scalars['Date'];
  member: User;
};

export type Message = {
  __typename?: 'message';
  _id: Scalars['String'];
  body: MessageBody;
  chat?: Maybe<Chat>;
  createdAt?: Maybe<Scalars['Date']>;
  sendFrom: User;
};

export type MessageBody = {
  __typename?: 'messageBody';
  text?: Maybe<Scalars['String']>;
};

export type MessageBodyInput = {
  text: Scalars['String'];
};

export type NowActiveInChatOutput = {
  __typename?: 'nowActiveInChatOutput';
  active?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
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


export type AddContactMutation = { __typename?: 'Mutation', addContact?: { __typename?: 'chat', _id: string, group: boolean, members: Array<{ __typename?: 'member', member: { __typename?: 'user', name: string, image: string } }> } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', getChats?: Array<{ __typename?: 'chat', _id: string, group: boolean, name?: string | null, image?: string | null, members: Array<{ __typename?: 'member', lastActive: any, member: { __typename?: 'user', name: string, image: string, _id: string } }>, lastMessage?: { __typename?: 'message', _id: string, sendFrom: { __typename?: 'user', name: string, _id: string, image: string }, body: { __typename?: 'messageBody', text?: string | null } } | null }> | null };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages?: { __typename?: 'getMessagesOutput', messages?: Array<{ __typename?: 'message', _id: string, createdAt?: any | null, body: { __typename?: 'messageBody', text?: string | null }, sendFrom: { __typename?: 'user', _id: string, image: string, name: string } }> | null, chat: { __typename?: 'chat', _id: string, group: boolean, name?: string | null, image?: string | null, members: Array<{ __typename?: 'member', lastActive: any, member: { __typename?: 'user', _id: string, name: string, image: string } }> } } | null };

export type SendMessageMutationVariables = Exact<{
  body?: InputMaybe<MessageBodyInput>;
  chatId?: InputMaybe<Scalars['ID']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'message', _id: string, body: { __typename?: 'messageBody', text?: string | null }, chat?: { __typename?: 'chat', _id: string } | null, sendFrom: { __typename?: 'user', name: string, image: string, _id: string } } | null };

export type LastActiveMutationVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type LastActiveMutation = { __typename?: 'Mutation', lastActive?: boolean | null };

export type UserTypingMutationVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type UserTypingMutation = { __typename?: 'Mutation', userTyping?: boolean | null };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'message', _id: string, sendFrom: { __typename?: 'user', _id: string, name: string, image: string }, body: { __typename?: 'messageBody', text?: string | null }, chat?: { __typename?: 'chat', _id: string } | null } | null };

export type NewChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewChatSubscription = { __typename?: 'Subscription', newChat?: { __typename?: 'chat', _id: string, group: boolean, name?: string | null, image?: string | null, members: Array<{ __typename?: 'member', lastActive: any, member: { __typename?: 'user', name: string, image: string } }>, lastMessage?: { __typename?: 'message', body: { __typename?: 'messageBody', text?: string | null } } | null } | null };

export type MemberActiveInChatSubscriptionVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type MemberActiveInChatSubscription = { __typename?: 'Subscription', nowActiveInChat?: { __typename?: 'nowActiveInChatOutput', userId?: string | null, active?: any | null } | null };

export type IsUserTypingSubscriptionVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type IsUserTypingSubscription = { __typename?: 'Subscription', isUserTyping?: { __typename?: 'user', _id: string, name: string, image: string } | null };


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
      member {
        name
        image
      }
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
      member {
        name
        image
        _id
      }
      lastActive
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
      createdAt
    }
    chat {
      _id
      group
      name
      image
      members {
        member {
          _id
          name
          image
        }
        lastActive
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
export const LastActiveDocument = gql`
    mutation LastActive($chatId: ID!) {
  lastActive(chatId: $chatId)
}
    `;
export type LastActiveMutationFn = Apollo.MutationFunction<LastActiveMutation, LastActiveMutationVariables>;

/**
 * __useLastActiveMutation__
 *
 * To run a mutation, you first call `useLastActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLastActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lastActiveMutation, { data, loading, error }] = useLastActiveMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useLastActiveMutation(baseOptions?: Apollo.MutationHookOptions<LastActiveMutation, LastActiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LastActiveMutation, LastActiveMutationVariables>(LastActiveDocument, options);
      }
export type LastActiveMutationHookResult = ReturnType<typeof useLastActiveMutation>;
export type LastActiveMutationResult = Apollo.MutationResult<LastActiveMutation>;
export type LastActiveMutationOptions = Apollo.BaseMutationOptions<LastActiveMutation, LastActiveMutationVariables>;
export const UserTypingDocument = gql`
    mutation UserTyping($chatId: ID!) {
  userTyping(chatId: $chatId)
}
    `;
export type UserTypingMutationFn = Apollo.MutationFunction<UserTypingMutation, UserTypingMutationVariables>;

/**
 * __useUserTypingMutation__
 *
 * To run a mutation, you first call `useUserTypingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserTypingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userTypingMutation, { data, loading, error }] = useUserTypingMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useUserTypingMutation(baseOptions?: Apollo.MutationHookOptions<UserTypingMutation, UserTypingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserTypingMutation, UserTypingMutationVariables>(UserTypingDocument, options);
      }
export type UserTypingMutationHookResult = ReturnType<typeof useUserTypingMutation>;
export type UserTypingMutationResult = Apollo.MutationResult<UserTypingMutation>;
export type UserTypingMutationOptions = Apollo.BaseMutationOptions<UserTypingMutation, UserTypingMutationVariables>;
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
      member {
        name
        image
      }
      lastActive
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
export const MemberActiveInChatDocument = gql`
    subscription MemberActiveInChat($chatId: ID!) {
  nowActiveInChat(chatId: $chatId) {
    userId
    active
  }
}
    `;

/**
 * __useMemberActiveInChatSubscription__
 *
 * To run a query within a React component, call `useMemberActiveInChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMemberActiveInChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberActiveInChatSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMemberActiveInChatSubscription(baseOptions: Apollo.SubscriptionHookOptions<MemberActiveInChatSubscription, MemberActiveInChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MemberActiveInChatSubscription, MemberActiveInChatSubscriptionVariables>(MemberActiveInChatDocument, options);
      }
export type MemberActiveInChatSubscriptionHookResult = ReturnType<typeof useMemberActiveInChatSubscription>;
export type MemberActiveInChatSubscriptionResult = Apollo.SubscriptionResult<MemberActiveInChatSubscription>;
export const IsUserTypingDocument = gql`
    subscription IsUserTyping($chatId: ID!) {
  isUserTyping(chatId: $chatId) {
    _id
    name
    image
  }
}
    `;

/**
 * __useIsUserTypingSubscription__
 *
 * To run a query within a React component, call `useIsUserTypingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIsUserTypingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserTypingSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useIsUserTypingSubscription(baseOptions: Apollo.SubscriptionHookOptions<IsUserTypingSubscription, IsUserTypingSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<IsUserTypingSubscription, IsUserTypingSubscriptionVariables>(IsUserTypingDocument, options);
      }
export type IsUserTypingSubscriptionHookResult = ReturnType<typeof useIsUserTypingSubscription>;
export type IsUserTypingSubscriptionResult = Apollo.SubscriptionResult<IsUserTypingSubscription>;