describe('Movies Page', () => {
    it('loads the movie list', () => {
        cy.visit('/');
        cy.contains('No movies available').should('not.exist');
    });

    it('updates movies when clicking the update button', () => {
        cy.get('.update-button').click();
        cy.contains('Saved movie:').should('exist');
    });
});
