import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    body: { text: String },
    sendFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    // readBy: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //   }
    // ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.message ||
  mongoose.model("message", messageSchema);
