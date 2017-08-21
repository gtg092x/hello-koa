import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'koa-passport';


import { fetchUser } from './models';

passport.serializeUser(function(user, done) {
  console.log('SERIALIZED', user.id);
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser();
    console.log('FETCHED', user);
    done(null, user)
  } catch(err) {
    done(err)
  }
});


passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
  issuer: 'hixme.com',
  audience: 'hixme.com'
}, function(jwt_payload, done) {
  console.log('FETCH in STRAT', jwt_payload);
  fetchUser(jwt_payload.sub).then(user => {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  }).catch(err => {
    done(err, false);
  });
}));


export default passport;

export const authMiddleware = (required = true) => async (ctx, next) =>
  passport.authenticate(['jwt'], function(err, user, info, status) {
    console.log('info', user, info, status);
    if (user === false && required) {
      return ctx.throw(401);
    } else if (user) {
      ctx.login(user)
    }
    next();
  })(ctx);