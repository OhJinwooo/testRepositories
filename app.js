const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const authRouter = require("./kakao-auth/kakao/kakao");
const passportKakao = require("./kakao-auth");
const connect = require("./schemas");

passportKakao();
connect();

app.use(cors());
app.use("/oauth", authRouter);
app.use(express.json());
// app.use("/api", [postRouter]);

app.listen(port, () => {
  console.log(port, "서버가 연결되었습니다.");
});
