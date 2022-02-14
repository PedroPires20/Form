const { spawn } = require("child_process")
const app = spawn("yarn", ["server", "start"])
const jest = spawn("yarn", ["server", "test"])

app.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`)
})

jest.on("close", () => {
  console.log("jest closed", app.pid)
  spawn("kill", [app.pid])
})
