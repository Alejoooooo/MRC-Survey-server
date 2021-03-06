var bcrypt = require('bcrypt-nodejs');
var auth = require('../services/auth');

module.exports = {

    attributes: {
        username: {
            type: 'STRING',
            required: true,
            unique: true,
            primaryKey: true
        },
        email: {
            type: 'STRING'
        },
        password: {
            type: 'STRING',
            required: true
        },
        birthDate: {
            type: 'STRING'
        },
        image: {
            type: 'STRING'
        },
        country: {
            type: 'STRING'
        },
        gender: {
            type: 'STRING'
        },
        isActive: {
            type: "boolean",
            defaultsTo: true
        },
        roles: {
            collection: "Role",
            via: "users",
            dominant: true
        },
        surveysCreated: {
            collection: "survey",
            via: "creator"
        },
        access: {
            collection: "access",
            via: "user"
        },
        surveysAnalyzed:{
            collection: "survey",
            via: "analysts",
            dominant: true
        },
        answers: {
            collection: "answer",
            via: "userAnswer"
        }
        ,
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function (user, cb) {

        delete user.password_confirmation;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function () {
            }, function (err, hash) {
                user.password = hash;
                cb(null, user);
            });
        });
    }
};
