import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'koa-passport';
import { fetchUser } from './models/user';
import jwt from 'jsonwebtoken';

export const getTokenForUser = user => jwt.sign({id: user.id}, 'secret', {
  audience: 'hixme.com',
  issuer: 'hixme.com',
});

export const jwtMiddleware = () => async (ctx, next) => {
  const jwtCookie = ctx.cookies.get('JWT');
  if (!ctx.get('Authorization') && jwtCookie) {
    ctx.request.headers['authorization'] = `Bearer ${jwtCookie}`;
  }
  await next();
  if (ctx.state.user) {
    const token = getTokenForUser(ctx.state.user);
    ctx.set('Authorization', `Bearer ${token}`);
    ctx.cookies.set('JWT', token);
  }
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser();
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
    if (user === false && required) {
      return ctx.throw(401);
    } else if (user) {
      ctx.login(user)
    }
    next();
  })(ctx);