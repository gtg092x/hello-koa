import jwt from 'jsonwebtoken';

export const getTokenForUser = user => jwt.sign({id: user.id}, 'secret', {
  audience: 'hixme.com',
  issuer: 'hixme.com',
});

export const jwtMiddleware = () => async (ctx, next) => {
  await next();
  if (ctx.state.user) {
    const token = getTokenForUser(ctx.state.user);
    ctx.set('Authorization', token);
    ctx.cookies.set('JWT', token);
  }
};