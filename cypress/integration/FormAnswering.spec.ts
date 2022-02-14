/// <reference types="cypress" />

const downloadsFolder = Cypress.config("downloadsFolder")
const testTargetSelector = (targetId: string) => `[data-test-target=${targetId}]`

describe("Test if a form can be answered by someone else", () => {
    before(() => {
        cy.fixture("createFormRequest.json").then((data) => {
            this.serverBaseUrl = data.serverBaseUrl
            const requestData = data.requestData
            this.formName = requestData.title
            this.formDesc = requestData.description
            this.formFields = requestData.fields
            cy.request("POST", `${this.serverBaseUrl}/forms`, requestData).then((response) => {
                cy.wrap(response.status).should("eq", 200)
                this.formId = response.body.id
            })
        })
        cy.fixture("formFillData1.json").then((data) => this.fillData = data)
    })

    it("Loads properly and displays the created form correctly", () => {
        // Alicie volta ao app form e vê que o formulário criado ainda está disponível
        cy.visit('/')
        cy.title().should("contain", "Form")
        cy.get('h1').should("contain.text", "Forms")
        cy.getTestTarget("form-list").children().should("have.length", 1)
        cy.getTestTarget("form-list").find(testTargetSelector("FL-item-info")).children().first().should("contain.text", this.formName)
        cy.getTestTarget("form-list").find(testTargetSelector("FL-item-info")).children().last().should("contain.text", this.formDesc)
        // Ela então clica no botão de visualizar o formulário e é redirecionada para a página de resposta
        cy.getTestTarget("form-list").first().find(testTargetSelector("FLI-action-buttons")).children().eq(2).click()
        cy.url().should("contain", `/view/${this.formId}`)
        // Na página de resposta ela confere que o nome e a descrição do form estão corretos
        cy.get('h1').should("have.length", 1).and("contain.text", this.formName)
        cy.getTestTarget("viewer-form-description").should("contain.text", this.formDesc)
        // Ela também verifica que o número de entradas, seus tipos, nomes e descrições estão corretos
        cy.getTestTarget("viewer-form").find('input:not([type]), input[type="text"]').should("have.length", 1) // Um input de texto
        cy.getTestTarget("viewer-form").find('input[type="radio"]').should("have.length", 4) // 4 botões radio
        cy.getTestTarget("viewer-form").find('input[type="checkbox"]').should("have.length", 7) // 7 checkboxes
        cy.getTestTarget("viewer-form").find('textarea').should("have.length", 1) // Um textarea
            // Verificando os labels
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-label")).should("have.length", this.formFields.length)
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-label"))    
            .each((label, index) => cy.wrap(label).should("contain.text", this.formFields[index].label))
            // Verificando as descrições
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-description")).should("have.length", 2)
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-description")).eq(0)
            .should("contain.text", this.formFields[0].description)
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-description")).eq(1)
            .should("contain.text", this.formFields[3].description)
        // Satisfeita, ela copia a url única de seu formulário e a compartilha com seu amigo Bob
    })

    it("Can be answered from the unique view page", () => {
        // Ao receber a url do form de Alice, Bob acessa essa url
        cy.visit(`/view/${this.formId}`)
        // Ele, então, preenche os campos com as suas informações
        cy.getTestTarget("viewer-form").find('input:not([type]), input[type="text"]').first().type(this.fillData.age)
        cy.getTestTarget("viewer-form").find('input[type="radio"]').eq(this.fillData.os).check()
        this.fillData.usedOs.map((checkboxId) => cy.getTestTarget("viewer-form").find('input[type="checkbox"]').eq(checkboxId).check())
        cy.getTestTarget("viewer-form").find('textarea').type(this.fillData.comments)
        // Ele verifica que as informações entradas conferem com o que é exibido
        cy.getTestTarget("viewer-form").find('input:not([type]), input[type="text"]').first().should("have.value", this.fillData.age)
        cy.getTestTarget("viewer-form").find('textarea').first().should("have.value", this.fillData.comments)
        cy.getTestTarget("viewer-form").find('input[type="radio"]')
            .each((radioBtn, index) => cy.wrap(radioBtn).should(`${(index === this.fillData.os)? '': 'not.'}be.checked`))
        cy.getTestTarget("viewer-form").find('input[type="checkbox"]')
            .each((radioBtn, index) => cy.wrap(radioBtn).should(`${(this.fillData.usedOs.includes(index))? '': 'not.'}be.checked`))
        // Ele, então, submete os resultados clicando em enviar. Após o envio com sucesso ele está de volta na página home
        cy.getTestTarget("viewer-form-submit").click()
        cy.url().should("not.contain", "/view/")
        cy.get('h1').should('have.length', 1).and('contain', 'Forms')
        // Satisfeito, ele vai dormir
    })

    it("Can retrieve the answers from other users", () => {
        // Sabendo que Bob respondeu seu formulário, Alice acessa o sistema Form para verificar o que ele respondeu
        cy.visit('/')
        // Ela vê, novamente, a listagem de forms com o form criado por ela
        cy.title().should("contain", "Form")
        cy.get('h1').should("contain.text", "Forms")
        cy.getTestTarget("form-list").children().should("have.length", 1)
        cy.getTestTarget("form-list").find(testTargetSelector("FL-item-info")).children().first().should("contain.text", this.formName)
        cy.getTestTarget("form-list").find(testTargetSelector("FL-item-info")).children().last().should("contain.text", this.formDesc)
        // Em seguida, ela clica no botão para fazer download dos resultados como CSV
        cy.getTestTarget("form-list").first().find(testTargetSelector("FLI-action-buttons")).children().eq(1).click()
        // Ao clicar no botão, ela vê que é feito o download de um arquivo chamado "(Nome do Form)-resultados.csv"
        cy.readFile(`${downloadsFolder}/${this.formName}-resultados.csv`).should("exist")
        // Ela abre o arquivo baixado e verifica as informações fornecidas por Bob, que coincidem com o fornecido por ele ao formulário
        cy.readFile(`${downloadsFolder}/${this.formName}-resultados.csv`).then((fileData) => {
            expect(fileData).to.not.be.null
            cy.task('parse-csv', fileData).then((resultData) => {
                expect(resultData).to.have.length(2)
                expect(resultData[0]).to.have.length(4)
                expect(resultData[1]).to.have.length(4)
                const expectedHeader = this.formFields.map((field) => field.label)
                expect(resultData[0][0].trim()).to.eq(expectedHeader[0])
                expect(resultData[0][1].trim()).to.eq(expectedHeader[1])
                expect(resultData[0][2].trim()).to.eq(expectedHeader[2])
                expect(resultData[0][3].trim()).to.eq(expectedHeader[3])
                const expectedData = [this.fillData.age, this.fillData.os, String(this.fillData.usedOs), this.fillData.comments]
            })
        })
    })

    after(() => {
        // Limpeza, removendo o form criado para testes
        cy.request("DELETE", `${this.serverBaseUrl}/forms/${this.formId}`).then((response) => {
            cy.wrap(response.status).should("eq", 204)
        })
    })
})
