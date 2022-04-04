import { gql } from "apollo-server-micro";

export const SEARCH_USER = gql`
  query searchForUser($search: String!) {
    searchForUser(text: $search) {
      name
      email
      image
      _id
    }
  }
`;
export const ADD_CONTACT = gql`
  mutation ($addContactId: ID!) {
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
export const GET_CHATS = gql`
  query {
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
        sendFrom {
          name
        }
        body {
          text
        }
      }
    }
  }
`;
export const SEND_MESSAGE = gql`
  mutation SendMessage($body: messageBodyInput, $chatId: ID) {
    sendMessage(body: $body, chatId: $chatId) {
      body {
        text
      }
      chat {
        _id
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($chatId: ID!) {
    getMessages(id: $chatId) {
      _id
      body {
        text
      }
      sendFrom {
        name
        image
        _id
      }
    }
  }
`;
