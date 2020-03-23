import Page from './page';

class Basket extends Page {
	constructor() {
		super();
		this.URL = this.defaultURL + 'basket/';
	}
	open() {
		super.open(this.URL);
	}
	get removeButtons() {
		return $$('//span[@data-ng-click="deleteItem(item, true)"]');
	}
	get removeMessage() {
		return $('//span[text()="Товар был удален из корзины"]');
	}
	get restoreButton() {
		return $('//span[text()="Восстановить"]');
	}
	get firstHeader() {
		return $('//h3/a');
	}
	get productHeaders() {
		return $$('//h3/a');
	}
	removeProduct(n) {
		this.removeButtons[n].waitForDisplayed();
		this.removeButtons[n].click();
	}
	getProductHeaderText(n) {
		this.firstHeader.waitForDisplayed();
		return this.productHeaders[n].getText();
	}
}

export default new Basket();
