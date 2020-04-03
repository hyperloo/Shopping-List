const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Item Model
const User = require("../../models/User");

//@route POST api/users
//@desc Register new User
//@access Public

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  //simple validation
  if (!name || !email || !password) {
    // console.log(req);
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ msg: "Already registered with this email" });
  } else {
    const newUser = new User({
      name,
      email,
      password
    });

    //Create Salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  }
});

module.exports = router;
