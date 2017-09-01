import Router from 'koa-router';
import helloRoutes from './hello';
import otherRoutes from './other';
import authRoutes from './auth';

const router = new Router();

router.use('/app', helloRoutes.routes(), helloRoutes.allowedMethods());
router.use('/other', otherRoutes.routes(), otherRoutes.allowedMethods());
router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());

class ResponseError extends Error {
  constructor(body) {
    super(body.message);
    this.body = body;
  }
  toJSON() {
    return {
      stack: this.stack,
      ...this.body,
    };
  }
}

router.post('/test-post/:id', async (ctx) => {
  ctx.body = {message: 'Complete', data: ctx.data, params: ctx.params, query: ctx.query, body: ctx.request.body};
});

router.all(/(.*)/, async (ctx) => {
  ctx.status = 404;
  ctx.body = new ResponseError({message: 'Not found!', foo: 'bar'});
});

export default router;