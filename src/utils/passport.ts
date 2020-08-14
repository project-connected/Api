import passport from "passport";
import {User} from "../entities/User";
import passportLocal from 'passport-local';
import {Builder} from "builder-pattern";

const LocalStrategy = passportLocal.Strategy;

// passport.serializeUser<any, any>(async (user, done) => {
//     console.log("strategy 성공 후 호출",user);
//     done(undefined, user);
// });
//
// passport.deserializeUser(async (user, done)=>{
//     console.log("디시리얼");
//     const user = await User.findOne({where:{userId:id}});
//     if (user){
//         done(null, user);
//     }
// });

passport.use("local",new LocalStrategy({usernameField: "email", passwordField:"password",session:false},
    async (email, password, done)=>{
        const user:User = await User.findOne({where:{email}, raw:false})
        if (!user)
            return done(undefined, false, {message:'일치하는 아이디가 없습니다.'});

        const isCorrect = await user.comparePassword(password);
        if (isCorrect)
                return done(undefined, user);
        return done(undefined, false, {message : '비밀번호가 일치하지 않습니다.'});
}));
