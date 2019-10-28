const port = 3000;
const path = require('path');
const fs = require('fs');
const http2 = require('http2');
const koa = require('koa');
const app = new koa();
require('./mongodbcon');
const Device = require('./modules/device');

const options = {
  key: fs.readFileSync(path.join(__dirname + '/key/localhost-privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname + '/key/localhost-cert.pem'))
};

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
const { Transform } = require('stream');

app.use(async (ctx) => {
  const cursor = Device.find({}).cursor();
  // 转换流也是双工流。
const myTransform = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
        const str = chunk.toString()
      console.log('chunk', typeof chunk);
      callback(null, str);
    }
  });
  cursor.pipe(myTransform)
  ctx.body = myTransform
});

//创建HTTP2服务器
const server = http2.createSecureServer(options, app.callback());
server.listen(port, () => {
  console.log('http2 service start on', port);
});
