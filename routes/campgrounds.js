var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require('geocoder');

//Index - show all campgrounds
router.get("/", function(req, res){
	//get all campgrounds from the db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/Index",{campgrounds:allCampgrounds, currentUser: req.user});
		}
	});
});
//create
router.post("/", middleware.isLoggedIn, function(req, res){
	console.log(req);
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var cost = req.body.cost;
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || data.status === 'ZERO_RESULTS') {
			req.flash('error', 'Invalid address');
			return res.redirect('back');
			}
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var location = data.results[0].formatted_address;
		var newCampground = {name: name, image: image, description: desc, cost: cost, author: author, location: location, lat: lat, lng: lng}
		Campground.create(newCampground, function(err, newlyCreated){
			if(err){
				connected.log(err);
			}else{
				//redirect back to campgrounds page
				console.log(newlyCreated);
				res.redirect("/campgrounds");
			}
		});
	});
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	console.log(req);

	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
	//find the campground with that id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			//render show template with that campgroungd
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	console.log('request ', req);
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});  
});

//Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err){
		if(err){
			res.redirect("/campground");
		}else{
			//redirect somewhere(show page)
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;