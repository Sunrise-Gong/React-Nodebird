//------------------------------------- model 최신화 코드
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends Model {
    static init(sequelize) { // sequelize.define 부분에 해당
        return super.init({ // super : 상속 받은거에서 부모를 호출할때 사용
            // id는 기본적으로 들어 있음
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },     
        }, {
            modelName: 'Hashtag',
            tableName: 'hashtags',
            charset: 'utf8mb4', // mysql에서 한글 에러를 막고 이모티콘을 사용할 수 있다.
            collate: 'utf8mb4_general_ci', // 이모티콘 저장
            sequelize,
        });
    }

    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    }
};

//------------------------------------- model 기존 코드
/*
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

    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    };

    return Hashtag;
}
*/