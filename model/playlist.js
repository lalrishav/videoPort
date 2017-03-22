var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playlistSchema = new Schema({
	name		: {type:String,require:true},
	videos		: {type:[mongoose.Schema.Types.ObjectId],ref: 'Video'},
	//user		: {type:mongoose.Schema.Types.ObjectId,ref: 'User'}
	//test		: {type:[String]}
},{collection:'playlist'})

var Playlist = mongoose.model('Playlist',playlistSchema);