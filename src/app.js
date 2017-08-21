import Koa from 'koa';

const app = new Koa();

import bodyParser from 'koa-bodyparser';

app.use(bodyParser());

export default app;
