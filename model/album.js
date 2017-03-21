var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
	name			: {type:String,required:true},
	dateCreated		: {type:Date,default:new Date()},
	lastModified	: {type:Date,default:new Date()},
	isDisabled		: {type:Boolean,default:false},
	
},{collections:'album'})

var Album = mongoose.model('Album',albumSchema);
