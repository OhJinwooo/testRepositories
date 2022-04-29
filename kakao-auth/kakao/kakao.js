const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/kakao", passport.authenticate("kakao"));

const kakaoCallback = (req, res, next) => {
  passport.authenticate("kakao", { failureRedirect: "/" }, (err, user) => {
    if (err) return next(err);
    const { userId, nickname } = user;
    const token = jwt.sign({ nickname: nickname }, "kakao-secret-key");

    result = {
      token,
      userId: userId,
      nickname: userName,
    };
    console.log(result);
    res.send({ user: result });
  })(req, res, next);
};
router.get("/kakao/callback", kakaoCallback);
module.exports = router;
