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
    },
    getAnswers:function(req,res){
    var id = req.params.id;
        Survey.findOne({id:id})
            .populate('answers')
            .exec(function(err,survey){
                if(err){
                    return res.json(err);
                }
                return res.json(survey.answers);
            })
    },


/*
getSurveysAnsweredByUsername:function(req,res){
    var username = req.params.username;
        User.findOne({username:username})
            .populate('answers')
            .exec(function(err,user){
               


                Survey.find()
                    .populate('answers')
                    .exec(function(err, survey){
                        if(err){
                    return res.json(err);
                        }
                        return res.json(survey);
                    })








                if(err){
                    return res.json(err);
                }
                return res.json(user);
                
            })
    }

    */

getSurveysAnsweredByUsername:function(req,res){
User.query('select survey.id, survey.name, survey.text, survey.resultId, survey.creator, survey.isActive from user, survey, answer where user.username = answer.userAnswer and answer.survey = survey.id and user.username = ?', [ req.params.username ] ,function(err, rawResult) {
  if (err) { return res.json(err); }

  return res.json(rawResult);

});
}



};

