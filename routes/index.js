var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    req.flash("success", "Maryam, my Love... I love you so much! Thank you for introducing me to programming. Look at how far I have come :)... I guess I am making you proud! And I promise to keep making you proud! Thank you for always, You remain the absolute fucking best!");
    res.render("landing");
});

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password)
        .then(user => {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        })
        .catch(error => {
            req.flash("error", error.message);
            return res.render("register", { error: error.message });
        });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});
//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//LOGOUT ROUTE
// router.get("/logout", function(req, res, next) {
//     req.logout();
//     req.flash("error", "Logged you out!");
//     res.redirect("/campgrounds");
// });

router.get("/logout", function(req, res, next) {
    req.logout(function(err){
        if (err){
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/campgrounds");
    });
    
});

module.exports = router;