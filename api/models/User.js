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
        password: {
            type: 'STRING',
            required: true
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
        surveysAnalyzed:{
            collection: "survey",
            via: "analysts",
            dominant: true
        },
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
