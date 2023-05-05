//引入express中间件
import express, { Express, Router, Request, Response } from 'express'
//数据库接入
import mysql from 'mysql';

// 以下是功能实现
// 1、用户删除
// 2、删除博客
// 3、删除待办
// 5、删除通告
// 6、删除历史记录
// 7、删除收藏

// 管理员
// 8、删除被举报的评论




// 创建到本地数据库的连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ZOD'
});


// const app:Express = express()
const router: Router = express.Router()


// 2、删除博客
router.get('/deleteBlog', (req, res) => {
    const blogId = req.body.blogId;
    const query = `DELETE FROM zod_blog WHERE blogId = ?`;
    connection.query(query, [blogId], (error) => {
        if (error) throw error;
        // res.send('博客' + blogId + '删除成功');
    });
});
// 3、删除待办
router.get('/deleteTodo', (req, res) => {
    const todoId = req.query.todoId;
    const query = `DELETE FROM zod_todo WHERE todoId = ?`;
    connection.query(query, [todoId], (error) => {
        if (error) throw error;
        // res.send('待办' + todoId + '删除成功');
        // console.log(todoId,req.body,req.query);
        
    });
});
// 5、删除通告
router.get('/deleteNotice', (req, res) => {
    const content = req.body.content;
    const query = `DELETE FROM zod_notice WHERE content = ?`;
    connection.query(query, [content], (error) => {
        if (error) throw error;
        // res.send('通告' + content + '删除成功');
    });
});
// 6、删除历史记录
router.get('/deleteBlogHistoryById', (req, res) => {
    const blogId = req.query.blogId;
    const account = req.query.account
    const query = 'DELETE from zod_history WHERE blogId = ? And account = ?';
    connection.query(query, [blogId,account],(error, results) => {
        if (error) throw error;
        // res.send(results);
    });
});
// 7、删除收藏
router.get('/deleteFavorite', (req, res) => {
    const blogId = req.query.blogId;
    const account = req.query.account
    const query = 'DELETE from zod_favorite WHERE blogId = ? And account = ?';
    connection.query(query, [blogId,account],(error, results) => {
        if (error) throw error;
        // res.send(results);
    });
});
// 8、删除被举报的评论
router.get('/deleteComment', (req, res) => {
    const commentId = req.query.commentId;
    const query = 'DELETE from zod_reportComments WHERE commentId = ?';
    connection.query(query, [commentId],(error, results) => {
        if (error) throw error;
        // res.send(results);
    });
});
module.exports = router