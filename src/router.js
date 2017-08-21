import Router from 'koa-router';
import helloRoutes from './hello-routes';
import otherRoutes from './other-routes';
import authRoutes from './auth-routes';

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

router.all(/(.*)/, async (ctx) => {
  ctx.status = 404;
  ctx.body = new ResponseError({message: 'Not found!', foo: 'bar'});
});

export default router;