import Router, { RouterContext } from 'koa-router';

const router = new Router();

router.get('/hi', async (ctx: RouterContext) => { 
    ctx.body = 'Hello yyj!';
});

export default router
