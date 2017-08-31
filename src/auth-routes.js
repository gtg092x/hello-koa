import Router from 'koa-router';
import { fetchUser } from './models';
import { getTokenForUser } from './auth';

const router = new Router();

export function generateToken() {
  return async ctx => {
    const { user } = ctx.state;
    if (user === false) {
      ctx.status = 401;
    } else {
      const token = `JWT ${getTokenForUser(user)}`;

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