describe("sending messages", () => {
  before(() => {
    cy.request("http://localhost:3000/api/testing/del1");
  })
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });
  it("should send and receive message", () => {
    cy.get("[cy-data=message-input]").type("Ahoj jak je? 😎").type("{enter}");
    
    cy.get("[cy-data=message]").should("contain", "Ahoj jak je? 😎");
    cy.get("[cy-data=contact]").should("contain", "Já: Ahoj jak je? 😎")
    // try pubsub cy.public message
  });
  it("should receive a message from another user", () => {
    cy.url().then(($url) => {
      cy.log($url)
      const chatId = $url.split("/")[4]; 
      cy.publish()
      cy.publish("user:newMessage", "62487fb5a68be9d1aba3ea19", {
        body:  {
          text: "Ahoj",
        },
        sendFrom: "6244368013951a297f440b6e",
        chat: chatId, 
        createdAt: new Date()
      })
    })
  })
});
