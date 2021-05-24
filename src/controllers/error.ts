import { Context } from 'koa'

export default function errorController (err: Error, ctx: Context) {
    ctx.status = 500;
    ctx.statusText = "Internal Server Error";
    console.error('server error', err)
    if (ctx.app.env === "development") {
        //throw the error to frontEnd when in the develop mode
        ctx.res.end(err.stack); //finish the response
      } else {
        ctx.body = { code: -1, message: "Server Error" };
      }
}
