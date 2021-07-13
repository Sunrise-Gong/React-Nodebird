const express = require('express');

const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 게시글 등록
router.post('/', isLoggedIn, async (req, res, next) => { // POST /post
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id, // req.user: passport의 deserializeUser로 생성된 데이터
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }], }, // 댓글, 댓글 작성자
                { model: User, attributes: ['id', 'nickname'] }, // 게시글 작성자
                { model: User, as: 'Likers', attributes: ['id'] }, // 좋아요 누른 사람
            ]
        })
        res.status(201).json(fullPost);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 등록
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /:postId/comment
    try {

        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) { return res.status(403).send('존재하지 않는 게시글 입니다.') }

        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{ model: User, attributes: ['nickname'] }],
        })
        res.status(201).json(fullComment);

    } catch (error) {
        console.error(error);
        next(error);
    }

});

// 좋아요
router.patch('/:postId/like', async (req, res, next) => { // PATCH /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) { return res.status(403).send('존재하지 않는 게시물 입니다.') }
        
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 좋아요 취소
router.delete('/:postId/like', async (req, res, next) => { // DELETE /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) { return res.status(403).send('존재하지 않는 게시물 입니다.') }

        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/', (req, res) => { // DELETE /post
    res.json({ id: 1 });
});

module.exports = router;