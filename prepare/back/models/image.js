module.exports = (sequelize, DataTypes) => {
    
    const Image = sequelize.define('Image', { // Mysql에는 images 테이블 생성
        // id는 기본적으로 들어 있음
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    
    }, { // 모델에 대한 셋팅 
        charset: 'utf8', 
        collate: 'utf8_general_ci', // 이미지 경로에는 이모티콘이 없으므로 utf8mb4 안씀
    });
    
    Image.associate = (db) => {};
    
    return Image;
}