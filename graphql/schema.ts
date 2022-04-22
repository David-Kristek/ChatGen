import { gql } from "apollo-server-micro";
import { Field, ObjectType } from "type-graphql";

export const typeDefs = gql`
  scalar Date

  type Query {
    searchForUser(text: String!): [user!]
    getChats: [chat!]
    getMessages(id: ID!): getMessagesOutput
  }

  type Mutation {
    addContact(id: ID!): chat
    sendMessage(body: messageBodyInput, chatId: ID): message
    broadcastRandomNumber: Boolean
    lastActive(chatId: ID!): Boolean
    messageRead(messageId: ID!): Boolean
  }
  type Subscription {
    newMessage: message
    newChat: chat
    globalCounter: message
    nowActiveInChat(chatId: ID!): nowActiveInChatOutput
  }
  type user {
    _id: ID!
    name: String!
    email: String
    emailVerified: Boolean
    friends: [user!]
    image: String!
  }
  type chat {
    _id: ID!
    members: [member!]!
    group: Boolean!
    name: String
    image: String
    lastMessage: message
  }
  type member {
    member: user!
    lastActive: Date!
  }
  type response {
    success: Boolean!
  }
  type messageBody {
    text: String
  }
  input messageBodyInput {
    text: String!
  }
  type message {
    _id: String!
    sendFrom: user!
    body: messageBody!
    chat: chat
    createdAt: Date
  }
  type post {
    author: String
    comment: String
  }
  type getMessagesOutput {
    messages: [message!]
    chat: chat!
  }
  type nowActiveInChatOutput {
    userId: String
    active: Date
  }
`;
