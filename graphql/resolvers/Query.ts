import Chat from "../../Models/Chat";
import Message from "../../Models/Message";
import User from "../../Models/User";

export default {
  searchForUser: async (parent, { text }, { user }) => {
    const thisUser = await User.findOne({ _id: user._id });
    const users = await User.find({
      $and: [
        { $text: { $search: text } },
        { email: { $ne: user?.email } },
        { _id: { $nin: thisUser.friends ?? [] } },
      ],
    }).limit(3);
    return users;
  },
  getChats: async (parent, args, { user }) => {
    const chats = (
      await User.findOne({ _id: user._id }, { chats: 1 }).populate({
        path: "chats",
        populate: ["members", { path: "lastMessage", populate: "sendFrom" }],
        options: { sort: { lastActivity: -1 } },
      })
    ).chats;
    return chats;
  },
  getMessages: async (parent, { id }, { user }) => {
    const messages = await Message.find({
      chat: id,
      members: user._id,
    }).populate("sendFrom").sort({createdAt: 1});
    console.log(id, messages);

    return messages;
  },
};
