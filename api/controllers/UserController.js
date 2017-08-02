/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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




};

