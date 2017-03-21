var mongoose = require('mongoose');
var videoModel = mongoose.model('Video');
require('../model/video.js');
require('../model/album.js');

var albumModel = mongoose.model('Album');
exports.all = function(req,res,callback){
	let searchParm = {};
	searchParm.isDisabled = false;
	albumModel.find(searchParm,function(err,found){
		if(err)
			throw err;
		else{
			callback({'res':true,'data':found});
		}
	}).sort([['name', 'ascending']])
}



