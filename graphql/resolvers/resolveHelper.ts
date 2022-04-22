import Chat from "../../Models/Chat";
import { pubSub } from "../../pages/api/graphql";

export const setLastActiveInChat = (chatId, userId, pubSub: pubSub) => {
  // console.log(userId, new Date().getHours(), ":", new Date().getMinutes());
  pubSub.publish("chat:memberActive", chatId, {
    userId: userId,
    active: new Date(),
  });
  return Chat.updateOne(
    { _id: chatId, "members.member": userId },
    { $set: { "members.$.lastActive": new Date() } }
  );
};
export const isUserInChat = (user) => ({
  members: { $elemMatch: { member: user._id } },
});
