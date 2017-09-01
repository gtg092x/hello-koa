import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Knex from 'knex';
import { Model } from 'objection';
import router from './routes';
import passport from './passport';
import { jwtMiddleware } from './passport';
import knexConfig from '../knexfile';

const { STAGE = 'dev' } = process.env;
const knex = Knex(knexConfig[STAGE]);
Model.knex(knex);

const app = new Koa();

const { PORT = 3002 } = process.env;

app.use(bodyParser());
app.use(passport.initialize());
app.use(jwtMiddleware());

app.use(router.routes());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));