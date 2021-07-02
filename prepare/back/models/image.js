module.exports = (sequelize, DataTypes) => {
    
    const Image = sequelize.define('Image', { // Mysql에는 images 테이블 생성
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        /* belongsTo 로 생성되는 컬럼
        PostId: { 이미지는 하나의 게시글에 속해 있다  }
        */
    
    }, {
        charset: 'utf8', 
        collate: 'utf8_general_ci', // 이미지 경로에는 이모티콘이 없으므로 utf8mb4 사용X
    });
    
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    
    return Image;
}