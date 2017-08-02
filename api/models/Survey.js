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
		type:"string",
		required:true
	},
	name: {
		type: "string", 
		required: true
	},
	text: {
		type: "json"
	},
	resultId: {
		type:"string",
		required:true
	},
	postId :{
		type:"string",
		required:true
	},
	creator: {
		model: "user"
	},
	analysts: {
		collection: "user",
		via: 'surveysAnalyzed'
	},
	isActive: {
		type: "string"
	},
	usersAnswered: {
		collection: "user",
		via: 'surveysAnswered'
	}

  }
};

