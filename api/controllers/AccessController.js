/**
 * AccessController
 *
 * @description :: Server-side logic for managing Accesses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var access = require('../services/access');


module.exports = {

log: function(req, res){
	access.log(req, res);
}


};

