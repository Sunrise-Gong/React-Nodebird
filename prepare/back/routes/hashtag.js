const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Post, Hashtag, Image, Comment, User } = require('../models');

/*------------------------------- 특정 해시태그의 게시글들 */
router.get('/:hashtag', async (req, res, next) => { // GET /hashtag/노드?lastId=0
    try {
        const where = {}; // 초기로딩일 경우
        
        if (parseInt(req.query.lastId, 10)) { where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } } //초기 로딩이 아닐 경우 / lastId보다 작은 값들을 불러옴
        
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [
                { model: Hashtag, where: { name: req.params.hashtag } }, // 조건을 include에 적을 수도 있음
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