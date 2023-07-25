var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/gd9e4413bdd6b405fd46d694090b8ddd8903c27f80c8b8f9c9c8a63673ef65bbee3b89b28df56ff2658e5cee0ac506fef_340.jpg",
        description: "Welcome to the Cloud's Rest camp. As you can see the cloud is beautiful! So have a beautiful rest :)... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Desert Mesa",
        image: "https://pixabay.com/get/gd37fd111ecb21e37199599e37e0b4c721cebea83cad4c82137b117dee5c8bc8a6aebb73e54ad1fecb4c6ee71c1ae2d48_340.jpg",
        description: "Welcome to the Desert Mesa camp. Be warned! It can dry here at times :)... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Canyon Floor",
        image: "https://pixabay.com/get/g665b4913aa9cb30563ee0c8f63ae00d41f0131e3bba4e8b1072377a4364690598835cd39711e9f58da41aef93e40bb63_340.jpg",
        description: "Welcome to the Canyon Floor camp. WTH is Canyon??! Tell me about it if you do :)... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];
function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({})
        .then(remove => {
            console.log("removed campgrounds!");
            //add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed)
        //             .then(campground => {
        //                 console.log("added a campground");
        //                 //create a comment
        //                 Comment.create(
        //                     {
        //                         text: "This place is a great, but I wish there was internet",
        //                         author: "Ola"
        //                     })
        //                         .then(comment => {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created new comment");
        //                         })
        //                         .catch(error => {
        //                             console.log(error);
        //                         });
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        //     });
        })
        .catch(error => {
            console.log(error);
    });
    //add a few comments
}


module.exports = seedDB;