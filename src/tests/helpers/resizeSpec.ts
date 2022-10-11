import resizeAndSendResponse from '../../helpers/resize';

describe('Testing resize function Utility', () => {
  it('This function should not throw an error', async () => {
    const res = await resizeAndSendResponse({
      fileName: 'palmtunnel.jpg',
      width: '300',
      height: '300',
    });
    expect(() => res).not.toThrowError();
  });
});
