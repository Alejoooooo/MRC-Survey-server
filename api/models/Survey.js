/**
 * Survey.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	id:{
		primaryKey:true,
		type:"integer",
		autoIncrement: true
	},
	name: {
		type: "string", 
		required: true
	},
	description: {
		type: "string"
	},
	text: {
		type: "json"
	},
	resultId: {
		type:"string"
	},
	postId :{
		type:"string"
	},
	creator: {
		model: "user"
	},
	analysts: {
		collection: "user",
		via: 'surveysAnalyzed'
	},
	isActive: {
		type: "boolean"
	},
	answers: {
            collection: "answer",
            via: "survey"
    }

  }
};

