/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt-nodejs');


module.exports = {

//RETURN ALL USERS
get:function(req,res){
        User.find()
            .populate('roles')
            .exec(function(err,users){
                if(err){
                    return res.json(err);
                }
                return res.json(users);
            })
    },

//RETURN ROLES OF A SPECIFIC USER
getRoles:function(req,res){
	var username = req.params.name;
        User.findOne({username:username})
            .populate('roles')
            .exec(function(err,user){
                if(err){
                    return res.json(err);
                }
                return res.json(user.roles);
            })
    },

 //RETURN USERS OF A SPECIFIC ROLE
 //CHECK THIS
getUsersByRole:function(req,res){
	var role = req.params.name;
        Role.findOne({role:role})
            .populate('users')
            .exec(function(err,users){
                if(err){
                    return res.json(err);
                }   
                return res.json(users);
            })
    },

setRoleToUser:function(req,res){
	var role = req.body.role;
	var username = req.body.username;
		User.findOne({username:username})
			.exec(function (err, user){
				if(err){
                    return res.json(err);
                }
                //return res.json(role);
                user.roles.add(role)
                user.save(function(err) {
                	return res.json(err);
                });
                return res.json(user)
		})
    },

    setPassToUser:function(req,res){
    var password = req.body.password;
    var username = req.body.username;
        User.findOne({username:username})
            .exec(function (err, user){
                if(err){
                    return res.json(err);
                }
                //return res.json(role);
                bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function () {
            }, function (err, hash) {
                var passC = hash;
                
                    user.password = passC;
                    user.save(function(err) {
                    return res.json(err);
            });
        });

                });
                })
    },

setUserRole:function(req,res){
    var role = "user";
    var username = req.body.username;
        User.findOne({username:username})
            .exec(function (err, user){
                if(err){
                    return res.json(err);
                }
                //return res.json(role);
                user.roles.add(role)
                user.save(function(err) {
                    return res.json(err);
                });
                return res.json(user)
        })
    },

whoami : function (req, res){
    return res.json(req.user);
    //return res.json(req.session);
},

me : function (req, res){
    User.findOne({username:req.user.username})
        .populateAll()
        .exec(function(err,user){
                if(err){
                    return res.json(err);
                }
                return res.json(user);
            })
},



registerUser:function(req,res){
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var gender = req.body.gender;
        var birthDate = req.body.birthDate;
        var country = req.body.country;
        var image = req.body.image;
        User.create({username:username, password:password, email:email, gender:gender, birthDate:birthDate, country:country, image:image})
            .exec(function (err, user){
                if(err){
                    return res.json(err);
                }
                user.roles.add("utente")
                return res.json(user);
            })
    },


getAnswerToSurvey:function(req,res){
User.query('select answer.id, answer.text, answer.userAnswer, answer.survey, answer.createdAt from user, survey, answer where user.username = answer.userAnswer and answer.survey = survey.id and survey.id = ? and user.username = ?', [ req.params.id, req.params.username ] ,function(err, rawResult) {
  if (err) { return res.json(err); }

  return res.json(rawResult);

});
}


/*hashPassword:function (req, res){
    var bcrypt = require('bcrypt');
    const saltRounds = 10;
    var password = req.body.password;

    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        return res.json(hash);
    });
});

    
}*/


/*
getUsersWhoAnsweredToSurvey:function(req,res){
    var survey = req.params.survey;
        Survey.findOne({id:id})
            .populate('usersAnswered')
            .exec(function(err,users){
                if(err){
                    return res.json(err);
                }
                return res.json(users);
            })
    }

*/


};

