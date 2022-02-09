var express = require("express")
const User = require("./model")
const router = express.Router()

router.get("/:id", async function (req, res) {
  const user = await User.findByPk(req.params.id, { include: [User.Forms] })
  res.send(user)
})

router.get("/", async function (_, res) {
  const user = await User.findOne()
  res.send({ ...user, uga: "buga" })
})

router.post("/", async function (req, res) {
  const user = await User.create(req.body)
  res.send(user.toJSON())
})

module.exports = router
