'use strict'

const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: env.DATABASE_DIALECT,
    dialectOptions: {
        instanceName: env.DATABASE_INSTANCE
    }
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.sequelize = sequelize;
db.sequelize.sync();
//Models/tables
db.student = require('../models/student.model')(sequelize, Sequelize);
db.lockerRole = require('../models/locker_role.model')(sequelize, Sequelize);
db.locker = require('../models/locker.model')(sequelize, Sequelize);

db.lockerRole.hasMany(db.locker, { as: "lockers" });
db.locker.belongsTo(db.lockerRole, {
  foreignKey: "lockerRoleId",
  as: "lockerRole",
});


module.exports = db;