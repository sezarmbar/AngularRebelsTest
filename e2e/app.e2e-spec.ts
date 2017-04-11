import { Angular2SniPage } from './app.po';

describe('angular2-sni App', () => {
  let page: Angular2SniPage;

  beforeEach(() => {
    page = new Angular2SniPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('mb works!');
  });
});
