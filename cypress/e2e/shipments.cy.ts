beforeEach(() => {
  cy.viewport('iphone-6')

  cy.intercept(
    'GET',
    'https://jetvapi.test.jetstreamafrica.com/admin-api/v1/shipments?*',
    (req) => {
      req.reply({
        fixture: 'shipments.json'
      })
    }
  ).as('getShipments')

  cy.intercept(
    'GET',
    'https://jetvapi.test.jetstreamafrica.com/admin-api/v1/shipments/*',
    (req) => {
      req.reply({
        fixture: 'shipmentDetails.json'
      })
    }
  ).as('getDetails')

  cy.intercept(
    'GET',
    'https://jetvapi.test.jetstreamafrica.com/admin-api/v1/shipments/*/bills',
    (req) => {
      req.reply({
        fixture: 'shipmentBills.json'
      })
    }
  ).as('getBills')

  cy.intercept(
    'GET',
    'https://jetvapi.test.jetstreamafrica.com/api/v1/cargo-types',
    (req) => {
      req.reply({
        fixture: 'cargoTypes.json'
      })
    }
  ).as('getTypes')

  cy.intercept(
    'GET',
    'https://jetvapi.test.jetstreamafrica.com/api/v1/weight-units',
    (req) => {
      req.reply({
        fixture: 'shipmentBills.json'
      })
    }
  ).as('getUnits')

  cy.intercept(
    'POST',
    'https://jetvapi.test.jetstreamafrica.com/admin-api/v1/cargos',
    (req) => {
      req.reply({
        fixture: 'confirmCargo.json'
      })
    }
  ).as('confirmCargo')

  cy.intercept(
    'GET',
    'https://jetvapi.test.jetstreamafrica.com/admin-api/v1/vendors?*',
    (req) => {
      req.reply({
        fixture: 'vendors.json'
      })
    }
  ).as('getVendors')

  cy.intercept(
    'GET',
    ' https://jetvapi.test.jetstreamafrica.com/api/v1/supported-currencies?*',
    (req) => {
      req.reply({
        fixture: 'supportedCurrencies.json'
      })
    }
  ).as('getVendors')

  cy.intercept(
    'POST',
    ' https://jetvapi.test.jetstreamafrica.com/admin-api/v1/bills',
    (req) => {
      req.reply({
        fixture: 'uploadBill.json'
      })
    }
  ).as('uploadBill')
})

describe('SHIPMENTS', () => {
  it('visits the app root url', () => {
    cy.visit('/')
  })

  it('visit shipments page', () => {
    cy.visit('/shipments')
    cy.get('[data-cy="shipmentItem"]').should('have.length', 9)
    cy.contains('div', 'Shipments')
    cy.contains('div', 'JGHCN0000016 ')
  })

  it('shows shipment details', () => {
    cy.visit('/shipments')
    cy.wait('@getShipments')

    cy.get('[data-cy="shipmentItem"]').first().click()

    cy.wait('@getDetails')
    cy.get('div').contains('Shipment detail').should('be.visible')
    cy.contains('div', 'JGHCN0000016 ')

    // displays shipment details tab
    cy.contains('div', 'Booking date')
    cy.contains('div', 'Destination Port')

    // displays cargo details tab
    cy.get('div').contains('Cargo details').click()
    cy.contains('Cargo 1 - Banana')
    cy.contains('Cargo 2 - Cashew')
    cy.contains('Cargo 3 - coconut')

    cy.wait('@getBills')
    //displays bills detail tab
    cy.get('div').contains('Bills').click()
    cy.contains('div', '#JSB-00082')
    cy.contains('div', '#JSB-00079')

    //displays bills detail dropdown
    cy.get('div').contains('#JSB-00082').click()
    cy.contains('div', 'First Mile Cost')
    cy.contains('div', 'Benjamin Kissi')

    //closes bills detail dropdown
    cy.get('div').contains('#JSB-00082').click()
    cy.get('div').contains('Benjamin Kissi').should('not.be.visible')
    cy.get('div').contains('First Mile Cost').should('not.be.visible')
  })

  it('shows cargo details page', () => {
    cy.visit('/shipments')
    cy.wait('@getShipments')
    cy.get('[data-cy="shipmentItem"]').first().click()
    cy.get('div').contains('Cargo details').click()
    cy.get('div').contains('Cargo 1 - Banana').click()

    cy.contains('Cargo 1 - Banana')
    cy.contains('20ft dry standard')
    cy.contains('Commodity')
  })

  it('confirms cargo details', () => {
    cy.visit('/shipments')
    cy.wait('@getShipments')
    cy.get('[data-cy="shipmentItem"]').first().click()
    cy.contains('Confirm cargo').click()

    cy.get('div').contains('Good').click()
    cy.get('textarea[placeholder*="Additional information"]').type('test one')
    cy.get('input[type=file]').then(($el) => {
      cy.wrap($el).selectFile('cypress/fixtures/bill.jpg', {
        force: true
      })

      cy.contains('bill.jpg').should('be.visible')
    })

    cy.get('div')
      .contains(/^Confirm$/)
      .click()
  })

  it('uploads a bill', () => {
    cy.visit('/shipments')
    cy.get('[data-cy="shipmentItem"]').first().click()
    cy.contains('Upload bill').click()

    cy.get('input[type=file]').then(($el) => {
      cy.wrap($el).selectFile('cypress/fixtures/bill.jpg', {
        force: true
      })

      cy.contains('bill.jpg').should('be.visible')
    })

    cy.get('input[data-cy="invoiceNumber"]').type('TRYU945KKD')
    cy.get('input[data-cy="poNumber"]').type('YU945KKD')
    cy.get('div[data-cy="vendor"]').click()
    cy.get('div').contains('Magnus Trucking').click()

    cy.get('div[data-cy="serviceDesc"]').click()
    cy.get('div').contains('E-tracking').click()

    cy.get('input[data-cy="amount"]').type('2000')
    cy.get('div[data-cy="currency"]').click()
    cy.contains('USD').click()

    cy.get('div[data-cy="mode"]').click()
    cy.contains('Bank').click()

    cy.get('textarea[data-cy="note"]').type('testing')

    cy.contains('Save').click()
    cy.contains('Upload Successful').should('be.visible')
  })
})
