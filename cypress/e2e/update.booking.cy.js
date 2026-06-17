/// <reference types="cypress"/>

describe('Update Booking', () => {
  let token;
  let bookingid = '';

  before('Login', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        username: 'admin',
        password: 'password123',
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      token = response.body.token;
    });
  });

  beforeEach('Create Booking', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.bookingid).to.be.a('number');
      expect(response.body.booking.totalprice).equal(111);
      bookingid = response.body.bookingid;
    });
  });

  it('Update Booking', () => {
    cy.request({
      method: 'PUT',
      url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
      body: {
        firstname: 'Nome Alterado',
        lastname: 'Sobrenome Alterado',
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
    }).then((response_put) => {
      expect(response_put.status).equal(200);
      expect(response_put.body.firstname).equal('Nome Alterado');
      expect(response_put.body.lastname).equal('Sobrenome Alterado');
      expect(response_put.body.totalprice).equal(5000);
      expect(response_put.body.depositpaid).to.equal(true);
      expect(response_put.body.bookingdates.checkin).to.equal('2018-01-01');
      expect(response_put.body.bookingdates.checkout).to.equal('2019-01-01');
      expect(response_put.body.additionalneeds).to.equal('Breakfast');
    });
  });

  it('Update Booking com token inválido', () => {
    cy.request({
      method: 'PUT',
      url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
      failOnStatusCode: false,
      body: {
        firstname: 'Nome Alterado',
        lastname: 'Sobrenome Alterado',
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: 'token_invalido',
      },
    }).then((response_put) => {
      expect(response_put.status).equal(403);
    });
  });

  it('Update Booking sem token', () => {
    cy.request({
      method: 'PUT',
      url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
      failOnStatusCode: false,
      body: {
        firstname: 'Nome Alterado',
        lastname: 'Sobrenome Alterado',
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'Cookie': `token=${token}`
      },
    }).then((response_put) => {
      expect(response_put.status).equal(403);
    });
  });
});
