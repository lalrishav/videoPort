var mongoose = require('mongoose');

require('../model/video.js');
require('../model/album.js');
require('../model/playlist.js');

var videoModel = mongoose.model('Video');

var playlistModel = mongoose.model('Playlist');
var albumModel = mongoose.model('Album');

exports.allLatest = (req,res,callback)=>{
	let searchParam = {};
	searchParam.isDisabled = false;
	videoModel.find(searchParam,function(err,found){
		if(err)
			throw err;
		else
			callback({'res':true,'data':found});
	}).sort([['dateCreated','descending']]);
}

exports.createPlaylist = (req,res,callback)=>{
	console.log(req.body.name);
	new playlistModel({
		name : req.body.name
	}).save((err)=>{
		if(err)
			throw err;
		else
			console.log('bha galey');
		callback();
	})
}

exports.allPlaylist = (req,res,callback)=>{
	playlistModel.find((err,found)=>{
		if(err)
			throw err;
		else
			callback({'res':true,'data':found});
	})
}

exports.getPlaylist = (req,res,callback)=>{
	let searchParam = {};

	console.log(req.params.pid);
	searchParam._id = req.params.pid;
	playlistModel.findOne(searchParam,function(err,found){
		if(err)
			throw err;
		else
			callback({'res':true,data:found})
	})
}

exports.addVideo = (req,res,callback)=>{
	videoModel.findOne({_id:req.params.vid},function(err,data){
		if(err)
			throw err;
		else{
			playlistModel.findByIdAndUpdate(
					req.params.pid,
					{$push: {videos:data}},
					{safe:true,upsert:true,new:true},
					function(err,model){
						if(err)
							throw err;
						else
							res.redirect("/playlist/"+req.params.pid);
					}
				)
		}
	})
}

exports.updateDemo = (req,res,callback)=>{
	playlistModel.findByIdAndUpdate(
			'58d2a944baf5781690428446',
			{$push: {test:"not"}},
			{safe:true,upsert:true,new:true},
			function(err,model){
				if(err)
					console.log(err);
				else
					console.log('updates');
			}
		)
}

