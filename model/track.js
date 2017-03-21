var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var trackSchema = new Schema({
	aid			: {type:String,required:true},
	vid			: {type:String,required:true}
},{collection:'track'});

mongoose.model('Track',trackSchema);