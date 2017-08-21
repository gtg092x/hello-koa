import Router from 'koa-router';
import { authMiddleware } from './passport';
const router = new Router();

router.use(async (ctx, next) => {
  ctx.state.message = 'Hello World';
  return next();
});

router.get('/hi', async (ctx) => {
  ctx.body = 'hi ' + ctx.state.message;
});

router.use(authMiddleware(false));

router.get('/', async (ctx) => {
  ctx.body = {message: 'hello!', user: ctx.state.user};
});

export default router;