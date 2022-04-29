const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/kakao", passport.authenticate("kakao"));

const kakaoCallback = (req, res, next) => {
  passport.authenticate("kakao", { failureRedirect: "/" }, (err, user) => {
    if (err) return next(err);
    const { userId, nickname } = user;
    // const userId = "abcd@kakao.com";
    // const nickname = "ohjinwoo";
    const token = jwt.sign({ userId: userId }, "kakao-secret-key");

    result = {
      // hi: user.hi,
      token,
      userId: userId,
      nickname: nickname,
    };
    console.log(result);
    res.send({ user: result });
  })(req, res, next);
};
router.get("/kakao/callback", kakaoCallback);
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const jwt = require("jsonwebtoken");

// router.get("/kakao", passport.authenticate("kakao"));

// const kakaoCallback = (req, res, next) => {
//   passport.authenticate(
//     "kakao",
//     { failureRedirect: "/" },
//     (err, user, info) => {
//       if (err) return next(err);
//       console.log("콜백~~~");
//       const { userId, nickname } = user;
//       const token = jwt.sign({ userId: userId }, "velog-secret-key");

//       result = {
//         token,
//         userId: userId,
//         nickname: nickname,
//       };
//       console.log(result);
//       res.send({ user: result });
//     }
//   )(req, res, next);
// };
// router.get("/kakao/callback", kakaoCallback);
// module.exports = router;
