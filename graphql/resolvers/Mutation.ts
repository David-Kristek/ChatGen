import Chat from "../../Models/Chat";
import User from "../../Models/User";
import MessageModel from "../../Models/Message";

export default {
  addContact: async (parent, { id }, { user }) => {
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
    return chat;
  },
  sendMessage: async (parent, { body, chatId }, { user }) => {
    console.log(new Date());

    const isUserInChat = await Chat.findOne({
      _id: chatId,
      members: user._id,
    });
    if (!isUserInChat) return {}; // error
    const newMessage = new MessageModel({
      body,
      sendFrom: user._id,
      chat: chatId,
    });
    const message = await newMessage.save();

    await Chat.updateOne(
      { _id: chatId },
      { lastMessage: message._id, lastActivity: new Date() }
    );

    return message;
  },
};
