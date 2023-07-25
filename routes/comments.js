var express = require("express");
var router = express.Router({mergeParams: true});
var Campgrounds = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campgrounds by id
    Campgrounds.findById(req.params.id)
        .then(campground => {
            res.render("comments/new", {campground: campground});
        })
        .catch(error => {
            console.log(error);
        });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campgrounds.findById(req.params.id)
        .then(campground => {
            //create new comment
            Comment.create(req.body.comment)
                .then(comment => {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground's show page
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                })
                .catch(error => {
                    req.flash("error", "Something went wrong");
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
            res.redirect("/campgrounds");
        });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id)
        .then(foundComment => {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        })
        .catch(error => {
            res.redirect("back");
        });
});

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
        .then(updatedComment => {
            res.redirect("/campgrounds/" + req.params.id);
        })
        .catch(error => {
            res.redirect("back");
        });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id)
        .then(deleteComment => {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        })
        .catch(error => {
            res.redirect("back");
        });
});

module.exports = router;