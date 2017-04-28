'use strict';

const status = require('http-status');
const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('kcors');
const app = new Koa();

const HOST_PORT = Number(process.env.HOST_PORT) || 5000;

app.use(logger());
app.use(cors({
    allowHeaders: ['Content-Type', 'Access-Control-Allow-Headers', 'Authorization', 'X-Requested-With']
}));

// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});

// catch 404 and forward to error handler
app.use((ctx, next) => next()
    .then(() => {
        const status = ctx.status || 404;
        if (status === 404) ctx.throw(404);
    }).catch((err) => {
        if (err.status !== 404) return;
        ctx.status = err.status;
        ctx.type = 'json';
        ctx.body = {
            message: 'Page Not Found'
        };
    })
);

// error handler
app.use((ctx, next) => next()
    .catch((err) => {
        ctx.status = err.status || 500;
        ctx.body = {
            err: err.message
        };
    })
);

app.listen(HOST_PORT);