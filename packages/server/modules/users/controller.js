var express = require("express")
const User = require("./model")
var router = express.Router()

/* GET users listing. */
router.get("/:id", async function (req, res) {
  const user = await User.findByPk(req.params.id, { include: [User.Forms] })
  res.send(user)
})

router.post("/", async function (req, res) {
  const user = await User.create(req.body)
  console.log(user.toJSON())
  res.send(user.toJSON())
})

module.exports = router
