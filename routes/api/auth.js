const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Item Model
const User = require("../../models/User");

//@route POST api/auth
//@desc Auth user
//@access Public

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User Does not Exist" });

  //Validate Password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    jwt.sign(
      { id: user.id },
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res.json({
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

//@route GET api/auth/user
//@desc GET user data
//access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
