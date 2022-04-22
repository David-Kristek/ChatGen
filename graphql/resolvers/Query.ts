import Chat from "../../Models/Chat";
import Message from "../../Models/Message";
import User from "../../Models/User";
import { context, pubSub } from "../../pages/api/graphql";
import {   isUserInChat, setLastActiveInChat } from "./resolveHelper";

export default {
  searchForUser: async (parent, { text }, { user }) => {
    const thisUser = await User.findOne({ _id: user._id });
    const users = await User.find({
      $text: { $search: text },
      email: { $ne: user?.email },
      _id: { $nin: thisUser?.friends ?? [] },
    }).limit(3);
    return users;
  },
  getChats: async (parent, args, ctx) => {
    const chats = (
      await User.findOne({ _id: ctx.user._id }, { chats: 1 }).populate({
        path: "chats",
        populate: [
          "members.member",
          { path: "lastMessage", populate: "sendFrom" },
        ],
        options: { sort: { lastActivity: -1 } },
      })
    )?.chats;
    return chats;
  },
  getMessages: async (parent, { id }, { user, pubSub } : context) => {
    console.log("getting messages----");
    
    const chat = await Chat.findOne({
      _id: id,
      ...isUserInChat(user),
    }).populate("members.member");
    const s = await setLastActiveInChat(id, user._id, pubSub);
    
    if (!chat) return {}; // not member of chat
    const messages = await Message.find({
      chat: id,
    })
      .populate("sendFrom")
      .sort({ createdAt: 1 });

    return { messages, chat };
  },
};
