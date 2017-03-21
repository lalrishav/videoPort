var fs = require('fs');
var mongoose = require('mongoose');
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

/*exports.uploadVideo = function(req,res,callback){
	var i=0;
	req.files.forEach(function(key){
		albumModel.findOne({'_id':req.body.album},function(err,data){
			console.log(data);
			if(err)
				throw err;
			else{
				new videoModel({
					name 	: 	req.files[i].originalname,
					album 	: 	data
				}).save(function(err,data){
					if(err)
						throw err;
					else
						console.log('new video added to album '+data.name);
				})
			}
		})


		
		

		i++;
	})
	callback({'res':true,'flash-message':req.flash('uploadStatus','Files uploaded successfully')});
	

}*/




exports.uploadVideo = function(req,res,callback){
	let params = {};
	console.log(typeof req.body.album);
	params._id = req.body.album;

	albumModel.find(params,function(err,data){
		console.log(data);
	})


}
