var Campgrounds = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //is user loggedin?
    if (req.isAuthenticated()){
        Campgrounds.findById(req.params.id)
            .then(foundCampground => {
                //does user own the campground
                if (foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            })
            .catch(error => {
                req.flash("error", "Campground not found");
                res.redirect("back");
            });
    }
    else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    //is user loggedin?
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id)
            .then(foundComment => {
                //does user own the comment?
                if (foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            })
            .catch(error => {
                res.redirect("back");
            });
    }
    else {
        req.flash("error", "You need to be loggedd in to do that")
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;