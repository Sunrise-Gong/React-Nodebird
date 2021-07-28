//------------------------------------- model 최신화 코드
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
    static init(sequelize) { // sequelize.define 부분에 해당
        return super.init({ // super : 상속 받은거에서 부모를 호출할때 사용

            // id는 기본적으로 들어 있음
            email: {
                type: DataTypes.STRING(30), // 데이터베이스도 데이터에 대한 검사를 해줍니다.(STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME)
                allowNull: false, // false: 필수적으로 필요한 데이터, true: 없어도 그만인 데이터
                unique: true, // 고유한 값(이메일은 다른 사람과 중복되면 안되므로)
            },
            nickname: { type: DataTypes.STRING(30), allowNull: false },
            password: { type: DataTypes.STRING(100), allowNull: false },// 비밀번호는 암호화 과정을 거치면 매우 길어지기 때문에 100으로 설정한 것입니다.

        }, {
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8', // mysql에서 한글 에러를 막기 위해서
            collate: 'utf8_general_ci', // 한글 저장
            sequelize,
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Likedpost' });  // 한명의 유저는 여러 게시글에 좋아요 누를 수 있음
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    }
};

//------------------------------------- model 기존 코드
/*
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', { // Mysql에는 users 테이블 생성
        // id는 기본적으로 들어 있음
        email: {
            // 데이터베이스도 데이터에 대한 검사를 해줍니다.(STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME)
            type: DataTypes.STRING(30),
            allowNull: false, // false: 필수적으로 필요한 데이터, true: 없어도 그만인 데이터
            unique: true, // 고유한 값(이메일은 다른 사람과 중복되면 안되므로)
        },

        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },

        password: {
            // 비밀번호는 암호화 과정을 거치면 매우 길어지기 때문에 100으로 설정한 것입니다.
            type: DataTypes.STRING(100),
            allowNull: false,
        },

    }, { // 모델에 대한 셋팅
        charset: 'utf8', // mysql에서 한글 에러를 막기 위해서
        collate: 'utf8_general_ci', // 한글 저장
    });

    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Likedpost' });  // 한명의 유저는 여러 게시글에 좋아요 누를 수 있음
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    };

    return User;
}
*/