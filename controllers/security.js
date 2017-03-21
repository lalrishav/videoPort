var mongoose = require('mongoose');
require('../model/album.js');
var albumModel = mongoose.model('Album');

exports.validAid = (req,res,callback)=>{
	console.log(req.params.aid);
	albumModel.find({'_id':req.params.aid},(err,data)=>{
		if(err)
			throw err;
		else{
			if(data.length>0){
				callback({'res':true});
			}
			else
				callback({'res':false});
		}
	})
}