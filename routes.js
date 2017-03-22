var admin = require('./controllers/admin.js');
var album = require('./controllers/album.js');
var track = require('./controllers/track.js');
var security = require('./controllers/security.js');
var mongoose = require('mongoose');
var albumModel = mongoose.model('Album');
var videoModel = mongoose.model('Video');
var Sync = require('sync');
var async = require('async');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,__dirname+'/')
	},
	filename: function(req,file,cb){
		cb(null,file.originalname);
	}
});

var upload = multer({ storage:storage });


module.exports = function(app){
	app.get('/createAlbum',function(req,res){
		var dir = __dirname + '/upload';
		res.render('createAlbum',{ messages: req.flash('info') });
	})

	app.post('/createAlbum',function(req,res){
		admin.createAlbum(req,res,(found)=>{
			res.redirect('/createAlbum');
		})
	})

	app.get('/uploadVideo',function(req,res){
		
		album.all(req,res,(found)=>{
			let data = {};
			data.messages='a';
			data.albums=found['data'];
			res.render('uploadVideo',data);
		})
	})

	app.post('/uploadVideo',upload.any(),function(req,res){

		admin.uploadVideo(req,res,(found)=>{
			console.log(found);
		})

		

		
	})

	app.get('/videos/:aid',(req,res)=>{
		track.getTrack(req,res,(found)=>{
			let data = {};
			data.videos = found['data'];
			if(found['res']==false){

				res.send("<html>No videos found</html>")
			}
			else
				res.render('videos',data);
		})
	})

	app.get('/404',(req,res)=>{
		res.send("<html><h1>404 ERROr</h1></html>")
	})

	
}

var find = function(req,res){
		var i = req.body.album;
		console.log(i);
		console.log('going to find');
		var album = {};
		albumModel.findById(i,function(err,data){
			if(err)
				throw err;
			else{
				console.log('abcd');
				return data;
			}
		})
}