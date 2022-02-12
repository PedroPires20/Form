
Cypress.Commands.add('getTestTarget', (targetId) => cy.get(`[data-test-target=${targetId}]`))
