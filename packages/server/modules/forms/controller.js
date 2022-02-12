const express = require("express")
const Form = require("./model")
const User = require("../users/model")
const Field = require("../fields/model")
const hasErrors = require("../../shared/helpers/hasErrors")
const createForm = require("./helpers/createForm")
const mkForm = require("./helpers/mkForm")
const Option = require("../options/model")
const { differenceWith } = require("ramda")
const updateForm = require("./helpers/updateForm")
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

  const forms = await Form.findAll({
    where: { userId: user.id },
    order: [["createdAt", "DESC"]],
  })
  res.send(forms)
})

router.delete("/:id", async function (req, res) {
  await Form.destroy({ where: { id: req.params.id } })
  res.status(204).send()
})

router.post("/", async function (req, res) {
  const user = await User.findOne()
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

router.put("/", async function (req, res) {
  const user = await User.findOne()
  const form = updateForm({ ...req.body, userId: user && user.id })
  if (hasErrors(form.errors)) {
    res.status(400).send({ errors: form.errors })
  } else {
    await Form.update(form.data, {
      where: { id: req.body.id },
    })
    const dbFields = await Field.findAll({ where: { formId: req.body.id } })
    const differenceById = differenceWith((a, b) => a.id === b.id)
    await Promise.all(
      differenceById(dbFields, form.data.fields).map(async (field) => {
        await Field.destroy({ where: { id: field.id } })
      })
    )
    await Promise.all(
      form.data.fields.map(async (field) => {
        await Field.findOne({ where: { id: field.id } }).then(
          async (dbField) => {
            if (dbField) {
              await dbField.update(field)
            } else {
              await Field.create(field)
            }
          }
        )
        const dbOptions = await Option.findAll({ where: { fieldId: field.id } })
        await Promise.all(
          differenceById(dbOptions, field.options).map(async (option) => {
            await Option.destroy({ where: { id: option.id } })
          })
        )
        await Promise.all(
          field.options.map(async (option) => {
            await Option.findOne({ where: { id: option.id } }).then(
              async (dbOption) => {
                if (dbOption) {
                  await dbOption.update(option)
                } else {
                  await Option.create(option)
                }
              }
            )
          })
        )
      })
    )
    res.status(204).send()
  }
})

module.exports = router
