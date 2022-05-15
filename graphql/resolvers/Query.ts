import Chat from "../../Models/Chat";
import Message from "../../Models/Message";
import User from "../../Models/User";
import { context, pubSub } from "../../pages/api/graphql";
import { isUserInChat, setLastActiveInChat } from "./resolveHelper";

export default {
  searchForUser: async (parent, { text }, { user, pubSub }: context) => {
    const thisUser = await User.findOne({ _id: user._id });
    const users = await User.find({
      $text: { $search: text },
      email: { $ne: user?.email },
      _id: { $nin: thisUser?.friends ?? [] },
    }).limit(3);
    // const newMessage = await new Message({
    //   body: {text: "Ahoj"},
    //   sendFrom: "62487fb5a68be9d1aba3ea19",
    //   chat: "6280dff86a8521452d4b2387",
    // }).save();

    // const message = await Message.findOne({ _id: newMessage._id }).populate([
    //   "sendFrom",
    //   "chat",
    // ]);
    // pubSub.publish("user:newMessage", String("62487fb5a68be9d1aba3ea19"), message);
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
  getMessages: async (parent, { id, cursor }, { user, pubSub }: context) => {
    const chat = await Chat.findOne({
      _id: id,
      ...isUserInChat(user),
    });
    await setLastActiveInChat(id, user._id, pubSub);
    if (!chat) return {}; // not member of chat
    const messages = await Message.find({
      chat: id,
    })
      .populate("sendFrom")
      .sort({ createdAt: -1 })
      .skip(cursor ? cursor : 0)
      .limit(14);

    return messages.reverse();
  },
  getCurrentChat: async (parent, { chatId }, { user, pubSub }: context) => {
    const chat = await Chat.findOne({
      _id: chatId,
      ...isUserInChat(user),
    }).populate("members.member");
    return chat;
  },
};
