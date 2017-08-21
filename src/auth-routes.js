import Router from 'koa-router';
import { fetchUser } from './models';
import jwt from 'jsonwebtoken';

const router = new Router();

export function generateToken() {
  return async ctx => {
    console.log('generating token....')
    console.log(ctx.state)
    const { user } = ctx.state;
    if (user === false) {
      ctx.status = 401;
    } else {
      console.log('USER GENERATE', user);
      const _token = jwt.sign({id: user.id}, 'secret', {
        audience: 'hixme.com',
        issuer: 'hixme.com',
      });
      const token = `JWT ${_token}`;

      const currentUser = await fetchUser({id: user.id});

      ctx.status = 200;
      ctx.body = {
        token,
        user: currentUser,
      };
    }
  };
}

router.post('/login',
  async function (ctx) {
    const { username, password } = ctx.request.body;
    const user = await fetchUser({ username });
    if (username === user.username && password === user.password) {
      ctx.login(user);
      return generateToken()(ctx);
    } else {
      ctx.body = { success: false }
      ctx.throw(401)
    }
  },
);

export default router;