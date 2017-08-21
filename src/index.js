import app from './app';
import router from './router';
import passport from './passport';

app.use(passport.initialize());
app.use(router.routes());

app.listen(3000, () => console.log('Listening on 3000'));