const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../schemas/user.schemas");
require("dotenv").config();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.clientID, // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: "http://localhost:3000/oauth/kakao/callback", // 카카오 로그인 Redirect URI 경로
      },
      // clientID에 카카오 앱 아이디 추가
      // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
      // accessToken, refreshToken : 로그인 성공 후 카카오가 보내준 토큰
      // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입

      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const exUser = await User.findOne({
            // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
            userId: profile.id,
            provider: "kakao",
            // userId,
            // nickname,
          });

          // console.log("newUser", exUser);
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            // console.log(9999, exUser);
            done(null, exUser); // 로그인 인증 완료
          } else {
            const user = {
              userId: profile.id,
              nickname: profile.username,
              provider: "kakao",
              // profileUrl: profile._raw.kakao_account.profile.profile_image_url,
            };

            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            await User.create(user);
            // console.log("pro", profile);
            // console.log("user", newUser);
            done(null, user); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

// profile{
//   id: 2221693614,
//   provider: 'kakao',
//   username: '김영경',
//   displayName: '김영경',

// _raw: '{"id":2221693614, "connected_at":"2022-04-29T06:05:32Z","properties":{"nickname":"김영경"},
// "kakao_account":{"profile_nickname_needs_agreement":false, "profile_image_needs_agreement":false,
// "profile":{"nickname":"김영경", "thumbnail_image_url":"http://k.kakaocdn.net/dn/bX6fsi/btrAOAZ88w3/wLjKgaZEm4V6oKaQKyJqF1/img_110x110.jpg",
// "profile_image_url":"http://k.kakaocdn.net/dn/bX6fsi/btrAOAZ88w3/wLjKgaZEm4V6oKaQKyJqF1/img_640x640.jpg",

// "is_default_image":false}}}',

//   _json: {
//    id: 2221693614,
//     connected_at: '2022-04-29T06:05:32Z',
//     properties: { nickname: '김영경' },
//     kakao_account: {
//       profile_nickname_needs_agreement: false,
//       profile_image_needs_agreement: false,
//       profile: [Object]
//     }
//   }
