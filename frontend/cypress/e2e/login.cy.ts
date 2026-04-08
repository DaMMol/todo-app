describe('Login Page', () => {
  it('renders the login page', () => {
    cy.visit('/login');
    cy.contains('Login').should('exist');
  });

  it('navigates to homepage', () => {
    cy.visit('/login');
    cy.contains('Home').click();
    cy.url().should('include', '/');
  });

  it('navigates to register page when clicking Register', () => {
    cy.visit('/login');
    cy.contains('Register').click();
    cy.url().should('include', '/register');
  });
});
