var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    session = require('express-session'),
    mongoose     = require("mongoose"),
    MongoStore = require('connect-mongo')(session),
    flash        = require("connect-flash"),
    passport     = require("passport"),
    LocalStrategy =require("passport-local"),
    methodOverride = require("method-override"),
    Campgrounds  = require("./models/campground"),
    Comment      = require("./models/comment"),
    User         = require("./models/user"),
    seedDB       = require("./seeds");

//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
mongoose.connect('mongodb://127.0.0.1:27017/yelp_camp',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

//PASSPORT CONFIGURATION
// //Initial configuration
// app.use(require("express-session")({
//     secret: "I love Maryam a lot!!!",
//     resave: false,
//     saveUninitialized: false
// }));

//New configuration
app.use(
  session({
    store: new MongoStore({ mongooseConnection: db }),
    secret: "I love Maryam a lot!!!",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});