//引入express中间件
import express, { Express, Router, Request, Response } from 'express'
//数据库接入
import mysql from 'mysql';

// 以下是功能实现
// 1、增加用户模块(注册)
// 2、发布博客模块
// 3、发布待办模块
// 4、发布评论模块
// 5、发布通告模块
// 6、添加浏览记录
// 7、添加收藏
// 8、举报评论



// 创建到本地数据库的连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ZOD'
});


// const app:Express = express()
const router: Router = express.Router()

//增加用户模块(注册)
router.post('/addUser', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_user(account, ps, nickname)VALUES
  ('${newData.account}', 
  '${newData.ps}', 
  '${newData.nickname}')`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('用户注册成功');
        // console.log(req.body, req.query);

        // res.send(newData.account)
        // res.send(newData.ps)
    });
});
//发布博客模块
router.post('/addBlog', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_Blog(releaseTime, fromId, content, title,blogId)VALUES
  ('${newData.releaseTime}', 
  '${newData.fromId}', 
  '${newData.content}', 
  '${newData.title}',
  '${newData.blogId}' )`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('博客发布成功');
        // console.log(req.body, req.query);

        // res.send(newData.account)
        // res.send(newData.ps)
    });
});
//发布待办模块
router.post('/addTodo', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_todo(releaseTime, endTime,fromId, content,todoId)VALUES
  ('${newData.releaseTime}', 
  '${newData.endTime}', 
  '${newData.fromId}', 
  '${newData.content}',
  '${newData.todoId}')`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('待办添加成功');
        // console.log(req.body, req.query);

        // res.send(newData.account)
        // res.send(newData.ps)
    });
});
//发布评论模块
router.post('/addComments', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_comment(releaseTime, fromId, content, toBlog,commentId)VALUES
  ('${newData.releaseTime}', 
  '${newData.fromId}', 
  '${newData.content}', 
  '${newData.toBlog}',
  '${newData.commentId}' )`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('评论发布成功');
        // console.log(req.body, req.query);

        // res.send(newData.account)
        // res.send(newData.ps)
    });
});
//发布通告模块
router.post('/addNotice', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_notice(releaseTime, content)VALUES('${newData.releaseTime}', '${newData.content}')`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('通告发布成功');
        // console.log(req.body, req.query);

        // res.send(newData.account)
        // res.send(newData.ps)
    });
});
// 添加浏览记录
router.post('/addHistory', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_history(blogId, account,time)VALUES('${newData.blogId}', '${newData.account}', '${newData.time}')`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('浏览记录添加成功');
        // console.log(req.body, req.query);

        // res.send(newData.account)
        // res.send(newData.ps)
    });
});
// 添加反馈
router.post('/addFeedback', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_feedback (title, content, contact,account,feedbackId) VALUES('${newData.title}', '${newData.content}', '${newData.contact}', '${newData.account}', '${newData.feedbackId}')`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('反馈成功');
        // console.log(req.body, req.query);

        // res.send(newData.account)
        // res.send(newData.ps)
    });
});
// 7、添加收藏
router.post('/addFavorite', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_favorite (blogId,account) VALUES('${newData.blogId}', '${newData.account}')`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('收藏成功');
        // console.log(req.body, req.query);

        // res.send(newData.account)
        // res.send(newData.ps)
    });
});
// 8、举报评论
router.post('/reportComment', (req, res) => {
    const newData = req.body;
    const query = `INSERT INTO zod_reportComments (content,reason,commentId) VALUES('${newData.content}','${newData.reason}', '${newData.commentId}')`;

    connection.query(query, (error) => {
        if (error) throw error;
        res.send('举报成功');

    });
});
module.exports = router