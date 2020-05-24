const request = require('supertest');

const app = require('../app');

describe('API E2E tests', () => {
  describe('GET /api/items', () => {
    it('responds with the appropriate JSON', () => {
      request(app)
        .get('/api/items')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeFalsy();

          const items = res.body;
          expect(items).toBeDefined();
          expect(items.length).toBeGreaterThan(1);
        });
    });
  });

  describe('GET /api/cart', () => {
    it('responds with the appropriate JSON', () => {
      request(app)
        .get('/api/cart')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeFalsy();

          const { items, discountRate, summary } = res.body;
          expect(items).toBeDefined();
          expect(discountRate).toBeDefined();
          expect(summary).toBeDefined();
        });
    });
  });

  describe('PUT /api/cart', () => {
    it('responds with the appropriate JSON', async () => {
      const requestBody = {
        items: [{
          id: 1,
          label: 'Apple, Gala (1 lb)',
          value: 0.79,
          imageUrl: 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg',
          quantity: 10,
        },
        {
          id: 2,
          label: 'Pear, Anjou (1 lb)',
          value: 1.13,
          imageUrl: 'https://i5.walmartimages.ca/images/Large/799/2_r/6000196087992_R.jpg',
          quantity: 1,
        }],
        discountRate: 0,
      };

      const expectedSummary = {
        subtotal: 9.03,
        discount: 0,
        tax: 1.17,
        total: 10.2,
      };

      const res = await request(app)
        .put('/api/cart')
        .send(requestBody);

      expect(res.statusCode).toEqual(200);
      expect(res.body.items).toEqual(requestBody.items);
      expect(res.body.discountRate).toEqual(requestBody.discountRate);
      expect(res.body.summary).toEqual(expectedSummary);
    });

    it('calculates discounts correctly', async () => {
      const requestBody = {
        items: [{
          id: 1,
          label: 'Apple, Gala (1 lb)',
          value: 0.79,
          imageUrl: 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg',
          quantity: 10,
        },
        {
          id: 2,
          label: 'Pear, Anjou (1 lb)',
          value: 1.13,
          imageUrl: 'https://i5.walmartimages.ca/images/Large/799/2_r/6000196087992_R.jpg',
          quantity: 1,
        }],
        discountRate: 0.5,
      };

      const expectedSummary = {
        subtotal: 9.03,
        discount: 4.52,
        tax: 0.59,
        total: 5.1,
      };

      const res = await request(app)
        .put('/api/cart')
        .send(requestBody);

      expect(res.statusCode).toEqual(200);
      expect(res.body.items).toEqual(requestBody.items);
      expect(res.body.discountRate).toEqual(requestBody.discountRate);
      expect(res.body.summary).toEqual(expectedSummary);
    });
  });
});
