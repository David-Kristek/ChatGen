Cypress.Commands.add("login", () => {
	cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");

	// Set the cookie for cypress.
	// It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
	// This step can probably/hopefully be improved.
	// We are currently unsure about this part.
	// We need to refresh this cookie once in a while.
	// We are unsure if this is true and if true, when it needs to be refreshed.
	cy.setCookie("next-auth.session-token", "82f49b7062925f4d5f7ff388cba3057e80e39b70700f0b5878f0ed2c9a8367de");
	Cypress.Cookies.preserveOnce("next-auth.session-token");
});
Cypress.Commands.add("login_s", () => {
	cy.intercept("/api/auth/session", { fixture: "session2.json" }).as("session");

	// Set the cookie for cypress.
	// It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
	// This step can probably/hopefully be improved.
	// We are currently unsure about this part.
	// We need to refresh this cookie once in a while.
	// We are unsure if this is true and if true, when it needs to be refreshed.
	cy.setCookie("next-auth.session-token", "6a59c2114c554403823560bbb2776d13928c6e76ad09ddc5afb15acfb795efec");
	Cypress.Cookies.preserveOnce("next-auth.session-token");
});