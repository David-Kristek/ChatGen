import { ApolloClient } from "@apollo/client";
import { Chat, GetChatsDocument } from "../graphql/generated/schema";
import { DocumentNode } from "graphql";
import format from "date-format";
export const contactSelecter = (chat: Chat, userId: string) => {
  const { members, group, name, image } = chat;

  const res = group
    ? { name, image }
    : members[0].member._id === userId
    ? members[1].member
    : members[0].member;
  return res;
};
export const updateChat = (newMessage, apolloClient: ApolloClient<object>) => {
  apolloClient.cache.updateQuery({ query: GetChatsDocument }, (data) => {
    let thisChat;
    if (!data) return null;
    let chats = data.getChats.filter((chat, index) => {
      if (chat._id === newMessage?.chat?._id) {
        thisChat = chat;
        return false;
      }
      return true;
    });
    thisChat = { ...thisChat, lastMessage: newMessage };
    chats = [thisChat, ...chats];
    return {
      getChats: chats,
    };
  });
};
export const addNewMessage = (prev, newMessage) => {
  const message = { ...newMessage, createdAt: new Date() };
  if (!prev) return { getMessages: [message] };
  return {
    getMessages: {
      ...prev.getMessages,
      messages: prev.getMessages.messages
        ? [...prev.getMessages.messages, message]
        : [message],
    },
  };
};
export const formatDate = (time: Date, prevTime = new Date()) => {
  const days = [
    "Monday",
    "Tuesday ",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return time.getDate() === new Date().getDate()
    ? format("hh:mm", time)
    : time.getTime() - prevTime.getTime() > 604800000
    ? format("hh:mm dd.MM.", time)
    : days[time.getDay()] + format(` hh:mm`, time);
};
