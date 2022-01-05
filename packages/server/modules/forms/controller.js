const express = require("express")
const Form = require("./model")
const User = require("../users/model")
const Field = require("../fields/model")
const Option = require("../options/model")
const router = express.Router()

router.get("/", async function (req, res) {
  res.send(await Form.findAll())
})

router.post("/", async function (req, res) {
  const user = await User.findOne()
  const form = await Form.create(
    {
      title: req.body.title,
      description: req.body.description,
      fields: req.body.fields,
      userId: user.id,
    },
    { include: [{ association: Form.Fields, include: [Field.Options] }] }
  )
  res.send(form.toJSON())
})

module.exports = router
