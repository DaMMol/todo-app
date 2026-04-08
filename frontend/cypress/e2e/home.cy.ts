describe('Home Page', () => {
  it('renders the homepage', () => {
    cy.visit('/');
    cy.contains('Todos').should('exist');
  });

  it('navigates to Login page', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });
});
