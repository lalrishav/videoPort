var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var videoSchema = new Schema({
	name		: {type:String,required:true},
	createdAt	: {type:String,default:new Date()},
	isDisabled	: {type:Boolean,default:false},
	album		: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'}
},{collection:'video'})

var Video = mongoose.model('Video',videoSchema);