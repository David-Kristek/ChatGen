import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    name: String,
    image: String,
    group: Boolean,
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
