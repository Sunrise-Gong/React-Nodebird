module.exports = (sequelize, DataTypes) => {
    
    const Comment = sequelize.define('Comment', { // Mysql에는 comments 테이블 생성
        // id는 기본적으로 들어 있음
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        /* belongsTo는 컬럼을 자동 생성합니다. 
        UserId: { 이 댓글을 작성한 유저의 아이디 },
        PostId: { 이 댓글이 작성된 게시글의 아이디 },
        */
    
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