import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerfied: Boolean,
  key: String,
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
  }]
});
export default mongoose.models.user || mongoose.model("user", userSchema);
