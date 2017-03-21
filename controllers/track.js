var mongoose = require('mongoose');
require('../model/track.js');
var trackModel = mongoose.model('Track');

exports.getTrack = (req,res,callback)=>{
	let searchParms = {};
	searchParms.aid = req.params.aid;
	console.log(searchParms);
	trackModel.find(searchParms,(err,found)=>{
		console.log(found.length);
		if(err)
			throw err;
		else{
			if(found.length!=0)
				callback({'res':true,'data':found});
			else
				callback({'res':false});
		}
	})
}