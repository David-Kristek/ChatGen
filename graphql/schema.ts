import { gql } from "apollo-server-micro";
import { Field, ObjectType } from "type-graphql";

export const typeDefs = gql`
  scalar Date
  type Query {
    searchForUser(text: String!): [user!]
    getChats: [chat!]
    getMessages(id: ID!, cursor: Int): [message!]
    getCurrentChat(chatId: ID!): chat!
  }

  type Mutation {
    addContact(id: ID!): chat
    sendMessage(body: messageBodyInput, chatId: ID): message
    broadcastRandomNumber: Boolean
    lastActive(chatId: ID!): Boolean
    messageRead(messageId: ID!): Boolean
    userTyping(chatId: ID!): Boolean
    approveChat(chatId: ID!): Boolean
    removeChat(chatId: ID!): Boolean
  }
  type Subscription {
    newMessage: message
    newChat: chat
    globalCounter: message
    nowActiveInChat(chatId: ID!): nowActiveInChatOutput
    isUserTyping(chatId: ID!): user
    chatActions(chatId: ID!): String
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
    approved: Boolean
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
    msg: String
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
  type nowActiveInChatOutput {
    userId: String
    active: Date
  }
`;
