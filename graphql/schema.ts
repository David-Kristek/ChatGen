import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    searchForUser(text: String!): [user!]
    getChats: [chat!]
    getMessages(id: ID!): [message]
  }

  type Mutation {
    addContact(id: ID!): chat
    sendMessage(body: messageBodyInput, chatId: ID): message
  }

  type user {
    _id: ID!
    name: String!
    email: String!
    emailVerified: Boolean!
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
    text: String
  }
  type message {
    _id: String
    sendFrom: user
    body: messageBody
    chat: chat
  }
`;
