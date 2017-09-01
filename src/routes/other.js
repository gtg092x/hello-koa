import Router from 'koa-router';
import { authMiddleware } from '../passport';
const router = new Router();

router.use(authMiddleware());

router.get('/', async (ctx) => {
  ctx.body = 'other ' + ctx.state.message;
});

export default router;