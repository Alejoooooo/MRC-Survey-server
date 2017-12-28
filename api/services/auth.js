var passport = require("passport");
var jwt = require('jsonwebtoken');
var access = require('../services/access');
var telegram = require('telegram-bot-api');
var api = new telegram({
    token: '487163058:AAGdE3-02TRtFxPIjO15Bc05CleyKpoqsJk'
});

module.exports = {
    login: function (req, res) {
        passport.authenticate('local', function (err, user) {
            if (!user) {
                res.send({
                    success: false,
                    message: 'invalidLogin'
                });
                return;
            } else {
                if (err) {
                    res.send({
                        success: false,
                        message: 'unknownError',
                        error: err
                    });
                } else {
                    //IN QUESTO PUNTO DOVREBBE FARE LOG ACCESSO

                    var token = jwt.sign(user[0], sails.config.secret, {
                        expiresIn: 6000000 * 24
                    });
                    // Set persistent cookie
                    req.session.cookie.token = token;
                    res.send({
                        success: true,
                        user: user[0],
                        token: token
                    });

                    api.sendMessage({
                        chat_id: 69886441,
                        text: user[0]["username"] + " ha effettuato l'accesso al sistema"
                    });
                    //access.log(req, res);
                }
            }
        })(req, res);
    },
    isvalidtoken: function (req, res) {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization.replace('Bearer ', ''), sails.config.secret, function (err, decoded) {
                if (err) return res.send({
                    success: false
                });
                if (decoded) {
                    return res.send({
                        success: true,
                        user: decoded[0]
                    });
                }
            });
        } else {
            return res.send({
                success: false
            });
        }
    }
};
