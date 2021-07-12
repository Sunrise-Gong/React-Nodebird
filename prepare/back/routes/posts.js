const express = require('express');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const posts = await Post.findAll({
            limit: 10,
            order: [
                ['createdAt', 'DESC'], // 게시글에 대한 정렬 설정
                [Comment, 'createdAt', 'DESC'], // 댓글에 대한 정렬 설정
            ],
            include: [
                { model: User, attributes: ['id', 'nickname'] },
                { model: Image },
                { model: Comment, include:[{ model: User, attributes: ['id', 'nickname'] }] },
            ],
        })

        res.status(200).json(posts)

    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;