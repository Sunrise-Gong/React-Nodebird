const express = require('express');
const multer = require('multer');
const path = require('path');
const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const fs = require('fs');

const router = express.Router();

try {
    fs.accessSync('uploads');
} catch(error) {
    console.log('uploads 폴더가 없으므로 생성합니다.')
    fs.mkdirSync('uploads');
}


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
router.patch('/:postId/like',isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
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
router.delete('/:postId/like',isLoggedIn , async (req, res, next) => { // DELETE /post/1/like
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

// 게시글 삭제
router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/1
    try{
        await Post.destroy({
            where: { 
                id: req.params.postId,
                UserId: req.user.id, 
            }
        });
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// const upload = multer({
//     storage: multer.diskStorage({ // storage: 어디에 저장할지, diskStorage: 컴퓨터의 하드디스크에 저장
//         destination(req, file, done) { done(null, 'uploads') },// uploads 라는 폴더에 저장
//         filename(req, file, done) { // ex) 해돋이.png, 
//             const ext = path.extname(file.originalname); // 확장자 추출 (.png), path 는 node 에서 제공하며 가져와서 사용
//             const basename = path.basename(file.originalname, ext); // 해돋이
//             done(null, basename + new Date().getTime() + ext); // 해돋이1626425281704.png, 파일명이 겹치는 것을 방지하기 위한 과정
//         }
//     }),
//     limits: { fileSize: 20 * 1024 *1024 }, // 20MB, 용량제한설정(무분별한 업로드도 공격이 될 수 있음)
// })
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { done(null, 'uploads') },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext); 
            done(null, basename + new Date().getTime() + ext); 
        }
    }),
    limits: { fileSize: 20 * 1024 *1024 },
})
// 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => { // POST /post/images
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
});

module.exports = router;