import supertest from 'supertest';
import app from '../main';

const request = supertest(app);

describe('EndPoint Testing "/conver?fileName=__&width=__&height=__"', () => {
  it('response status', async () => {
    const res = await request.get(
      '/convert?fileName=fjord.jpg&width=300&height=300',
    );
    expect(res.status).toBe(200);
  });

  it('----', () => {
    expect(2).toBe(2);
  });
  it('Wrong file name provided', async () => {
    const res = await request.get(
      '/convert?fileName=badName.jpg&width=300&height=300',
    );
    expect(res.status).toBe(400);
  });
});
