const { sequelize } = require("../../../sequelize")

const request = require("supertest")
const app = require("../../../app")

const validForm = {
  title: "Form title",
  description: "Form description",
  fields: [
    {
      order: 0,
      description: "Test description",
      label: "Test label",
      options: [{ order: 0, value: "option value", name: "option name" }],
      type: "checkbox",
    },
  ],
}

const timeout = 10000
describe("[Forms] - Integration Tests", () => {
  beforeAll(async () => {
    await sequelize.authenticate()
  })

  it(
    "should fetch all first user forms",
    (done) => {
      request(app)
        .get("/forms")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done)
    },
    timeout
  )

  it(
    "should create a form",
    (done) => {
      request(app)
        .post("/forms")
        .send(validForm)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done)
    },
    timeout
  )

  it(
    "should return 400 for invalid forms",
    (done) => {
      const invalidForm = { ...validForm }
      delete invalidForm.title
      request(app)
        .post("/forms")
        .send(invalidForm)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(async (response) => {
          const errors = response.body.errors
          expect(errors).toBeDefined()
          expect(errors.title).toBeDefined()
          expect(errors.title).toMatchObject({ type: "required" })

          done()
        })
        .catch(done)
    },
    timeout
  )

  it(
    "should return 400 for invalid fields",
    (done) => {
      request(app)
        .post("/forms")
        .send({
          ...validForm,
          fields: [...validForm.fields, {}],
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(async (response) => {
          const errors = response.body.errors
          expect(errors).toBeDefined()
          expect(errors.fields).toBeDefined()
          const field = errors.fields[0]
          expect(field).toBeDefined()
          expect(field).toMatchObject({
            label: { type: "required" },
            options: { type: "required" },
            order: { type: "required" },
            type: { type: "required" },
          })

          done()
        })
        .catch(done)
    },
    timeout
  )

  it(
    "should return 400 for invalid options",
    (done) => {
      request(app)
        .post("/forms")
        .send({
          ...validForm,
          fields: [
            ...validForm.fields,
            { ...validForm.fields[0], options: [{}] },
          ],
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(async (response) => {
          const errors = response.body.errors
          expect(errors).toBeDefined()
          expect(errors.fields).toBeDefined()
          const field = errors.fields[0]
          expect(field).toBeDefined()
          expect(field.options).toBeDefined()
          const option = field.options[0]
          expect(option).toBeDefined()
          expect(option).toMatchObject({
            name: { type: "required" },
            value: { type: "required" },
            order: { type: "required" },
          })

          done()
        })
        .catch(done)
    },
    timeout
  )
})
