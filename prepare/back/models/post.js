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
        db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });// post.addHashtags
        db.Post.hasMany(db.Comment); // post.addComments, post.getComments
        db.Post.hasMany(db.Image); // post.addImages, post.getImages
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); // post.addRetweet
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });// post.addLikers, post.removLikers
    };
    
    return Post;
}
// belong to~ = ~에 속하다