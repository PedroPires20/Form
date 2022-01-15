var express = require("express")
const Option = require("./model")
var router = express.Router()

router.get("/field/:fieldId", async function (req, res) {
  const options = await Option.findAll({
    where: { fieldId: req.params.fieldId },
  })
  res.send(options)
})

module.exports = router
