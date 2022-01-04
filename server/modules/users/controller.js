var express = require('express');
const User = require('./model');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(_, res) {
  const users = await User.findAll()
  res.send(users);
});

router.post("/", async function(req, res) {
  const user = await User.create(req.body);
  console.log(user.toJSON());
  res.send(user.toJSON())
})

module.exports = router;
