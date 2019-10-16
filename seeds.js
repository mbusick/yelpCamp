var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest", 
	 	image: "https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722f79d39f4dc650_960.jpg&user=Pexels",
		description: "Pork loin drumstick cow, andouille cupim prosciutto frankfurter tenderloin capicola pancetta pork tri-tip jowl alcatra. Biltong t-bone swine, turducken porchetta pork belly leberkas pastrami chuck burgdoggen hamburger jerky shoulder. Strip steak tail pig, brisket turkey beef swine ball tip hamburger jowl meatball cupim pork loin doner ham. Chuck pancetta andouille venison shank pork chop drumstick, turducken rump. Rump venison beef ribs biltong ball tip frankfurter buffalo pork. Drumstick strip steak porchetta cupim pancetta swine rump biltong leberkas t-bone."
	},
	{
		name: "Desert Mesa", 
	 	image: "https://www.photosforclass.com/download/pixabay-1189929?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c722f79d39f4dc650_960.jpg&user=Noel_Bauza",
		description: "Pork loin drumstick cow, andouille cupim prosciutto frankfurter tenderloin capicola pancetta pork tri-tip jowl alcatra. Biltong t-bone swine, turducken porchetta pork belly leberkas pastrami chuck burgdoggen hamburger jerky shoulder. Strip steak tail pig, brisket turkey beef swine ball tip hamburger jowl meatball cupim pork loin doner ham. Chuck pancetta andouille venison shank pork chop drumstick, turducken rump. Rump venison beef ribs biltong ball tip frankfurter buffalo pork. Drumstick strip steak porchetta cupim pancetta swine rump biltong leberkas t-bone."
	},
	{
		name: "Cannon Floor", 
	 	image: "https://www.photosforclass.com/download/pixabay-1845719?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c722f79d39f4dc650_960.jpg&user=Pexels",
		description: "Pork loin drumstick cow, andouille cupim prosciutto frankfurter tenderloin capicola pancetta pork tri-tip jowl alcatra. Biltong t-bone swine, turducken porchetta pork belly leberkas pastrami chuck burgdoggen hamburger jerky shoulder. Strip steak tail pig, brisket turkey beef swine ball tip hamburger jowl meatball cupim pork loin doner ham. Chuck pancetta andouille venison shank pork chop drumstick, turducken rump. Rump venison beef ribs biltong ball tip frankfurter buffalo pork. Drumstick strip steak porchetta cupim pancetta swine rump biltong leberkas t-bone."
	}
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err)
				}else{
					console.log("added a campground");
					// add a comment
					Comment.create(
						{
							text: "This place is great, but i wish there was internet",
							author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("created new comment");
							}
						});
					}
				});
			});
		});		
};

module.exports = seedDB;


