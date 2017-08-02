/**
 * SurveyController
 *
 * @description :: Server-side logic for managing surveys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get:function(req,res){
        Survey.find()
            .exec(function(err,surveys){
                if(err){
                    return res.json(err);
                }
                return res.json(surveys);
            })
    },

    getSurveyCreatedByUser:function(req,res){
	var username = req.params.username;
        User.findOne({username:username})
            .populate('surveysCreated')
            .exec(function(err,surveys){
                if(err){
                    return res.json(err);
                }
                return res.json(surveys);
            })
    },

    createSurvey:function(req,res){
    	var id = req.body.id;
    	var postId = req.body.postId;
    	var resultId = req.body.resultId;
    	var creator = req.body.creator;
    	//IT SHOULD BE AUTOMATIC FROM SESSION
		Survey.create({id:id, postId:postId, resultId:resultId, creator:creator})
			.exec(function (err, survey){
				if(err){
					return res.json(err);
				}
				return res.json(survey);
			})
    },

    assignAnalyst:function(req,res){
    var username = req.body.username;
    var id = req.body.id;
        Survey.findOne({id:id})
            .exec(function (err, survey){
                if(err){
                    return res.json(err);
                }
                //return res.json(role);
                survey.analysts.add(username)
                survey.save(function(err) {
                    return res.json(err);
                });
                return res.json(survey)
        })
    },

    getSurveyAnalyzedBy:function(req,res){
    var username = req.params.username;
        User.findOne({username:username})
            .populate('surveysAnalyzed')
            .exec(function(err,surveys){
                if(err){
                    return res.json(err);
                }
                return res.json(surveys);
            })
    }
};

