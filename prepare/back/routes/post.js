const express = require('express');
const multer = require('multer');
const path = require('path');
const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const router = express.Router();

try {
    fs.accessSync('uploads');
} catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.')
    fs.mkdirSync('uploads');
}

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'us-east-1',
})

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),

        bucket: 'nodebird-copy-s3',

        key(req, file, cb) {
            cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)// 버킷도 폴더를 생성할 수 있습니다.
        }
    }),

    limits: { fileSize: 20 * 1024 * 1024 },
})
// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, done) { done(null, 'uploads') },
//         filename(req, file, done) {
//             const ext = path.extname(file.originalname);
//             const basename = path.basename(file.originalname, ext); 
//             done(null, basename + '_' + new Date().getTime() + ext); 
//         }
//     }),
//     limits: { fileSize: 20 * 1024 *1024 },
// })

// 게시글 등록
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /post
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g); //ex) #해시태그 #분리하기 테스트 -> ["#해시태그","#분리하기"]
        const post = await Post.create({ content: req.body.content, UserId: req.user.id });

        if (hashtags) { // 해시태그가 있다면    
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            }))); // ["#해시태그","#분리하기"] -> [['해시태그', true], ['분리하기', true]] -> 40번에서 map 쓰는 이유

            await post.addHashtags(result.map((v) => v[0]));
        }

        if (req.body.image) { // 이미지가 있다면 
            if (Array.isArray(req.body.image)) { // 이미지가 여러개인 경우 ex) image: [ 해돋이.png, 해넘이.png ]
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })))
                await post.addImages(images);
            } else { // 이미지가 하나인 경우 ex) image: 해돋이.png
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }
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
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
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
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
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

// 게시글 수정
router.patch('/:postId', isLoggedIn, async (req, res, next) => { // PATCH /post/1
    const hashtags = req.body.content.match(/#[^\s#]+/g); //ex) #해시태그 #분리하기 테스트 -> ["#해시태그","#분리하기"]
    
    try {
        await Post.update({
            content: req.body.content
        }, {
            where: { id: req.params.postId, UserId: req.user.id, }
        });

        const post = await Post.findOne({ where: { id: req.params.postId } });

        if (hashtags) { // 해시태그가 있다면    
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            }))); // ["#해시태그","#분리하기"] -> [['해시태그', true], ['분리하기', true]] -> map 쓰는 이유

            await post.setHashtags(result.map((v) => v[0]));// set: 기존 데이터를 날리고 새로운 데이터로
        }

        res.status(200).json({ PostId: parseInt(req.params.postId, 10), content: req.body.content });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 삭제
router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/1
    try {
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id,
            }
        });
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) });

    } catch (error) {
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

// 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => { // POST /post/images
    console.log(req.files);
    //res.json(req.files.map((v) => v.filename)); // v.filename = diskStorage로 저장된 파일명
    res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/'))); // v.location = S3에 저장된 이미지 주소
});

// 리트윗
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // POST /post/1/retweet
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }, include: [{ model: Post, as: 'Retweet' }] })
        if (!post) { return res.status(403).send('존재하지 않는 게시글 입니다.') }

        // 자신이 쓴 글 리트윗 막고 자신이 쓴 글을 다른 사람이 리트윗 한 것을 자신이 리트윗 하는 것을 막기
        if (req.user.id === post.UserId || post.Retweet && post.Retweet.UserId === req.user.id) {
            return res.status(403).send('자신이 쓴 글은 리트윗할 수 없습니다.');
        }

        const retweetTargetId = post.RetweetId || post.id

        const exPost = await Post.findOne({ where: { UserId: req.user.id, RetweetId: retweetTargetId } });
        if (exPost) { return res.status(403).send('이미 리트윗 한 게시글 입니다.') }

        const retweet = await Post.create({ UserId: req.user.id, RetweetId: retweetTargetId, content: 'retweet' });

        const reweetWithPrevPost = await Post.findOne({
            where: { id: retweet.id },
            include: [
                { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }] },
                { model: User, attributes: ['id', 'nickname'] },
                { model: User, as: 'Likers', attributes: ['id'] },
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
            ],
        })
        res.status(201).json(reweetWithPrevPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:postId', async (req, res, next) => { // GET /post/1
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) { return res.status(404).send('존재하지 않는 게시글 입니다.') }

        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }] },
                { model: User, attributes: ['id', 'nickname'] },
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
                { model: User, as: 'Likers', attributes: ['id'] },
            ],
        })
        res.status(200).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;