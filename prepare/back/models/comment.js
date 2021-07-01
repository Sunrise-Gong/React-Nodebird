module.exports = (sequelize, DataTypes) => {
    
    const Comment = sequelize.define('Comment', { // Mysql에는 comments 테이블 생성
        // id는 기본적으로 들어 있음
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    
    }, { // 모델에 대한 셋팅 
        charset: 'utf8mb4', // mysql에서 한글 에러를 막고 이모티콘을 사용할 수 있다.
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
    });
    
    Comment.associate = (db) => {};
    
    return Comment;
}