// <reference types="Cypress" />

describe('ContentSidebar', () => {
    const helpers = {
        load({ features, fileId } = {}) {
            cy.visit('/Elements/ContentSidebar', {
                onBeforeLoad: contentWindow => {
                    contentWindow.FEATURES = features;
                    contentWindow.FILE_ID = fileId;
                },
            });
        },
    };

    describe('navigation buttons', () => {
        beforeEach(() => {
            helpers.load();
        });

        it('should toggle sidebar content when a user toggles a sidebar tab', () => {
            // Sidebar should be open by default
            cy.getByTestId('bcs-content').should('exist');
            cy.getByTestId('sidebarskills').should('have.class', 'bcs-is-selected');

            cy.getByTestId('sidebarskills').click();
            cy.getByTestId('bcs-content').should('not.exist');

            cy.getByTestId('sidebarskills').click();
            cy.getByTestId('bcs-content').should('exist');
        });

        it('should switch the sidebar panel when a user navigates between tabs', () => {
            // Sidebar should be open by default
            cy.getByTestId('bcs-content').should('exist');
            cy.getByTestId('sidebarskills').should('have.class', 'bcs-is-selected');

            cy.getByTestId('sidebaractivity').click();
            cy.getByTestId('sidebaractivity').should('have.class', 'bcs-is-selected');

            cy.getByTestId('sidebarskills').should('not.have.class', 'bcs-is-selected');
        });
    });

    describe('version history', () => {
        beforeEach(() => {
            helpers.load({
                features: { versions: true },
                fileId: Cypress.env('FILE_ID_DOC'),
            });
        });

        it('should show and hide when a user navigates to and from it', () => {
            cy.getByTestId('sidebardetails').click();
            cy.getByTestId('versionhistory').click();
            cy.contains('[data-testid="bcs-content"]', 'Version History').as('versionHistory');

            cy.getByTestId('versions-item-button').within($versionsItem => {
                cy.wrap($versionsItem)
                    .contains('V2')
                    .click();
                cy.wrap($versionsItem).should('have.class', 'bcs-is-selected');
            });

            cy.get('@versionHistory')
                .contains('Back')
                .click();
            cy.get('@versionHistory').should('not.exist');
        });
    });
});
