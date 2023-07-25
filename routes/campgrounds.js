var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    Campgrounds.find({})
        .then(campgrounds => {
            req.flash("success", "Maryam is the love of my life!!!");
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
      })
        .catch(error => {
            console.log(error);
      });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    //Create a new campground and save to DB
    Campgrounds.create(newCampground)
    .then(result => {
        res.redirect("/campgrounds");
    // console.log("NEWLY CREATED CAMPGROUNDS: ")
    // console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

    // res.send("YOU HIT THE POST ROUTE");
});

//NEW - show form to create new campgrounds
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - shows info about one campground 
router.get("/:id", function(req, res) {
    Campgrounds.findById(req.params.id).populate("comments").exec()
    .then(foundCampground => {
        console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
  })
  .catch(error => {
    console.log(error);
  });
   
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campgrounds.findById(req.params.id)
            .then(foundCampground => {
               res.render("campgrounds/edit", {campground: foundCampground}); 
            });
});
//UPDATE CAMPGROUND GROUND
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground)
        .then(updatedCampground => {
    //redirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id);
        })
        .catch(error => {
            res.redirect("/campgrounds");
        });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campgrounds.findByIdAndRemove(req.params.id)
        .then(deleteCampground => {
            res.redirect("/campgrounds");
        })
        .catch(error => {
            res.redirect("/campgrounds");
        });
});

module.exports = router;
