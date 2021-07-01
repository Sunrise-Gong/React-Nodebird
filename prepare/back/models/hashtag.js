module.exports = (sequelize, DataTypes) => {
    
    const Hashtag = sequelize.define('Hashtag', { // Mysql에는 hashtags 테이블 생성
        // id는 기본적으로 들어 있음
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    
    }, { // 모델에 대한 셋팅 
        charset: 'utf8mb4', // mysql에서 한글 에러를 막고 이모티콘을 사용할 수 있다.
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
    });
    
    Hashtag.associate = (db) => {};
    
    return Hashtag;
}