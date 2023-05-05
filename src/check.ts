//引入express中间件
import { log } from 'console';
import express, { Express, Router, Request, Response } from 'express'
//数据库接入
import mysql from 'mysql';
import { json } from 'stream/consumers';
// token验证
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
// 生成token
const generateToken = function (payload: any) {
    const token =
        "Zod " +
        jwt.sign(payload, secretKey, {
            // 七天免登录
            expiresIn: 60 * 60 * 24 * 7,
        });
    return token;
};

// 以下是功能实现
// 0、获取登录token
// 0.1、登录
// 1、查询用户信息
// 2、查询全部用户
// 3、用户昵称-模糊查询
// 4、查询全部博客模块
// 5、博客标题-模糊查询
// 6、查询全部todo事项
// 7、Todo完成全查询
// 8、Todo未完成全查询
// 9、通告查询
// 10、博客查询及用户查询
// 11、数据统计某天发布的todo个数
// 12、Todo今日完成查询
// 13、Todo今日未完成查询
// 14、查询发布博客数量
// 15、查询浏览记录
// 16、通过blogId查询博客信息
// 17、查询某博客下评论数量(主页)
// 18、查询某博客全部评论内容(详情页)
// 19、查询某博客详细信息
// 21、查询收藏
// 22、查询某用户的评论条数
// 23、查询某用户的全部博客

// 管理员
// 20、查看所有被举报的评论




// 创建到本地数据库的连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ZOD'
});


// const app:Express = express()
const router: Router = express.Router()

