/// <reference types="cypress" />

const testTargetSelector = (targetId: string) => `[data-test-target=${targetId}]`

describe("Testing if a form can be properly edited", () => {
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
        cy.fixture("formEditData.json").then(data => this.editData = data)
    })

    it("Loads properly and displays the created from", () => {
        /* 
            Ao revisar o form criado anteriormente, Alice percebe que cometeu um erro ao nomear um dos campos
            e precisar, então, editar seu formulário. Para isso ela acessa novamente o sistema Form
        */
        cy.visit('/')
        // Ao acessar o sistema ela percebe que seu form aparece na lista de forms criados
        cy.title().should("contain", "Form")
        cy.get('h1').should("contain.text", "Forms")
        cy.getTestTarget("form-list").children().should("have.length", 1)
        cy.getTestTarget("form-list").find(testTargetSelector("FL-item-info")).children().first().should("contain.text", this.formName)
        cy.getTestTarget("form-list").find(testTargetSelector("FL-item-info")).children().last().should("contain.text", this.formDesc)
        // Ela, então, clica no botão de editar o formulário e é redirecionada para a página de edição de forms (que é única para seu form)
        cy.getTestTarget("form-list").first().find(testTargetSelector("FLI-action-buttons")).children().first().click()
        cy.url().should("contain", `/edit/${this.formId}`)
        // Ela percebe que os campos de nome e descrição do form estão como ela havia deixado
        cy.getTestTarget("form-title").should("contain.text", this.formName)
        cy.getTestTarget("form-description").should("contain.text", this.formDesc)
        // Ela também verifica que os campos estão como ela havia deixado (com nomes, descrições e tipos corretos)
        // Ela também verifica que o número de entradas, seus tipos, nomes e descrições estão corretos
        cy.getTestTarget("builder-fields").find('input:not([type]), input[type="text"]').should("have.length", 1) // Um input de texto
        cy.getTestTarget("builder-fields").find('input[type="radio"]').should("have.length", 4) // 4 botões radio
        cy.getTestTarget("builder-fields").find('input[type="checkbox"]').should("have.length", 7) // 7 checkboxes
        cy.getTestTarget("builder-fields").find('textarea').should("have.length", 1) // Um textarea
            // Verificando os labels
        cy.getTestTarget("builder-fields").find(testTargetSelector("builder-field-label")).should("have.length", this.formFields.length)
        cy.getTestTarget("builder-fields").find(testTargetSelector("builder-field-label"))    
            .each((label, index) => cy.wrap(label).should("contain.text", this.formFields[index].label))
            // Verificando as descrições
        cy.getTestTarget("builder-fields").find(testTargetSelector("BF-desc-container")).should("have.length", 4)
        cy.getTestTarget("builder-fields").find(testTargetSelector("BF-desc-container")).each((descContainer, index) => {
            if(index === 0 || index === 3)
                cy.wrap(descContainer).should("contain.text", this.formFields[index].description)
            else
                cy.wrap(descContainer).should("not.contain.text")
        })
    })

    it("Can edit a field", () => {
        // Ela então clica no botão de editar do nome do campo que ela deseja editar
        cy.getTestTarget("builder-fields").children().eq(this.editData.editIndex).as('edit-field')
        cy.get('@edit-field').find(testTargetSelector("builder-field-actions")).should("have.length", 1)
        cy.get('@edit-field').find(testTargetSelector("builder-field-actions")).children().should("have.length", 5)
        cy.get('@edit-field').find(testTargetSelector("builder-field-actions")).children().first().click()
        // Ela percebe que um input de texto foi aberto para que ela mude o nome do componente
        cy.get('@edit-field').find(`${testTargetSelector("BF-label-container")} > input`).should("have.length", 1)
        // Ela, então, insere o nome correto do componente
        cy.get('@edit-field').find(`${testTargetSelector("BF-label-container")} > input`)
            .type(`{selectall}{del}${this.editData.newEditFieldName}`)
        cy.get('@edit-field').find(`${testTargetSelector("BF-label-container")} > ${testTargetSelector('builder-field-actions')}`)
            .children(testTargetSelector("action-button")).first().click()
        // Ela verifica que a alteração foi aplicada corretamente
        cy.get('@edit-field').find(testTargetSelector('builder-field-label')).should('have.length', 1)
            .and('contain.text', this.editData.newEditFieldName)
    })

    it("Can create a new field", () => {
        /*
            Alicie, então, sente que é necessário perguntar qual SO a pessoa usa caso ela tenha respondido "outro" 
            nas opções anteriores. Para isso, ela decide adicionar um novo campo de texto que solicita essa informação.
            Sendo assim, ela clica no botão "adicionar campo" e escolhe o tipo texto
        */
        cy.getTestTarget("form-input-add").click()
        cy.getTestTarget("form-input-types").should("have.length", 1).and("contain.text", "Selecione um tipo de input")
        cy.getTestTarget("form-input-types").children().should("have.length", 5)
        cy.getTestTarget("form-input-types").select(1)
        // Ela verifica, então, que um novo campo foi adicionado
        cy.getTestTarget("builder-fields").children().should("have.length", 5)
        cy.getTestTarget("builder-fields").children().last().as('added-field')
        // Ela verifica que o campo adicionando possui nome padrão "Insira o nome do campo" e tipo texto
        cy.get('@added-field').find("input").should("not.have.a.property", "type")
        cy.get('@added-field').find(testTargetSelector("builder-field-label"))
            .should("contain.text", "Insira o nome do campo")
        // Ela, então, renomeia o novo campo
        cy.get('@added-field').find(testTargetSelector("action-button")).first().click()
        cy.get('@added-field').find(testTargetSelector("BF-label-container") + " input").should("have.length", 1)
        cy.get('@added-field').find(testTargetSelector("BF-label-container") + " input").type(`{selectall}{del}${this.editData.newField.name}`)
        cy.get('@added-field').find(testTargetSelector("action-button")).first().click()
        /*
            A seguir, ela decide adicionar uma descrição ao novo campo, clicando no botão para adicionar uma descrição
            e verificando que aparece um novo campo de descrição com um texto padrão
        */
        cy.get('@added-field').find(testTargetSelector("BF-desc-container")).children().should("have.length", 0)
        cy.get('@added-field').find(testTargetSelector("builder-field-actions")).children(testTargetSelector("action-button")).eq(3).click()
        cy.get('@added-field').find(testTargetSelector("BF-desc-container")).children().should("have.length", 1).and("contain.text", "Insira uma descrição")
        cy.get('@added-field').find(testTargetSelector("BF-desc-container")).parent().children().first().should("contain.text", this.editData.newField.name)
        // Ela clica no botão para editar descrição e adiciona a descrição desejada
        cy.get('@added-field').find(testTargetSelector("BF-desc-container")).find(testTargetSelector("action-button")).click()
        cy.get('@added-field').find(testTargetSelector("BF-desc-container")).find("textarea").should("have.length", 1)
        cy.get('@added-field').find(testTargetSelector("BF-desc-container")).find("textarea").type(`{selectall}{del}${this.editData.newField.description}`)
        cy.get('@added-field').find(testTargetSelector("BF-desc-container")).find(testTargetSelector("action-button")).click()
        // Ela verifica que a descrição aparece corretamente
        cy.get('@added-field').find(testTargetSelector("BF-desc-container")).children().should("contain.text", this.editData.newField.description)
    })

    it("Can move a field", () => {
        /* 
            Alicie conclui que o novo campo deve vir antes do campo de comentários e, então, decide movê-lo clicando no 
            botão "mover para cima" no campo adicionado
        */
        cy.getTestTarget("builder-fields").children().last().as('added-field')
        cy.get('@added-field').find(testTargetSelector('builder-field-actions')).children().eq(1).click()
        // Ela então verifica que a ordem dos campos mudou, mas os tipos dos campos foram preservados
        cy.getTestTarget("builder-fields").find('input:not([type]), input[type="text"]').should("have.length", 2) // Dois inputs de texto
        cy.getTestTarget("builder-fields").find('input[type="radio"]').should("have.length", 4) // 4 botões radio
        cy.getTestTarget("builder-fields").find('input[type="checkbox"]').should("have.length", 7) // 7 checkboxes
        cy.getTestTarget("builder-fields").find('textarea').should("have.length", 1) // Um textarea
        // Em seguida, ela verifica que os campos estão na nova ordem
            // Verificando os labels
        let newFormFields = this.formFields.slice()
        newFormFields[this.editData.editIndex].label = this.editData.newEditFieldName
        newFormFields.splice(3, 0, { label: this.editData.newField.name, ...this.editData.newField })
        cy.getTestTarget("builder-fields").find(testTargetSelector("builder-field-label"))
            .should("have.length", this.formFields.length + 1)
        cy.getTestTarget("builder-fields").find(testTargetSelector("builder-field-label"))    
            .each((label, index) => cy.wrap(label).should("contain.text", newFormFields[index].label))
            // Verificando as descrições
        cy.getTestTarget("builder-fields").find(testTargetSelector("BF-desc-container")).should("have.length", 5)
        cy.getTestTarget("builder-fields").find(testTargetSelector("BF-desc-container")).each((descContainer, index) => {
            if(index === 0 || index === 3 || index == 4)
                cy.wrap(descContainer).should("contain.text", newFormFields[index].description)
            else
                cy.wrap(descContainer).should("not.contain.text")
        })
    })

    it("Can erase a field", () => {
        /* 
            Após refletir um pouco, Alice conclui que a informação de idade não é necessária para seu estudo.
            Ela, então, remove esse campo clicando no botão de deletar campo
        */
        cy.getTestTarget('builder-fields').children().eq(this.editData.deleteIndex).as('deleted-position')
        cy.get('@deleted-position').find(testTargetSelector('builder-field-actions')).children().last().click()
        // Ela verifica que o campo foi realmente removido e o campo seguinte tomou seu lugar na ordem dos campos
        cy.get('@deleted-position').find(testTargetSelector("builder-field-label"))
            .should('contain.text', this.formFields[this.editData.deleteIndex + 1]?.label || '')
        cy.get('@deleted-position').find(testTargetSelector("BF-desc-container"))
            .should('contain.text', this.formFields[this.editData.deleteIndex + 1]?.description || '')
    })

    it("Can save the changes made", () => {
        // Satisfeita com as mudanças que fez, Alice decide salvá-las clicando no botão "salvar"
        cy.getTestTarget("builder-save").click()
        // Ela é, então, redirecionada de volta para a página principal (de listagem de forms)
        cy.url().should("not.contain", `/edit/${this.formId}`)
        // Ela verifica que seu form ainda aparece com nome e descrição corretos
        cy.get('h1').should("contain.text", "Forms")
        cy.getTestTarget("form-list").children().should("have.length", 1)
        cy.getTestTarget("form-list").find(testTargetSelector("FL-item-info")).children().first().should("contain.text", this.formName)
        cy.getTestTarget("form-list").find(testTargetSelector("FL-item-info")).children().last().should("contain.text", this.formDesc)
        /* 
            Na página principal, ela decide clicar no botão de visualizar forms para verificar se as alterações foram,
            de fato, salvas. Para isso ela clica no botão de visualizar o form e é redirecionada para a página de visualização
            única de seu form
        */
        cy.getTestTarget("form-list").first().find(testTargetSelector("FLI-action-buttons")).children().eq(2).click()
        cy.url().should("contain", `/view/${this.formId}`)
        // Na página de visualização, ela confere que o nome e descrição do form conferem com os nomes dados por ela
        cy.get('h1').should("have.length", 1).and("contain.text", this.formName)
        cy.getTestTarget("viewer-form-description").should("contain.text", this.formDesc)
        // Ela também verifica que o número de entradas, seus tipos, nomes e descrições estão corretos
        cy.getTestTarget("viewer-form").find('input:not([type]), input[type="text"]').should("have.length", 1) // Um input de texto
        cy.getTestTarget("viewer-form").find('input[type="radio"]').should("have.length", 4) // 4 botões radio
        cy.getTestTarget("viewer-form").find('input[type="checkbox"]').should("have.length", 7) // 7 checkboxes
        cy.getTestTarget("viewer-form").find('textarea').should("have.length", 1) // Um textarea
            // Atualizando informações dos campos conforme as modificações realizadas
        const newFormFields = this.formFields.slice()
        newFormFields[this.editData.editIndex].label = this.editData.newEditFieldName // Alterando o nome do campo renomeado
        newFormFields.splice(3, 0, { label: this.editData.newField.name, ...this.editData.newField }) // Adicionando novo campo
        newFormFields.splice(this.editData.deleteIndex, 1) // Removendo campo deletado
            // Verificando os labels
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-label")).should("have.length", newFormFields.length)
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-label"))    
            .each((label, index) => cy.wrap(label).should("contain.text", newFormFields[index].label))
            // Verificando as descrições
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-description")).should("have.length", 2)
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-description")).eq(0)
            .should("contain.text", newFormFields[2].description)
        cy.getTestTarget("viewer-form").find(testTargetSelector("VF-item-description")).eq(1)
            .should("contain.text", newFormFields[3].description)
        // Satisfeita, ela vai dormir
    })

    after(() => {
        // Limpeza, removendo o form criado para testes
        cy.request("DELETE", `${this.serverBaseUrl}/forms/${this.formId}`).then((response) => {
            cy.wrap(response.status).should("eq", 204)
        })
    })
})