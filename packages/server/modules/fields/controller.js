var express = require("express")
const Field = require("./model")
var router = express.Router()

router.get("/form/:formId", async function (req, res) {
  const fields = await Field.findAll({ where: { formId: req.params.formId } })
  res.send(fields)
})

module.exports = router
