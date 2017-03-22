var fs = require('fs');
var mongoose = require('mongoose');
var async = require('async');
require('../model/album.js');
require('../model/video.js');
require('../model/track.js');
var albumModel = mongoose.model('Album');
var videoModel = mongoose.model('Video');
var trackModel = mongoose.model('Track');

exports.createAlbum = function(req,res,callback){
	var dir = 'public/albums/'+req.body.album+'/'; //path of directory where all albums will be stored
	if(!fs.existsSync(dir)){ //chek if the album all ready exists
		fs.mkdirSync(dir); //create a new album folder in the mentioned directory

  		//adding albu detail to database
		let newAlbum = new albumModel({
			name		: req.body.album
		})
		newAlbum.save(function(err){
			if(err)
				throw err;
		});
		console.log('new album created with name '+req.body.album);

		callback({'res':true,'flash-message':req.flash('info','Created successfully')});

	}
	else
		callback({'res':false,'flash-message':req.flash('info','can not be created')})
	
}

exports.uploadVideo = function(req,res,callback){
	albumModel.findOne({'_id':req.body.album},function(err,data){
			if(err)
				throw err;
			else{
				//console.log(album);
				console.log('hello');
				var i=0;
				var calls = [];
				async.each(req.files,function(key,callback){
					new videoModel({
						name   : key.originalname,
						album  : data
					}).save(function(err,found){
						if(err)
							throw err;
						console.log('inside save '+found.name);
						callback();
					})
				},
					function(err){
					if(err)
						throw err;
					console.log('baharnikal gye');
				}

				

				
			)
				callback({'res':true});
			}


	})
}

