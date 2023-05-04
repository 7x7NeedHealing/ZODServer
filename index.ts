// import express, { Express, Router, Request, Response } from 'express'
// const app: Express = express()
// //  const router:Router = express.Router()
// //  app.use('/api',router)
// //  router.get('/list',async(req:Request,res:Response)=>{
// //     const result = '666'
// //     res.json({
// //         data: result
// //     }) 
// //  })
// app.get('/user',(req,res)=>{
//     res.json({
//         data:'666?'
//     })
// })
//   app.listen(888,()=>{
//     console.log("开启了服务！");

//   })
import express from 'express';
//解析请求参数
import bodyParser from 'body-parser';
//数据库接入
import mysql from 'mysql';
//跨域请求
import cors from 'cors';

//接入数据库操作路由模块
// import checkRoute from './src/check'
const checkRoute = require('./src/check')
const addRoute = require('./src/add')
const deleteRoute = require('./src/delete')
const updateRoute = require('./src/update')
const adminRoute = require('./src/admin/admin')


const request = require('request');
// // token验证
// const jwt = require("jsonwebtoken");
// const secretKey = "secretKey";

const app = express();
app.use(cors());
app.use(bodyParser.json());

//使用路由模块
//增加模块
app.use(addRoute)
//删除模块
app.use(deleteRoute)
// //更改模块
app.use(updateRoute)
// //查询模块
app.use(checkRoute)
// 管理员
app.use(adminRoute)

// 定义端口
const port = 888;

// // 生成token
// module.exports.generateToken = function (payload) { 
//   const token =
//     "Zod " +
//     jwt.sign(payload, secretKey, {
//       // 七天免登录
//       expiresIn: 60 * 60 * 24 * 7,
//     });
//   return token;
// };

// // 验证token
// module.exports.verifyToken = function (req, res, next) {
//   const token = req.headers.authorization.split(" ")[1];
//   jwt.verify(token, secretKey, function (err, decoded) {
//     if (err) {
//       console.log("verify error", err);
//       return res.json({ code: "404", msg: "token无效" });
//     }
//     console.log("verify decoded", decoded);
//     next();
//   });
// };
app.use('/weiboHotNews', (req, res) => {
  const url = 'https://weibo.com/ajax/side/hotSearch';
  req.pipe(request(url)).pipe(res);
});
// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});