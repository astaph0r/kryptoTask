const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const User = require("../models/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email })
      .then(user => {
          if (!user) return res.status(400).json({ msg: "User not exist" })

          bcrypt.compare(password, user.password, (err, data) => {
              if (err) throw err

              //if both match than you can do anything
              if (data) {
                const token = jwt.sign({_id: user._id}, process.env.SECRET);
                res.cookie("jwt", token, {
                  expires: new Date(Date.now()+604800),
                  httpOnly: true
        });
              } else {
                  return res.status(401).json({ msg: "Invalid credential" })
              }

          })

      })

});

router.post('/register', (req, res) => {
  
  const {
      fullName,
      email,
      password
  } = req.body;

  if (!fullName || !email || !password) {
    res.status(400).json({
      "data": "Something went wrong."
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        res.status(400).json({
          "data": "Email already exists."
        });
      } else {
        const newUser = new User({
          fullName,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
  }
});

module.exports = router;
