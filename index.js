'use strict';
const http = require('node:http');
const server = http.createServer((req, res) => {
  const now = Date.now();
  const expiresDate = new Date(now + 30 * 86400 * 1000);//now+の後ろが30日後の計算式
  //先生のコード（now+1000+60*60*24*30）1000が1秒、60掛けると分、60掛けると時間、24掛けると日、
  console.log(expiresDate.toUTCString());
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader('Set-Cookie', `last_access=${now};expires=${expiresDate.toUTCString()};`);
  const last_access_time = req.headers.cookie ? parseInt(req.headers.cookie.split('last_access=')[1]) : now;
  res.end(new Date(last_access_time).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
});
const port = 8000;
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});
