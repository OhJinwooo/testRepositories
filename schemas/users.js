const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  blacklist: {
    type: Array,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  follow: {
    type: Array,
    required: true,
  },
  follower: {
    type: Array,
    required: true,
  },
});
// UserSchema.virtual("userId").get(function () {
//   return this._id.toHexString();
// });
// UserSchema.set("toJSON", {
//   virtuals: true,
// });
module.exports = mongoose.model("User", UserSchema);
