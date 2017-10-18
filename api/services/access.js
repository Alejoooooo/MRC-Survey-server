module.exports = {

log: function(req, res) {
	Access.query('INSERT INTO `access`(`user`, `data`) VALUES (?, ?);', [ req.body.username, new Date()] ,function(err, rawResult) {
  if (err) { return res.json(err); }

  //return res.json("AccessLogged");

});
}


};
