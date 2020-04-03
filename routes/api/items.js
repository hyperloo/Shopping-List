const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Item = require("../../models/Item");

//@route GET api/items
//@desc GEt All Items
//@access Public

router.get("/", (req, res) => {
  /** Method 1  */
  //   Item.find({}).sort({date :-1}).then(items => res.json(items));
  /** Method 2  */
  Item.find({})
    .sort({ date: -1 })
    //.then takes one parameter at one time in a function
    .then(
      items => {
        //this is a function to be executed
        res.json(items);
      },
      err => console.log(err) //this is function for error handling
    );

  /*
    sort({criteria}) can be used in mongoose in following ways

    Post.find({}).sort('test').exec(function(err, docs) { ... });
    Post.find({}).sort([['date', -1]]).exec(function(err, docs) { ... });
    Post.find({}).sort({test: 1}).exec(function(err, docs) { ... });
    Post.find({}, null, {sort: {date: 1}}, function(err, docs) { ... });
    
    */
  /** Method 3  */
  //   Item.find({}, null, { sort: { date: -1 } }, (err, items) => {
  //     if (err) {
  //       res.status(404).json({ success: false });
  //     } else {
  //       res.json(items);
  //     }
  //   });
});

//@route Post api/items
//@desc Post Create a Items
//@access Public
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});

//@route Delete api/items/:id
//@desc Delete an Items
//@access Public
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id).then(item =>
    item
      .remove()
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json({ success: false }))
  );
});

module.exports = router;
