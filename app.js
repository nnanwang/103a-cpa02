const createError = require("http-errors"); // to handle the server errors
const express = require("express");
const path = require("path");  // to refer to local paths
const cookieParser = require("cookie-parser"); // to handle cookies
const session = require("express-session"); // to handle sessions using cookies
const debug = require("debug")("personalapp:server"); 
const layouts = require("express-ejs-layouts");
const axios = require("axios")


// *********************************************************** //
//  Loading models
// *********************************************************** //

// const Schedule = require('./models/Schedule')

// *********************************************************** //
//  Loading JSON datasets
// *********************************************************** //

// *********************************************************** //
//  Connecting to the database
// *********************************************************** //

const mongoose = require( 'mongoose' );
const mongodb_URI = process.env.mongodb_URI
//const mongodb_URI = 'mongodb://localhost:27017/cs103a_todo'
//const mongodb_URI = 'mongodb+srv://cs103a:wn123456@cluster0.25gja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect( mongodb_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
// fix deprecation warnings
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});


// *********************************************************** //
// Initializing the Express server 
// This code is run once when the app is started and it creates
// a server that respond to requests by sending responses
// *********************************************************** //
const app = express();

// Here we specify that we will be using EJS as our view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



// this allows us to use page layout for the views 
// so we don't have to repeat the headers and footers on every page ...
// the layout is in views/layout.ejs
app.use(layouts);

// Here we process the requests so they are easy to handle
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Here we specify that static files will be in the public folder
app.use(express.static(path.join(__dirname, "public")));


// Here we enable session handling using cookies
app.use(
  session({
    secret: "zzbbyanana789sdfa8f9ds8f90ds87f8d9s789fds", // this ought to be hidden in process.env.SECRET
    resave: false,
    saveUninitialized: false
  })
);

// here is the code which handles all /login /signin /logout routes
const auth = require('./routes/auth');
const { deflateSync } = require("zlib");
app.use(auth)
const Contact = require("./models/Contact")


/* ************************
  Loading (or reloading) the data into a collection
   ************************ */
// this route loads in the courses into the Course collection
// or updates the courses if it is not a new collection

const isLoggedIn = (req,res,next) => {
  if (req.session.loggedIn) {
    next();
  }
  else res.redirect('/login');
}

app.get("/", 
(req, res, next) => {
  res.render("index");
});

app.get("/contactForms",
isLoggedIn,
 (req, res, next) => {
  res.render("contactForms");
});
  
app.get("/contact", function(req, res) {
  res.render("contact");
});
  
// Handling data after submission of form
app.post("/post_contact", (req, res) => {
  const myData = new Contact({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });

    myData.save()
      .then(item => {
        res.send("item saved to database")
      })
      .catch(err => {
        res.status(400).send("unable to save to database")
      });

});

app.post('/contact/bySubject',
  // show list of contact forms in a given subject
  async (req,res,next) => {
    const subject = req.body.subject;
    req.session.contacts = await Contact.find({subject:subject})
    res.redirect('/contact_list')
  }
)

app.get('/contact_list', isLoggedIn, (req, res, next) => {
  res.locals.contacts = req.session.contacts;
  res.render("contact_list");
});

app.get('/theProject', (req, res, next) => {
  res.render("theProject");
});

app.get("/honor", (req, res, next) => {
  res.render("honor");
});


// here we catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// *********************************************************** //
//  Starting up the server!
// *********************************************************** //
//Here we set the port to use between 1024 and 65535  (2^16-1)
const port = process.env.PORT || "5000";
app.set("port", port);
console.log('connecting on port '+port)


// and now we startup the server listening on that port
const http = require("http");
const { reset } = require("nodemon");
const server = http.createServer(app);

server.listen(port);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on("error", onError);

server.on("listening", onListening);

module.exports = app;