import Chat from "../../Models/Chat";
import User from "../../Models/User";
import MessageModel from "../../Models/Message";
import { Message as MessageType, User as UserType } from "../generated/schema";
import { context, pubSub } from "../../pages/api/graphql";
import Message from "../../Models/Message";
import { setLastActiveInChat } from "./resolveHelper";
import { isUserInChat } from "./resolveHelper";
export default {
  addContact: async (parent, { id }, { user, pubSub }: context) => {
    const newContact = new Chat({
      members: [{ member: id }, { member: user._id }],
      group: false,
      lastActivity: new Date(),
    });
    const { _id } = await newContact.save();
    const chat = await Chat.findOne({ _id }).populate("members.member");
    await User.updateOne(
      { _id: id },
      { $push: { friends: user._id }, $addToSet: { chats: _id } }
    );
    await User.updateOne(
      { _id: user._id },
      { $push: { friends: id }, $addToSet: { chats: _id } }
    );
    // console.log("published to ", id);

    pubSub.publish("user:newChat", id, chat);
    pubSub.publish("user:newChat", user._id, chat);

    return chat;
  },
  sendMessage: async (parent, { body, chatId }, { user, pubSub }: context) => {
    const chat = await Chat.findOne({
      _id: chatId,
      ...isUserInChat(user),
    });
    if (!chat) return {}; // error chat not found or not member
    const newMessage = await new MessageModel({
      body,
      sendFrom: user._id,
      chat: chatId,
    }).save();

    const message = await Message.findOne({ _id: newMessage._id }).populate([
      "sendFrom",
      "chat",
    ]);

    await Chat.updateOne(
      { _id: chatId },
      { lastMessage: message._id, lastActivity: new Date() }
    );
    const s = await setLastActiveInChat(chatId, user._id, pubSub);

    chat.members.forEach((member) => {
      if (String(member.member) !== user._id) {
        pubSub.publish("user:newMessage", String(member.member), message);
      }
    });

    return message;
  },
  lastActive: async (
    _,
    { chatId },
    { user, pubSub }: { user: UserType; pubSub: pubSub }
  ) => {
    console.log("lastActive", user.name, new Date());
    console.log({
      userId: user._id,
      active: new Date(),
    });
    await setLastActiveInChat(chatId, user._id, pubSub);
    return true;
  },
  userTyping: (_, { chatId }, { user, pubSub }: context) => {
    pubSub.publish("chat:userTyping", chatId, user);    
    return true;
  },
};
