import "cypress-plugin-pubsub";

describe("Adding contact and approving contact", () => {
  before(() => {
    cy.request("http://localhost:3000/api/testing/del");
  });
  beforeEach(() => {
    cy.visit("/");
  });
  context("user add contact", () => {
    beforeEach(() => {
      cy.login();
    });
    it("there are no contacts", () => {
      cy.get("[cy-data=contact]").should("not.exist");
    });

    it("should find a user and add a user", () => {
      cy.get("[cy-data=searchcontact-input]").type("David");
      cy.get("[cy-data=searchcontact-result").should(
        "contain",
        "David Křístek"
      );
      cy.get("[cy-data=plus-button]").click();
      cy.get("[cy-data=contact]").should("contain", "David Křístek");
    });
    it("should approve chat", () => {
      cy.get("[cy-data=contact]").click();
      cy.get("[cy-data=message-input]").should("be.disabled");
    });
  });
  context("second user approves contact", () => {
    beforeEach(() => {
      cy.login_s();
    });
    it("chat enable chat", () => {
      cy.get("[cy-data=message-input]").should("be.disabled");
      cy.contains("Povolit").click();
      cy.get("[cy-data=message-input]").should("be.enabled");
    });
  });
  context("first user", () => {
    it("first user should have enabled chat", () => {
      cy.visit("/");
      cy.login();
      cy.get("[cy-data=message-input]").should("be.enabled");
    });
  });
});
