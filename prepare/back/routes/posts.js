const express = require('express');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const posts = await Post.findAll({
            limit: 10,
            order: [
                ['createdAt', 'DESC'], // 게시글을 생성일을 기준으로 내림차순 정렬
                [Comment, 'createdAt', 'DESC'], // 댓글을 생성일을 기준으로 내림차순 정렬
            ],
            include: [
                { model: User, attributes: ['id', 'nickname'] },
                { model: Image },
                { model: Comment, include:[{ model: User, attributes: ['id', 'nickname'] }] },
                { model: User, as: 'Likers', attributes: ['id'] }, // 좋아요 누른 사람
            ],
        })

        res.status(200).json(posts)

    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;