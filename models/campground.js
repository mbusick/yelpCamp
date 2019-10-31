var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	cost: Number,
	location: String,
	lat: Number,
	lng: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Campground", campgroundSchema);