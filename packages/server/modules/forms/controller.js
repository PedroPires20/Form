const express = require("express")
const Form = require("./model")
const User = require("../users/model")
const Field = require("../fields/model")
const hasErrors = require("../../shared/helpers/hasErrors")
const createForm = require("./helpers/createForm")
const router = express.Router()

router.get("/full/:id", async function (req, res) {
  const form = await Form.findByPk(req.params.id, {
    include: [{ association: Form.Fields, include: [Field.Options] }],
  })
  res.status(form ? 200 : 404).send(form)
})

router.get("/:id", async function (req, res) {
  const form = await Form.findByPk(req.params.id)
  res.status(form ? 200 : 404).send(form)
})

router.get("/", async function (req, res) {
  const user = await User.findOne()

  const forms = await Form.findAll({ where: { userId: user.id } })
  res.send(forms)
})

router.post("/", async function (req, res) {
  const user = await User.findByPk(req.body.userId)
  const form = createForm({ ...req.body, userId: user && user.id })
  if (hasErrors(form.errors)) {
    res.status(400).send({ errors: form.errors })
  } else {
    const dbForm = await Form.create(form.data, {
      include: [{ association: Form.Fields, include: [Field.Options] }],
    })
    res.send(dbForm.toJSON())
  }
})

module.exports = router
