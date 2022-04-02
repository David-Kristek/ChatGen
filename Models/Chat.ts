import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    name: String,
    image: String,
    group: Boolean,
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.chat || mongoose.model("chat", chatSchema);
