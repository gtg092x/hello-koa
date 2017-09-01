import Koa from 'koa';
import router from './routes';
import passport from './passport';
import bodyParser from 'koa-bodyparser';
import { jwtMiddleware } from './passport';
const app = new Koa();

const { PORT = 3002 } = process.env;

app.use(bodyParser());
app.use(passport.initialize());
app.use(jwtMiddleware());

app.use(router.routes());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));