//查询用户模块
// 获取token
router.get('/getToken', (req, res) => {
    const account = req.query.account
    const token = generateToken({ account: account })
    res.send({ token: token });
});
// 登录
router.get('/login', (req, res) => {
    const nickname = req.query.loginStr;
    const account = req.query.loginStr;
    const password = req.query.password;
    // console.log(req.query);
    const query = 'SELECT account FROM zod_user WHERE nickname = ? OR account = ? AND ps = ?';
    connection.query(query, [nickname, account, password], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 管理员登录
router.get('/adminLogin', (req, res) => {
    const account = req.query.account;
    const password = req.query.password;
    const query = 'SELECT account FROM zod_admin WHERE account = ? AND ps = ?';
    connection.query(query, [ account, password], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 查询用户信息
router.get('/checkUserInfo', (req, res) => {
    const account = req.query.account
    const query = 'SELECT account,email,nickname,phone,ps FROM zod_user WHERE account = ? ';
    connection.query(query, [account], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 查询全部用户
router.get('/checkAllUser', (req, res) => {
    const query = 'SELECT * FROM zod_user';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 用户昵称-模糊查询
router.get('/checkUser', (req, res) => {
    const nickname = req.query.nickname;
    const query = 'SELECT account,nickname FROM zod_user WHERE nickname LIKE ?';
    connection.query(query, [`%${nickname}%`], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
//查询全部博客模块
router.get('/checkAllBlog', (req, res) => {
    const query = 'SELECT * FROM zod_Blog';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 博客标题-模糊查询
router.get('/checkBlogByTitle', (req, res) => {
    const str = req.query.str;
    const query = 'SELECT blogId,title,fromId,releaseTime,zod_user.nickname FROM zod_Blog join zod_user on zod_blog.fromId = zod_user.account WHERE content LIKE ?';
    connection.query(query, [`%${str}%`], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
router.get('/checkBlogByContent', (req, res) => {
    const str = req.query.str;
    const query = 'SELECT blogId,title,fromId,releaseTime,zod_user.nickname FROM zod_Blog join zod_user on zod_blog.fromId = zod_user.account WHERE title LIKE ?;'
    connection.query(query, [`%${str}%`], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
//查询全部todo事项
router.get('/checkAllTodo', (req, res) => {
    const fromId = req.query.fromId
    const query = 'SELECT COUNT(*) AS count FROM zod_todo WHERE fromId = ?';
    connection.query(query, [fromId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
//查询某一fromId的某天的todo事项
router.get('/checkTodo', (req, res) => {
    const fromId = req.query.fromId
    const releaseTime = req.query.releaseTime
    const query = 'SELECT * FROM zod_todo WHERE fromId = ? AND releaseTime = ?';
    connection.query(query, [fromId, releaseTime], (error, results) => {
        if (error) throw error;
        res.send(results);
        // console.log(fromId,releaseTime);

    });
});
// Todo完成查询
router.get('/checkTodoDone', (req, res) => {
    const fromId = req.query.fromId;
    const query = 'SELECT COUNT(*) AS count FROM zod_todo WHERE status = 1 And fromId = ?';
    connection.query(query, [fromId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// Todo未完成查询
router.get('/checkTodoNoDone', (req, res) => {
    const fromId = req.query.fromId;
    const query = 'SELECT * FROM zod_todo WHERE status = 0 And fromId = ?';
    connection.query(query, [fromId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 通告查询
router.get('/checkNotice', (req, res) => {
    const query = 'SELECT * FROM zod_notice';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 博客查询及用户查询
// 查询全部博客的同时在【用户表】查询【博客】fromId对应的account，然后将用户nickname取到。
router.get('/checkBlogAndInfo', (req, res) => {
    const page: number = <number> <unknown>req.query.page;
    const query = `SELECT * FROM zod_blog JOIN zod_user ON fromId = account WHERE zod_blog.status = 0 ORDER BY releaseTime DESC LIMIT ${page}, 4`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 数据统计某天发布的todo个数
router.get('/checkTodoSomeday', (req, res) => {
    const fromId = req.query.fromId;
    const releaseTime = req.query.releaseTime;
    const query = 'SELECT COUNT(*) AS count FROM zod_todo WHERE fromId = ? AND releaseTime = ?';
    connection.query(query, [fromId, releaseTime], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// Todo今日完成查询
router.get('/checkTodoTodayDone', (req, res) => {
    const fromId = req.query.fromId;
    const releaseTime = req.query.releaseTime;
    const query = 'SELECT COUNT(*) AS count FROM zod_todo WHERE fromId = ? AND releaseTime = ? And status = 1';
    connection.query(query, [fromId, releaseTime], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// Todo今日未完成查询
router.get('/checkTodoTodayNoDone', (req, res) => {
    const fromId = req.query.fromId;
    const releaseTime = req.query.releaseTime;
    const query = 'SELECT COUNT(*) AS count FROM zod_todo WHERE fromId = ? AND releaseTime = ? And status = 0';
    connection.query(query, [fromId, releaseTime], (error, results) => {

        if (error) throw error;
        res.send(results);
    });
});
//查询发布博客数量
router.get('/checkSomeoneBlogNumber', (req, res) => {
    const fromId = req.query.fromId;
    const query = 'SELECT COUNT(*) AS count FROM zod_blog WHERE fromId = ?;';
    connection.query(query, [fromId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 15、查询浏览记录
router.get('/checkHistory', (req, res) => {
    const account = req.query.account;
    const page: number = <number> <unknown>req.query.page;
    const query = `SELECT blogId, time FROM zod_history WHERE account = ? ORDER BY id DESC LIMIT 5`;
    connection.query(query, [account], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// 16、查询历史记录的时候通过blogId找到帖子信息和作者信息
router.get('/checkBlogById', (req, res) => {
    const blogId = req.query.blogId;
    const query = 'SELECT zod_blog.title, zod_user.nickname FROM zod_blog JOIN zod_user ON zod_blog.fromId = zod_user.account WHERE zod_blog.blogId = ?;';
    connection.query(query, [blogId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// 17、查询某博客下评论数量(主页)
router.get('/checkCommentsByBlogId', (req, res) => {
    const toBlog = req.query.toBlog;
    const query = 'SELECT COUNT(*) AS count FROM zod_comment WHERE toBlog = ?;';
    connection.query(query, [toBlog], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// 18、查询某博客全部评论内容(详情页)
router.get('/checkCommentsContentByBlogId', (req, res) => {
    const toBlog = req.query.toBlog;
    const query = 'SELECT content,fromId,releaseTime,commentId FROM zod_comment WHERE toBlog = ?;';
    connection.query(query, [toBlog], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 19、查询某博客详细信息
router.get('/checkBlogInfo', (req, res) => {
    const blogId = req.query.blogId;
    const query = 'SELECT * FROM zod_blog WHERE blogId = ?;';
    connection.query(query, [blogId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 20、查看所有被举报的评论
router.get('/checkReportComments', (req, res) => {
    const query = 'SELECT * FROM zod_reportComments ';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 21、查询收藏
router.get('/checkFavoriteById', (req, res) => {
    const account = req.query.account
    const query = 'SELECT blogId FROM zod_favorite WHERE account = ?';
    connection.query(query, [account], (error, results) => {
        if (error) throw error;
        // console.log(results[0]);
        
        res.send(results);
    });
});
// 22、查询某用户的评论条数
router.get('/checkCommentNumber', (req, res) => {
    const account = req.query.account
    const query = 'SELECT COUNT(*) AS count FROM zod_comment WHERE fromId = ?';
    connection.query(query, [account], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// 23、查询某用户的全部博客
// router.get('/checkSomeoneBlog', (req, res) => {
//     const fromId = req.query.fromId
//     const query = 'SELECT releaseTime,title,blogId FROM zod_blog WHERE fromId = ?';
//     connection.query(query,[fromId], (error, results) => {
//         if (error) throw error;
//         res.send(results);
//     });
// });
router.get('/checkSomeoneBlog', (req, res) => {
    const fromId = req.query.fromId;
    const page: number = <number> <unknown>req.query.page;
    // DESC是降序，即按时间排序，最接近现在时间的排在顶部。
    const query = `SELECT releaseTime,title,blogId FROM zod_blog WHERE fromId = ? AND status = 0 ORDER BY releaseTime DESC LIMIT ${page}, 4`;
    connection.query(query, [fromId], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
module.exports = router