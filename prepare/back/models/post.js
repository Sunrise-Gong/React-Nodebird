const { darkblue } = require("color-name");

module.exports = (sequelize, DataTypes) => {
    
    const Post = sequelize.define('Post', { // Mysql에는 posts 테이블 생성
        // id는 기본적으로 들어 있음
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    
    }, { // 모델에 대한 셋팅 
        charset: 'utf8mb4', // mysql에서 한글 에러를 막고 이모티콘을 사용할 수 있다.
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
    });
    
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        // 리트윗 관계 : 하나의 게시글은 다른 게시글에 속할 수 있다. as 설정을 안하면 컬럼명이 postId로 생성됨
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); 
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });       // 하나의 게시물은 여러 유저에게 좋아요 받을 수 있음
    };
    
    return Post;
}
// belong to~ = ~에 속하다