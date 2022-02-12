/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getTestTarget(targetId: string): Chainable<Element>
    testTargetSelector(targetId: string): string
  }
}