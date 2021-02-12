import Chance from "chance";
const chance = new Chance();

const email = chance.email();
const emailNonExisting = chance.email();
const passwordInvalid = "invalidpassword";
const passwordValid = "P4$$w0Rd";
const firstName = chance.first();
const lastName = chance.last();

describe("Register user view test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("renders form", () => {
    // Then
    cy.contains("Log In");
    cy.contains("E-mail");
    cy.get("#email").should("be.visible").click();
    cy.contains("Password");
    cy.get("#password").should("be.visible").click();
  });

  it("successfully registers user with valid credentials", () => {
    // Given
    cy.get("#email").type(email);
    cy.get("#password").type(passwordValid);
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);

    // When
    cy.get("button[type=submit]").click();

    // Then
    cy.url().should("include", "/login");
  });

  it("unsuccessfully registers user with invalid credentials => already existing email", () => {
    // Given
    cy.get("#email").type(email);
    cy.get("#password").type(passwordValid);
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);

    // When
    cy.get("button[type=submit]").click();

    // Then
    cy.contains("User with provided email already exists!");
    cy.url().should("include", "/register");
  });

  describe("inputs", () => {
    it("empty fields validation", () => {
      // When
      cy.get("button[type=submit]").click();
      cy.contains("First name is required");
      cy.contains("Last name is required");
      cy.contains("Password is required");
      cy.contains("E-mail is required");

      // Then
      cy.url().should("include", "/register");
    });

    it("invalid email validation", () => {
      // When
      cy.get("#email").type("invalid_email");
      cy.get("button[type=submit]").click();

      // Then
      cy.contains("E-mail is invalid");
      cy.url().should("include", "/register");
    });

    it("too short First Name, Last Name and Password validation", () => {
      // When
      cy.get("#password").type("four");
      cy.get("#firstName").type("A");
      cy.get("#lastName").type("B");
      cy.get("button[type=submit]").click();

      // Then
      cy.contains("Minimum 2 characters");
      cy.contains("Minimum 8 characters");
      cy.url().should("include", "/register");
    });

    it("password does not match security policies standard validation", () => {
      // When
      cy.get("#password").type("eight_chars");
      cy.get("button[type=submit]").click();

      // Then
      cy.contains("Password does not meet the provided criteria");
      cy.url().should("include", "/register");
    });

    it("turn off danger state after entering correct credentials after form submit", () => {
      // Given
      cy.get("button[type=submit]").click();

      // When
      cy.get("#email").type(email);
      cy.get("#password").type(passwordValid);
      cy.get("#firstName").type(firstName);
      cy.get("#lastName").type(lastName);

      // Then
      cy.contains("First name is required").should("not.exist");
      cy.contains("Last name is required").should("not.exist");
      cy.contains("Password is required").should("not.exist");
      cy.contains("E-mail is required").should("not.exist");
    });
  });
});

describe("Login user view test ", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit("http://localhost:3000/login");
  });

  it("has login form", () => {
    // Then
    cy.contains("Log In");
    cy.contains("E-mail");
    cy.get("#email").should("be.visible").click();
    cy.contains("Password");
    cy.get("#password").should("be.visible").click();
    cy.contains("Forgot your password?");
  });

  it("logs in existing user with valid credentials", () => {
    // When
    cy.get("#email").type(email);
    cy.get("#password").type(passwordValid);
    cy.get("button[type=submit]").click();
    cy.wait(1500);

    // Then
    cy.url().should("include", "/");
    cy.getCookie("access_token").should("exist");
  });

  it("does not log in existing user with invalid credentials", () => {
    // When
    cy.get("#email").type(email);
    cy.get("#password").type(passwordInvalid);
    cy.get("button[type=submit]").click();

    // Then
    cy.contains("Invalid credentials");
    cy.url().should("include", "/login");
    cy.getCookie("access_token").should("not.exist");
  });

  it("does not log in non-existing user", () => {
    // When
    cy.get("#email").type(emailNonExisting);
    cy.get("#password").type(passwordInvalid);
    cy.get("button[type=submit]").click();

    // Then
    cy.contains("Invalid credentials");
    cy.url().should("include", "/login");
    cy.getCookie("access_token").should("not.exist");
  });

  describe("inputs", () => {
    it("empty fields validation", () => {
      // When
      cy.get("button[type=submit]").click();
      cy.contains("Password is required");
      cy.contains("E-mail is required");

      // Then
      cy.url().should("include", "/login");
    });

    it("invalid email validation", () => {
      // When
      cy.get("#email").type("invalid_email");
      cy.get("button[type=submit]").click();

      // Then
      cy.contains("E-mail is invalid");
      cy.url().should("include", "/login");
    });

    it("turn off danger state after entering correct credentials after form submit", () => {
      // Given
      cy.get("button[type=submit]").click();

      // When
      cy.get("#email").type(email);
      cy.get("#password").type(passwordValid);

      // Then
      cy.contains("Password is required").should("not.exist");
      cy.contains("E-mail is required").should("not.exist");
    });
  });
});
