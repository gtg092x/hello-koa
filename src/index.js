import Koa from 'koa';
import router from './router';
import passport from './passport';
import bodyParser from 'koa-bodyparser';
import { jwtMiddleware } from './auth';
const app = new Koa();

const { PORT = 3002 } = process.env;

app.use(bodyParser());
app.use(passport.initialize());
app.use(jwtMiddleware());

app.use(router.routes());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));