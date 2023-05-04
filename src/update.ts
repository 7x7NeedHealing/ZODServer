//引入express中间件
import express, { Express, Router, Request, Response } from 'express'
//数据库接入
import mysql from 'mysql';

// 以下是功能实现
// 1、更新用户信息
// 2、更改用户状态
// 3、更改博客内容
// 4、更改博客状态
// 5、更改待办内容
// 6、更改待办状态



// 创建到本地数据库的连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ZOD'
});


// const app:Express = express()
const router: Router = express.Router()

//更新用户信息
router.post('/updateUserInfo', (req, res) => {
    const newData = req.body;
    const query = 'UPDATE zod_user SET ps=?, nickname=?, phone=?, email=? WHERE account = ?;'
    connection.query(query, [newData.ps, newData.nickname, newData.phone, newData.email, newData.account], (error) => {
        if (error) throw error;
        res.send('用户信息更改成功');
        
    });
});
//更改用户状态
router.post('/updateUserStatus', (req, res) => {
    const newData = req.body;
    const query = 'UPDATE zod_user SET status = ? WHERE account = ?;'
    connection.query(query, [newData.status, newData.account], (error) => {
        if (error) throw error;
        res.send('用户状态更改成功');
        
    });
});
//更改博客内容
router.post('/updateBlog', (req, res) => {
    const newData = req.body;
    const query = 'UPDATE zod_blog SET content = ? ,title = ? WHERE blogId = ?;'
    connection.query(query, [newData.content, newData.title,newData.blogId], (error) => {
        if (error) throw error;
        res.send('博客内容修改成功');
        
    });
});
//更改博客状态
router.post('/updateBlogStatus', (req, res) => {
    const newData = req.body;
    const query = 'UPDATE zod_blog SET status = ? WHERE blogId = ?;'
    connection.query(query, [newData.status, newData.blogId], (error) => {
        if (error) throw error;
        res.send('博客状态修改成功');
        
    });
});
//更改待办内容
router.post('/updateTodo', (req, res) => {
    const newData = req.body;
    const query = 'UPDATE zod_todo SET content = ? WHERE todoId = ?;'
    connection.query(query, [newData.content, newData.todoId], (error) => {
        if (error) throw error;
        res.send('待办内容修改成功');
        
    });
});
//更改待办状态
router.post('/updateTodoStatus', (req, res) => {
    const newData = req.body;
    const query = 'UPDATE zod_todo SET status = ? , endTime = ? WHERE todoId = ?;'
    connection.query(query, [newData.status,newData.endTime, newData.todoId], (error) => {
        if (error) throw error;
        res.send('待办状态修改成功');
        
    });
});


module.exports = router