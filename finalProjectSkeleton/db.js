var mongoose = require('mongoose');
URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({ });
var Comment = new mongoose.Schema({
  name: {type:String, required:[true, '{PATH} is required']}
  });

//post comments under each artwork or update status,
//users can comment anything but it will be a string
var Item = new mongoose.Schema({
	  name: {type:String, required:[true, '{PATH} is required']}
});
    // define the data in our collection with validation
var List = new mongoose.Schema({
      name: {type:String, required:[true, '{PATH} is required']},
      createdBy:{type:String, required:[true, '{PATH} is required']},
      contact: {type:Number, min:[0, '{PATH} must be greater than {MIN}']},
      date: {type:String, required:[true, '{PATH} is required']},
      email: {type:String, required:[true, '{PATH} is required']},
      items: [Item]
    });

UserSchema.plugin(passportLocalMongoose);

List.plugin(URLSlugs('name createdBy'));
mongoose.model('List', List);
mongoose.model('Item', Item);

mongoose.model('Comment', Comment);
mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost/finalProjectDb');
