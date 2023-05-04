//引入express中间件
import { log } from 'console';
import express, { Express, Router, Request, Response } from 'express'
//数据库接入
import mysql from 'mysql';


// 以下是功能实现

// 1、用户管理
// 2、博客管理
// 3、评论管理
// 4、反馈管理




// 创建到本地数据库的连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ZOD'
});


// const app:Express = express()
const router: Router = express.Router()

// 用户信息
// 1.1、查询用户
router.get('/adminCheckUser', (req, res) => {

    const query = 'SELECT account,nickname,status FROM zod_user';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 1.2、查询用户byAccount
router.get('/adminCheckUserByAccount', (req, res) => {
    const account = req.query.account;
    const query = 'SELECT account,nickname,status FROM zod_user WHERE account = ?';
    connection.query(query,[account], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 1.3、查询用户byNickname
router.get('/adminCheckUserByNickname', (req, res) => {
    const nickname = req.query.nickname;
    const query = 'SELECT account,nickname,status FROM zod_user WHERE nickname = ?';
    connection.query(query,[nickname], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 1.4、查询用户byStatus
router.get('/adminCheckUserByStatus', (req, res) => {
    const status = req.query.status;
    const query = 'SELECT account,nickname,status FROM zod_user WHERE status = ?';
    connection.query(query,[status], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 1.5、修改用户信息
router.post('/adminUpdateUserInfo', (req, res) => {
    const newData = req.body;
    const query = 'UPDATE zod_user SET nickname = ?,status = ? WHERE account = ?;'
    connection.query(query, [newData.nickname,newData.status, newData.account], (error) => {
        if (error) throw error;
        res.send('管理：用户状态更改成功');
        
    });
});
// 1.5、删除用户信息
router.get('/adminDeleteUser', (req, res) => {
    const account = req.query.account;
    const query = `DELETE FROM zod_user WHERE account = ?`;
    connection.query(query, [account], (error) => {
        if (error) throw error;
        res.send('用户' + account + '删除成功');
    });
});

// 2、博客管理
// 2.1 博客
router.get('/adminCheckAllBlog', (req, res) => {
    const query = 'SELECT blogId,title,status FROM zod_Blog';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 2.2 查询博客通过blogId
router.get('/adminCheckBlogByBlogId', (req, res) => {
    const blogId = req.query.blogId;
    const query = 'SELECT blogId,title,status FROM zod_Blog WHERE blogId = ?';
    connection.query(query,[blogId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 2.3 查询博客通过status
router.get('/adminCheckBlogByStatus', (req, res) => {
    const status = req.query.status;
    const query = 'SELECT blogId,title,status FROM zod_Blog WHERE status = ?';
    connection.query(query,[status], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 2.4 查询博客通过title
router.get('/adminCheckBlogByTitle', (req, res) => {
    const title = req.query.title;
    const query = 'SELECT blogId,title,status FROM zod_Blog WHERE title = ?';
    connection.query(query,[title], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 2.5 修改博客
router.post('/adminUpdateBlog', (req, res) => {
    const newData = req.body;
    const query = 'UPDATE zod_blog SET status = ? WHERE blogId = ?';
    connection.query(query,[newData.status,newData.blogId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 2.6 删除博客
router.get('/adminDeleteBlog', (req, res) => {
    const blogId = req.query.blogId;
    const query = 'DELETE FROM zod_Blog WHERE blogId = ?';
    connection.query(query,[blogId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});


// 3、评论管理
// 3.1 评论查询
router.get('/adminCheckAllComments', (req, res) => {
    const query = 'SELECT content,reason,commentId FROM zod_reportComments';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 3.2 查询评论通过commentId
router.get('/adminCheckCommentByCommentId', (req, res) => {
    const commentId = req.query.commentId;
    const query = 'SELECT content,reason,commentId FROM zod_reportComments WHERE commentId = ?';
    connection.query(query,[commentId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// 3.3 评论无罪处理
router.get('/adminDeleteCommentNoSin', (req, res) => {
    const commentId = req.query.commentId;
    const query = 'DELETE FROM zod_reportComments WHERE commentId = ?';
    connection.query(query,[commentId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 3.4 删除原评论
router.get('/adminDeleteCommentHasSin', (req, res) => {
    const commentId = req.query.commentId;
    const query = 'DELETE zod_reportcomments, zod_comment FROM zod_reportcomments JOIN zod_comment ON zod_reportcomments.commentId = zod_comment.commentId WHERE zod_reportcomments.commentId = ?;';
    connection.query(query,[commentId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 4、反馈管理
// 4.1 反馈查询
router.get('/adminCheckAllFeedback', (req, res) => {
    const query = 'SELECT title,content,contact,account,feedbackId FROM zod_feedback';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 4.2 查询反馈通过标题
router.get('/adminCheckFeedbackByTitle', (req, res) => {
    const title = req.query.title;
    const query = 'SELECT title,content,contact,account,feedbackId FROM zod_feedback WHERE title LIKE ?';
    connection.query(query,[`%${title}%`], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// 4.3 删除原反馈
router.get('/adminDeleteFeedback', (req, res) => {
    const feedbackId = req.query.feedbackId;
    const query = 'DELETE FROM zod_feedback WHERE feedbackId = ?;';
    connection.query(query,[feedbackId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
module.exports = router