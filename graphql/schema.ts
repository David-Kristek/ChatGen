import { gql } from "apollo-server-micro";
import { Field, ObjectType } from "type-graphql";

export const typeDefs = gql`
  type Query {
    searchForUser(text: String!): [user!]
    getChats: [chat!]
    getMessages(id: ID!): getMessagesOutput
  }

  type Mutation {
    addContact(id: ID!): chat
    sendMessage(body: messageBodyInput, chatId: ID): message
    broadcastRandomNumber: Boolean
  }
  type Subscription {
    newMessage: message
    newChat: chat
    globalCounter: message
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
    members: [user!]!
    group: Boolean!
    name: String
    image: String
    lastMessage: message
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
  }
  type post {
    author: String
    comment: String
  }
  type getMessagesOutput {
    messages: [message!]
    chat: chat
  }
`;
