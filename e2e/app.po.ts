import { browser, element, by } from 'protractor';

export class Angular2SniPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('mb-root h1')).getText();
  }
}
