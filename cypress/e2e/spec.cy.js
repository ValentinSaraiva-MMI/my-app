describe("User form flow", () => {
    beforeEach(() => {
      // Nettoyer le localStorage
      cy.clearLocalStorage();
      cy.visit("http://localhost:3000");
    });
  
    it("should complete the full user flow", () => {
     
      cy.contains(/Nombre d'utilisateurs :/);
  
      // Remplit les champs du forms
      cy.get('input#Lastname').type("Durand");
      cy.get('input#name').type("Marie");
      cy.get('input#email').type("marie.durand@example.com");
      cy.get('input#date').type("2000-01-01");
      cy.get('input#city').type("Paris").blur(); // blur pour déclencher la validation API
      cy.get('input#postalCode').type("75000");
  
      // Vérifie que le bouton est activé
      cy.get('input[type="submit"]').should("not.be.disabled");
  
      // Intercepte le POST vers /login et mocke la réponse
      cy.intercept("POST", "http://localhost:8000/login", {
        statusCode: 200,
        body: { success: true },
      }).as("submitForm");
  
      // Soumet le formulaire
      cy.get('input[type="submit"]').click();
  
      // Attendre la réponse API simulée
      cy.wait("@submitForm");
  
      // Vérifie que le toast s'affiche
      cy.contains("User added to database!").should("be.visible");
  
      // Vérifie que localStorage contient les données
      cy.window().then((win) => {
        const stored = JSON.parse(win.localStorage.getItem("formData"));
        expect(stored).to.be.an("array").and.have.length(1);
        expect(stored[0]).to.deep.equal({
          lastname: "Durand",
          firstname: "Marie",
          email: "marie.durand@example.com",
          birthDate: "2000-01-01",
          city: "Paris",
          postalCode: "75000",
        });
      });
    });
  });
  