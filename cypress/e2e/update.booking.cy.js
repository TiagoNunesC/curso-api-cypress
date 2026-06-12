/// <reference types="cypress"/>

describe('Update Booking', () => {
    let token;

    before('Login', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                username: 'admin',
                password: 'password123',
            },
        }).then((response) => {
            token = response.body.token;
        });
    });

    it('Update Booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                firstname: 'Tiago',
                lastname: 'Brown',
                totalprice: 1411,
                depositpaid: true,
                bookingdates: {
                    checkin: '2026-06-11',
                    checkout: '2026-06-12',
                },
                additionalneeds: 'Breakfast',
            },
        }).then((response_post) => {
            const id = response_post.body.bookingid;

            cy.request({
                method: 'PUT',
                url: `https://restful-booker.herokuapp.com/booking/${id}`,
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
            });
        });
    });

    it('Update Booking comm token inválido', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                firstname: 'Tiago',
                lastname: 'Brown',
                totalprice: 1411,
                depositpaid: true,
                bookingdates: {
                    checkin: '2026-06-11',
                    checkout: '2026-06-12',
                },
                additionalneeds: 'Breakfast',
            },
        }).then((response_post) => {
            const id = response_post.body.bookingid;

            cy.request({
                method: 'PUT',
                url: `https://restful-booker.herokuapp.com/booking/${id}`,
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
                    'Cookie': 'token_invalido'
                },
            }).then((response_put) => {
                expect(response_put.status).equal(403);
            });
        });
    });
    it('Update Booking sem token', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                firstname: 'Tiago',
                lastname: 'Brown',
                totalprice: 1411,
                depositpaid: true,
                bookingdates: {
                    checkin: '2026-06-11',
                    checkout: '2026-06-12',
                },
                additionalneeds: 'Breakfast',
            },
        }).then((response_post) => {
            const id = response_post.body.bookingid;

            cy.request({
                method: 'PUT',
                url: `https://restful-booker.herokuapp.com/booking/${id}`,
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
});
