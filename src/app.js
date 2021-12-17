const Koa = require('koa');
const koaBody = require('koa-body');
const routes = require('./routes/routes.js');
const cors = require('koa2-cors');

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);
