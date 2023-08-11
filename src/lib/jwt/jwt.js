import config from '../../config/config.js';
import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import persistence from '../../daos/persistence.js';

const { userManager } = persistence;
const SECRET_KEY = config.SECRET_KEY;

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const cookieExtractor = (req) => {
  const token = req.cookies.token;
  console.log('Token extraído:', token);
  return token;
};

const cookieStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: SECRET_KEY,
};

const verifyToken = async (jwt_payload, done) => {
  try {
    console.log('Verifying token...');
    console.log('JWT Payload:', jwt_payload);
    const user = await userManager.getById(jwt_payload.userId);
    console.log('user en verifyToken: ', user);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    console.log(error);
  }
};

// export const checkAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.get('Authorization');
//     if (!authHeader)
//       return res
//         .status(401)
//         .json({ msg: 'Unauthorized porque no hay authheader' });
//     const token = authHeader.split(' ')[1];
//     const decode = jwt.verify(token, SECRET_KEY);
//     const user = await userManager.getById(decode.userId);
//     if (!user)
//       return res.status(401).json({ msg: 'Unauthorized porque no hay user' });
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

passport.use('jwt', new jwtStrategy(strategyOptions, verifyToken));
passport.use('jwtCookies', new jwtStrategy(cookieStrategyOptions, verifyToken));

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getById(id);
  return done(null, user);
});
