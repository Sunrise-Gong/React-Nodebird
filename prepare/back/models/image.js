//------------------------------------- model 최신화 코드
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
    static init(sequelize) { // sequelize.define 부분에 해당
        return super.init({ // super : 상속 받은거에서 부모를 호출할때 사용

            // id는 기본적으로 들어 있음
            src: { type: DataTypes.STRING(200), allowNull: false },
            // belongsTo 로 생성되는 컬럼
            // PostId: { 이미지는 하나의 게시글에 속해 있다  }

        }, {
            modelName: 'Image',
            tableName: 'images',
            charset: 'utf8',
            collate: 'utf8_general_ci', // 이미지 경로에는 이모티콘이 없으므로 utf8mb4 사용X
            sequelize,
        });
    }

    static associate(db) {
        db.Image.belongsTo(db.Post);
    }
};

//------------------------------------- model 기존 코드
/*
module.exports = (sequelize, DataTypes) => {

    const Image = sequelize.define('Image', { // Mysql에는 images 테이블 생성
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        // belongsTo 로 생성되는 컬럼
        // PostId: { 이미지는 하나의 게시글에 속해 있다  }

    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 이미지 경로에는 이모티콘이 없으므로 utf8mb4 사용X
    });

    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };

    return Image;
}
*/