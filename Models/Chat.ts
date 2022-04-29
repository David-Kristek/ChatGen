import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    members: [
      {
        // _id: false,
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        lastActive: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    name: String,
    image: String,
    group: Boolean,
    approved: {type: Boolean, default: false}, 
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    lastActivity: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.chat || mongoose.model("chat", chatSchema);
