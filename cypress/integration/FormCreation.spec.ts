/// <reference types="cypress" />

const testTargetSelector = (targetId: String) => `[data-test-target=${targetId}]`

describe("Testing if a form can be created", () => {
    before(() => {
        cy.fixture("formCreateData.json").then((data) => this.data = data)
    })

    it("Home loads properly", () => {
        // Alice decide acessar o novo app Form
        cy.visit("/")
        // Ela repara que o título da página contém o nome da aplicação
        cy.title().should("contain", "Form")
        // Ela vê uma lista de formulários criados vazia de nome "Forms" e com uma mensagem indicando como criar um novo form
        cy.get("h1").should("have.length", 1).and("contain.text", "Forms")
        cy.getTestTarget("empty-form-message").should("contain", "Clique no menu ao lado para criar um form!")
    })

    it("Can access the builder and edit the new form's title and description", () => {
        // Alice, então, decide criar um novo form acessando o menu lateral
        cy.getTestTarget("nav-button").click()
        // No menu lateral ela se depara com duas opções "Forms" (a página atual) e "Criar form"
        cy.getTestTarget("nav-container").children()
            .should('have.length', 2).and('contain', "Forms").and('contain', "Criar Form")
        // Ela acessa o link "Criar form" e é redirecionada para a página de criação do form ("/create")
        cy.getTestTarget("nav-container").children().last().click()
        cy.url().should("contain", "/create")
        // Alice verifica que o form criado possui um título e descrição padrões
        cy.getTestTarget("form-title").should("contain.text", "Insira o título do form")
        cy.getTestTarget("form-description").should("contain.text", "Insira a descrição do form")
        // Ela clica no botão de editar do título e verifica que aprece um input de texto
        cy.get(`${testTargetSelector("form-title")} ${testTargetSelector("action-button")}`).click()
        cy.getTestTarget("form-title").find("input").should("have.length", 1)
        /* Ela então digita o título desejado, apagando o anterior e pressiona o botão novamente para salvá-lo, 
        verificando que ele passa a ser o título do form */
        cy.get(`${testTargetSelector("form-title")} input`).type(`{selectall}{del}${this.data.formTitle}`)
        cy.get(`${testTargetSelector("form-title")} ${testTargetSelector("action-button")}`).click()
        cy.getTestTarget("form-title").should("contain.text", this.data.formTitle)
        // Alicie, então repete os passos anteriores para mudar a descrição do form
        cy.get(`${testTargetSelector("form-description")} ${testTargetSelector("action-button")}`).click()
        cy.getTestTarget("form-description").find("textarea").should("have.length", 1)
        cy.get(`${testTargetSelector("form-description")} textarea`).type(`{selectall}{del}${this.data.formDescription}`)
        cy.get(`${testTargetSelector("form-description")} ${testTargetSelector("action-button")}`).click()
        cy.getTestTarget("form-description").should("contain.text", this.data.formDescription)
    })

    it("Can add a text input", () => {
        // Alicie verifica que não existe nenhum campo no formulário
        cy.getTestTarget("builder-fields").children().should("have.length", 0)
        /* 
            Alice precisa coletar a idade de quem responde, para isso ela adiciona um input de texto, clicando
            em "Adicionar campo". Ao clicar no botão ela vê uma lista com os tipos de input disponíveis
        */
        cy.getTestTarget("form-input-add").click()
        cy.getTestTarget("form-input-types").should("have.length", 1).and("contain.text", "Selecione um tipo de input")
        cy.getTestTarget("form-input-types").children().should("have.length", 5)
        cy.getTestTarget("form-input-types").children("option")
            .each((option, index) => cy.wrap(option).should("contain", this.data.availableInputTypes[index]))
        // Ela, então, seleciona o tipo texto e verifica que apareceu um campo de edição na lista de inputs
        cy.getTestTarget("form-input-types").select(1)
        cy.getTestTarget("builder-fields").children().should("have.length", 1)
        // Ela verifica que o campo adicionando possui nome padrão "Insira o nome do campo" e tipo texto
        cy.getTestTarget("builder-fields").children().first().find("input").should("not.have.a.property", "type")
        cy.getTestTarget("builder-fields").children().first().find(testTargetSelector("builder-field-label"))
            .should("contain.text", "Insira o nome do campo")
        // Ela, então, clica no botão de editar o form e verifica que aparece um input de texto para renomear o campo
        cy.getTestTarget("builder-field-actions").children(testTargetSelector("action-button")).first().click()
        cy.getTestTarget("BF-label-container").find("input").should("have.length", 1)
        // Ela, então, renomeia o campo, verificando que as alterações são aplicadas
        cy.getTestTarget("BF-label-container").find("input").type(`{selectall}{del}${this.data.fields[0].name}`)
        cy.getTestTarget("builder-field-actions").children(testTargetSelector("action-button")).first().click()
        /* 
            Alice, então, decide adicionar uma descrição ao campo de idade para informar sobre a 
            confidencialidade dos dados. Para isso ela clica no botão de adicionar descrição e nota que 
            um campo de descrição é adicionado abaixo do nome com um valor padrão
        */
        cy.getTestTarget("BF-desc-container").children().should("have.length", 0)
        cy.getTestTarget("builder-field-actions").children(testTargetSelector("action-button")).eq(3).click()
        cy.getTestTarget("BF-desc-container").children().should("have.length", 1).and("contain.text", "Insira uma descrição")
        cy.getTestTarget("BF-desc-container").parent().children().first().should("contain.text", this.data.fields[0].name)
        // Ela clica no botão para editar descrição e adiciona a descrição desejada
        cy.getTestTarget("BF-desc-container").find(testTargetSelector("action-button")).click()
        cy.getTestTarget("BF-desc-container").find("textarea").should("have.length", 1)
        cy.getTestTarget("BF-desc-container").find("textarea").type(`{selectall}{del}${this.data.fields[0].description}`)
        cy.getTestTarget("BF-desc-container").find(testTargetSelector("action-button")).click()
        // Ela verifica que a descrição aparece corretamente
        cy.getTestTarget("BF-desc-container").children().should("contain.text", this.data.fields[0].description)
    }) 

    it("Can add a radio input", () => {
        // Alice então adiciona um campo tipo radio para perguntar o SO favorito do usuário
        cy.getTestTarget("form-input-add").click()
        cy.getTestTarget("form-input-types").select(4)
        // Ela verifica que um novo campo foi adicionado com um nome padrão e sem descrição
        cy.getTestTarget("builder-fields").children().should("have.length", 2)
        cy.getTestTarget("builder-fields").children().last().as('current-field')
        cy.get('@current-field').find(testTargetSelector("BF-options")).children().should("have.length", 1) // Apenas o botão de adicionar opção
        cy.get('@current-field').find(testTargetSelector("BF-options-add")).should("contain.text", "+ opção")
        cy.get('@current-field').find(testTargetSelector("builder-field-label")).should("contain.text", "Insira o nome do campo")
        // Ela, então, renomeia o novo campo
        cy.get('@current-field').find(testTargetSelector("action-button")).first().click()
        cy.get('@current-field').find(testTargetSelector("BF-label-container") + " input").should("have.length", 1)
        cy.get('@current-field').find(testTargetSelector("BF-label-container") + " input").type(`{selectall}{del}${this.data.fields[1].name}`)
        cy.get('@current-field').find(testTargetSelector("action-button")).first().click()
        // Agora ela cria quatro opções clicando 4 vezes em "+ opção"
        Cypress._.times(4, () => cy.get('@current-field').find(testTargetSelector("BF-options-add")).click())
        cy.get('@current-field').find(testTargetSelector("BF-options")).children().should("have.length", 5)
        // Ela, então, nomeia as 4 opções de forma apropriada
        cy.get('@current-field').find(`${testTargetSelector("BF-options")} > ${testTargetSelector("BF-option-edit")}`)
        .each((option, index) => {
            cy.wrap(option).find(testTargetSelector("BF-option-actions")).children().first().click()
            cy.wrap(option).find('input:not([type="radio"])').type(`{selectall}{del}${this.data.fields[1].options[index]}`)
            cy.wrap(option).find(testTargetSelector("BF-option-actions")).children().first().click()
        })
        cy.get('@current-field').find(`${testTargetSelector("BF-options")} > :not(${testTargetSelector("BF-options-add")})`)
            .each((option, index) => cy.wrap(option).should('contain.text', this.data.fields[1].options[index]))
        // Ela, então, decide mudar a ordem das opções, movendo a quarta para o topo e a primeira para a penúltima posição
        cy.get('@current-field').find(`${testTargetSelector("BF-options")} > ${testTargetSelector("BF-option-edit")}`).eq(2)
            .find(testTargetSelector("BF-option-actions")).children().eq(1).click()
        cy.get('@current-field').find(`${testTargetSelector("BF-options")} > ${testTargetSelector("BF-option-edit")}`).eq(1)
                .find(testTargetSelector("BF-option-actions")).children().eq(1).click()
        cy.get('@current-field').find(`${testTargetSelector("BF-options")} > ${testTargetSelector("BF-option-edit")}`).eq(1)
                .find(testTargetSelector("BF-option-actions")).children().eq(2).click()
        // Ela verifica que as opções agora aparecem na ordem correta
        cy.get('@current-field').find(`${testTargetSelector("BF-options")} > :not(${testTargetSelector("BF-options-add")})`)
            .each((option, index) => cy.wrap(option).should('contain.text', this.data.fields[1].optionsReordered[index]))
    })

    it("Can add a checkbox input", () => {
        // Alice decide adicionar um novo campo do tipo checkbox para saber com quais SOs o usuário interage diretamente
        cy.getTestTarget("form-input-add").click()
        cy.getTestTarget("form-input-types").select(3)
        // Ela verifica que um novo campo foi adicionado com um nome padrão e sem descrição
        cy.getTestTarget("builder-fields").children().should("have.length", 3)
        cy.getTestTarget("builder-fields").children().last().as('current-field')
        cy.get('@current-field').find(testTargetSelector("BF-options")).children().should("have.length", 1) // Apenas o botão de adicionar opção
        cy.get('@current-field').find(testTargetSelector("BF-options-add")).should("contain.text", "+ opção")
        cy.get('@current-field').find(testTargetSelector("builder-field-label")).should("contain.text", "Insira o nome do campo")
        // Ela, então, renomeia o novo campo
        cy.get('@current-field').find(testTargetSelector("action-button")).first().click()
        cy.get('@current-field').find(testTargetSelector("BF-label-container") + " input").should("have.length", 1)
        cy.get('@current-field').find(testTargetSelector("BF-label-container") + " input").type(`{selectall}{del}${this.data.fields[2].name}`)
        cy.get('@current-field').find(testTargetSelector("action-button")).first().click()
        // Agora ela cria sete opções clicando 7 vezes em "+ opção"
        Cypress._.times(7, () => cy.get('@current-field').find(testTargetSelector("BF-options-add")).click())
        cy.get('@current-field').find(testTargetSelector("BF-options")).children().should("have.length", 8)
        // Ela, então, nomeia as 7 opções de forma apropriada
        cy.get('@current-field').find(`${testTargetSelector("BF-options")} > ${testTargetSelector("BF-option-edit")}`)
        .each((option, index) => {
            cy.wrap(option).find(testTargetSelector("BF-option-actions")).children().first().click()
            cy.wrap(option).find('input:not([type="checkbox"])').type(`{selectall}{del}${this.data.fields[2].options[index]}`)
            cy.wrap(option).find(testTargetSelector("BF-option-actions")).children().first().click()
        })
        // Ela verifica que as opções aparecem com o nome correto
        cy.get('@current-field').find(`${testTargetSelector("BF-options")} > :not(${testTargetSelector("BF-options-add")})`)
            .each((option, index) => cy.wrap(option).should('contain.text', this.data.fields[2].options[index]))
    })

    it("Can add a textarea input", () => {
        /*
            Para finalizar o formulário, Alice decide criar um campo tipo textarea para perguntar, de forma livre,
            qual a experiência geral das pessoas com os sistemas operacionais que ela usa
        */
        cy.getTestTarget("form-input-add").click()
        cy.getTestTarget("form-input-types").should("have.length", 1).and("contain.text", "Selecione um tipo de input")
        // Ela, então, seleciona o tipo  e verifica que apareceu um campo de edição na lista de inputs
        cy.getTestTarget("form-input-types").select(2)
        cy.getTestTarget("builder-fields").children().should("have.length", 4)
        // Ela verifica que o campo adicionando possui nome padrão "Insira o nome do campo" e tipo texto
        cy.getTestTarget("builder-fields").children().last().as('current-field')
        cy.get('@current-field').find("textarea").should("have.length", 1)
        cy.get('@current-field').find(testTargetSelector("builder-field-label")).should("contain.text", "Insira o nome do campo")
        // Ela, então, clica no botão de editar o form e verifica que aparece um input de texto para renomear o campo
        cy.getTestTarget("builder-field-actions").children(testTargetSelector("action-button")).first().click()
        cy.get('@current-field').find(`${testTargetSelector("BF-label-container")} > ${testTargetSelector('builder-field-actions')}`)
            .children(testTargetSelector("action-button")).first().click()
        cy.get('@current-field').find(`${testTargetSelector("BF-label-container")} > input`).should("have.length", 1)
        // Ela, então, renomeia o campo, verificando que as alterações são aplicadas
        cy.get('@current-field').find(`${testTargetSelector("BF-label-container")} > input`).type(`{selectall}{del}${this.data.fields[3].name}`)
        cy.get('@current-field').find(`${testTargetSelector("BF-label-container")} > ${testTargetSelector('builder-field-actions')}`)
            .children(testTargetSelector("action-button")).first().click()
        /* 
            Alice, então, decide adicionar uma descrição ao campo de idade para informar sobre a 
            confidencialidade dos dados. Para isso ela clica no botão de adicionar descrição e nota que 
            um campo de descrição é adicionado abaixo do nome com um valor padrão
        */
        cy.get('@current-field').find(testTargetSelector("BF-desc-container")).children().should("have.length", 0)
        cy.get('@current-field').find(testTargetSelector("builder-field-actions")).children(testTargetSelector("action-button")).eq(3).click()
        cy.get('@current-field').find(testTargetSelector("BF-desc-container")).children().should("have.length", 1).and("contain.text", "Insira uma descrição")
        cy.get('@current-field').find(testTargetSelector("BF-desc-container")).parent().children().first().should("contain.text", this.data.fields[3].name)
        // Ela clica no botão para editar descrição e adiciona a descrição desejada
        cy.get('@current-field').find(testTargetSelector("BF-desc-container")).find(testTargetSelector("action-button")).click()
        cy.get('@current-field').find(testTargetSelector("BF-desc-container")).find("textarea").should("have.length", 1)
        
        cy.get('@current-field').find(testTargetSelector("BF-desc-container")).find("textarea").type(`{selectall}{del}${this.data.fields[3].description}`)
        cy.get('@current-field').find(testTargetSelector("BF-desc-container")).find(testTargetSelector("action-button")).click()
        // Ela verifica que a descrição aparece corretamente
        cy.get('@current-field').find(testTargetSelector("BF-desc-container")).children().should("contain.text", this.data.fields[3].description)
    })

    it("Can save a form", () => {
        // Tendo completado seu formulário, Alice clica no botão de salvar no fim da página
        cy.getTestTarget("builder-save").click()
        // Ela é, então, redirecionada de volta para a página principal (de listagem de forms)
        cy.url().should("not.contain", "/create")
        // Ela repara que o form criado por ela aparece na listagem de forms e que a mensagem de ajuda para criar forms sumiu
        cy.get("h1").should("have.length", 1).and("contain.text", "Forms")
        cy.getTestTarget("empty-form-message").should("have.length", 0)
        cy.getTestTarget("form-list").children().should("have.length", 1)
        // Ela verifica que o nome e a descrição do from criado estão corretos
        cy.getTestTarget("form-list").children().find(testTargetSelector("FL-item-info")).as('current-form-info')
        cy.get('@current-form-info').first().should('contain.text', this.data.formTitle)
        cy.get('@current-form-info').last().should('contain.text', this.data.formDescription)
        // Satisfeita, ela vai dormir
    })

    after(() => {
        // Limpeza: apagando o form criado para garantir independência dos testes
        cy.getTestTarget("form-list").children().first().find(testTargetSelector("FLI-action-buttons")).children().eq(3).click()
    })
})
