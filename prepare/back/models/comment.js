//------------------------------------- model 최신화 코드
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
    static init(sequelize) { // sequelize.define 부분에 해당
        return super.init({ // super : 상속 받은거에서 부모를 호출할때 사용
            // id는 기본적으로 들어 있음
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // belongsTo는 컬럼을 자동 생성합니다. 
            // UserId: { 이 댓글을 작성한 유저의 아이디 },
            // PostId: { 이 댓글이 작성된 게시글의 아이디 },        
        }, {
            modelName: 'Comment',
            tableName: 'comments',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize,
        });
    }

    static associate(db) {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
};

//------------------------------------- model 기존 코드
/*
module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('Comment', { // Mysql에는 comments 테이블 생성
        // id는 기본적으로 들어 있음
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        // belongsTo는 컬럼을 자동 생성합니다.
        // UserId: { 이 댓글을 작성한 유저의 아이디 },
        // PostId: { 이 댓글이 작성된 게시글의 아이디 },


    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };

    return Comment;
}
*/