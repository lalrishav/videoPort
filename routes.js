var admin = require('./controllers/admin.js');
var album = require('./controllers/album.js');
var video = require('./controllers/video.js');
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

	app.get('/',(req,res)=>{
		var data = {};
		album.allLatest(req,res,(found)=>{
			
			data.album = found['data'];
			video.allLatest(req,res,(founds)=>{
				data.video = founds['data'];
				video.allPlaylist(req,res,(foundss)=>{
					data.playlist = foundss['data'];
					res.render('index',data);
				})
			})
		})
	})

	app.post('/create/playlist',(req,res)=>{
		video.createPlaylist(req,res,(found)=>{
			res.redirect("/");
		})
	})

	app.get('/playlist/:pid',(req,res)=>{
		var data = {};
		video.getPlaylist(req,res,(found)=>{
			console.log(found['data']);
			data.playlist = found['data'];
			video.allLatest(req,res,(founds)=>{
				data.video = founds['data'];
				res.render('playlist',data);
			})
			
		})
	})

	app.get('/playlist/:pid/:vid',(req,res)=>{
		video.addVideo(req,res,(found)=>{
			
		})
	})

	
}

