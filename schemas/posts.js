const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    unique: true,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  transaction: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  changeAddress: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: Object,
    required: true,
  },
  done: {
    type: String,
    required: true,
  },
  likeCnt: {
    type: Number,
    required: true,
  },
});

//몽고디비 고유의 id값을 가져오는 코드
postSchema.virtual("postid").get(function () {
  //몽고디비에서 이렇게 사용해라! 라고 만든 것이기 때문에 임의로 변경해서는 안된다
  return this._id.toHexString();
});
postSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Post", postSchema);
