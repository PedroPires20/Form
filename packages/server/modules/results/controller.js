var express = require("express")
const Result = require("./model")
const FieldValue = require("./resultItems/fieldValue/model")
const ResultItem = require("./resultItems/model")
const OptionValue = require("./resultItems/optionValue/model")
var router = express.Router()

router.get("/:formId", async function (req, res) {
  const result = await Result.findAll({
    where: { formId: req.params.formId },
    include: [
      {
        association: Result.ResultItems,
        include: [ResultItem.OptionValues, ResultItem.FieldValue],
      },
    ],
  })
  res.status(result ? 200 : 404).send(result)
})

router.post("/", async function (req, res) {
  const result = await Result.create(req.body, {
    include: [
      {
        association: Result.ResultItems,
        include: [ResultItem.OptionValues, ResultItem.FieldValue],
      },
    ],
  })
  res.send(result.toJSON())
})

module.exports = router
