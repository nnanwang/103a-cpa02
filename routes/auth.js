
   
/*
  auth.js uses bcrypt and salt to encode passwords ...
  This router defines the following routes
  /signin (post)
  /login (get and post)
  /logout (get)
  When the user logs in or signs in, 
  it adds their user name and user object to the req.session for use in the app.js controller
  and it sets the res.locals properties for use in the view
  res.locals.loggedIn
  res.local.username
  res.locals.user
*/

const express = require('express');
const Message = require('../models/Message');
const router = express.Router();
const saltRounds = 10;
var password = "123456";
try{
  const security = require('../public/data/security.json')
  password = security.password;
} catch (e){
  console.log("The file security.json doesn't exist in data! You might want use 123456 as password.\n Or add your own security.json file in data");
}

// This is an example of middleware
// where we look at a request and process it!
router.use(function(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date()}`);
  if (req.session.next_id != null){
    res.locals.loggedIn = true
  } else{
    res.locals.loggedIn = false
    res.locals.user = null
  }
  next();
});

router.get("/login", (req,res) => {
  res.render("login")
})

router.post('/login',
  async (req,res,next) => {
    try {
      const passphrase = req.body.passphrase
      if (passphrase == password) {
        let messages = await Message.find({});
        console.log("Have message ", messages.length)
        req.session.next_id = messages.length + 1;
        res.redirect('/')
      } else {
        res.redirect('/login')
      }
    }catch(e){
      next(e)
    }
  })

router.post('/signup',
  async (req,res,next) =>{
    try {
      const {username,passphrase,passphrase2,age} = req.body
      if (passphrase != passphrase2){
        res.redirect('/login')
      }else {
        const encrypted = await bcrypt.hash(passphrase, saltRounds);

        // check to make sure that username is not already taken!!
        const duplicates = await User.find({username})
        
        if (duplicates.length>0){
          // it would be better to render a page with an error message instead of this plain text response
          res.send("username has already been taken, please go back and try another username")
        }else {
          // the username has not been taken so create a new user and store it in the database
          const user = new User(
            {username:username,
             passphrase:encrypted,
             age:age
            })
          
          await user.save()
          req.session.username = user.username
          req.session.user = user
          res.redirect('/')
        }
        
        
      }
    }catch(e){
      next(e)
    }
  })

router.get('/logout', (req,res) => {
  req.session.destroy()
  res.redirect('/');
})

module.exports = router;