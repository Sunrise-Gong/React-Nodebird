const express = require('express');

const { Post, User, Image, Comment } = require('../models');

const { Op } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const where = {}; // 초기로딩일 경우

        if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 경우
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
        } // lastId보다 작은 값들을 불러옴
        
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'], // 게시글을 생성일을 기준으로 내림차순 정렬
                [Comment, 'createdAt', 'DESC'], // 댓글을 생성일을 기준으로 내림차순 정렬
            ],
            include: [
                { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname']}, { model: Image}] },
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