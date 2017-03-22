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
		
	
		/*var i = [];
		i[0]=req.body.album;
		console.log('------');
		console.log(i);
		console.log('--------');
		//console.log(i);
		var calls = [];
		var datas = [];
		i.forEach(function(k){
			console.log(typeof k);
			console.log('hello');
			var j = k;
			calls.push(function(callback){
				albumModel.findOne({'_id':j},function(err,album){
					if(err)
						throw err;
					console.log(k);
					
					 console.log('inside findone');
					 datas.rishav = album;
					callback(null,req);
				})
			})
		})

		async.parallel(calls,function(err,res){
			if(err)
				throw err;
			//console.log(res);
			console.log('this is calls');
			console.log(calls);
		})*/

		albumModel.findOne({'_id':'58c916740ee85f12c0246d1d'},function(err,data){
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

				
			}
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