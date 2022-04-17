import Chat from "../../Models/Chat";
import User from "../../Models/User";
import MessageModel from "../../Models/Message";
import { Message as MessageType, User as UserType } from "../generated/schema";
import { pubSub } from "../../pages/api/graphql";
import Message from "../../Models/Message";

export default {
  addContact: async (
    parent,
    { id },
    { user, pubSub }: { user: UserType; pubSub: pubSub }
  ) => {
    const newContact = new Chat({
      members: [id, user._id],
      group: false,
      lastActivity: new Date(),
    });
    const { _id } = await newContact.save();
    const chat = await Chat.findOne({ _id }).populate("members");
    await User.updateOne(
      { _id: id },
      { $push: { friends: user._id }, $addToSet: { chats: _id } }
    );
    await User.updateOne(
      { _id: user._id },
      { $push: { friends: id }, $addToSet: { chats: _id } }
    );
    pubSub.publish("user:newChat", id, chat._id);

    return chat;
  },
  sendMessage: async (
    parent,
    { body, chatId },
    { user, pubSub }: { user: UserType; pubSub: pubSub }
  ) => {
    const chat = await Chat.findOne({
      _id: chatId,
      members: user._id,
    });
    if (!chat) return {}; // error chat not found or not member
    const newMessage = await new MessageModel({
      body,
      sendFrom: user._id,
      chat: chatId,
    }).save();
    console.log(newMessage);

    const message = await Message.findOne({ _id: newMessage._id }).populate(["sendFrom", "chat"]);

    await Chat.updateOne(
      { _id: chatId },
      { lastMessage: message._id, lastActivity: new Date() }
    );
    chat.members.forEach((member) => {
      if (String(member) !== user._id) {
        pubSub.publish("user:newMessage", String(member), message);
      }
    });
    return message;
  },
};
