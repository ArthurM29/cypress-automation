
beforeEach(() => {
    cy.visit('/');
    cy.contains('Shop men').click();
})

it.skip('should filter the products by price', () => {
    /*
    This is the recommended way of triggering range slider, it changes the slider position, but doesn't update the values,
    cypress test fails with an error:
     */
    cy.get('input.min').invoke('val', 400).trigger('change', {force: true});
    cy.get('input.max').invoke('val', 600);
    // TODO make it work
});

it('should filter the products correctly by size', () => {
    // waiting for the BE call to finish - to make sure search processing is completed
    cy.intercept('GET', 'https://demo.evershop.io/men*').as('filterCall');
    cy.filterProductsBySize(['L']);
    cy.wait('@filterCall');

    cy.getSearchResults().then(results => {
        const expectedProducts = ['Nike air zoom pegasus 35', 'Nizza trefoil shoes', 'Strutter shoes'];
        const foundProducts = results.map(product => product.name);
        cy.log('Expected products:', JSON.stringify(expectedProducts));
        cy.log('Found products:', JSON.stringify(foundProducts));

        expect(foundProducts).to.have.deep.members(expectedProducts);
    })
})



