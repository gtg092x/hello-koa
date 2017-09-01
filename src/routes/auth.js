import Router from 'koa-router';
import { fetchUser } from '../models';
import { getTokenForUser } from '../passport';

const router = new Router();

router.post('/login',
  async function (ctx) {
    const { username, password } = ctx.request.body;
    const user = await fetchUser({ username });
    if (user && username === user.username && password === user.password) {
      ctx.login(user);
      ctx.status = 200;
      ctx.body = {
        token: `JWT ${getTokenForUser(user)}`,
        user,
      };
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
  },
);

export default router;