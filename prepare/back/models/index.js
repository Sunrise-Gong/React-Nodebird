const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]; // config.json 의 development 속성 입니다.
const db = {};

// 시퀄라이즈가 mysql2에 config에 있는 정보들을 보내줘서 node 와 mysql 을 연결할 수 있게 도와줍니다.
const sequelize = new Sequelize(config.database, config.username, config.password, config); 


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
