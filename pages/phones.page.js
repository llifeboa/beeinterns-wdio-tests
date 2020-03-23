import Page from './page';

class Phones extends Page {
	constructor() {
		super();
		this.URL = this.defaultURL + 'catalog/telefony/smartfony/';
		this.title =
			'Смартфоны — купить смартфон, цены на телефоны в интернет-магазине Билайн Москва';
	}

	get priceInputs() {
		return $$('//span[text()="Цена"]/../..//input');
	}
	get priceInputFrom() {
		return this.priceInputs[0];
	}
	get priceInputTo() {
		return this.priceInputs[1];
	}
	get productCardComponents() {
		return $$('//div[contains(@class, "ProductCard_component")]');
	}
	get productCardHeaders() {
		return this.productCardComponents.map(item =>
			item.$('//div[contains(@class, "ProductCard_header")]/a')
		);
	}
	get productCardPrices() {
		return this.productCardComponents.map(item =>
			item.$(
				'//div[contains(@class, "ProductCard_component")]//div[contains(@class, "Heading_component") and not(contains(@class, "Price_oldValue"))]/div[contains(@class, "InlineSet_container")]/div[1]'
			)
		);
	}
	get productCardBuyButtons() {
		return this.productCardComponents.map(item =>
			item.$('//div[contains(@class, "ProductCard_component")]//button')
		);
	}
	get sortByPriceButton() {
		return $('//span[text()=" Цене"]');
	}
	getPriceInputFromValue() {
		this.priceInputFrom.waitForExist();
		return this.priceInputFrom.getValue();
	}

	getPriceInputToValue() {
		this.priceInputTo.waitForExist();
		return this.priceInputTo.getValue();
	}

	setPriceInputFromValue(value) {
		this.priceInputFrom.waitForExist();
		this.priceInputFrom.setValue(value);
	}

	setPriceInputToValue(value) {
		this.priceInputTo.waitForExist();
		this.priceInputTo.setValue(value);
	}

	getProductInfo(product) {
		const headerText = product
			.$('//div[contains(@class, "ProductCard_header")]/a')
			.getText();
		const buyButton = product.$(
			'//div[contains(@class, "ProductCard_component")]//button'
		);
		return {
			headerText,
			buyButton,
		};
	}

	getProductCardHeader(n) {
		return this.productCardHeaders[n].getText();
	}

	getProductCardPrices() {
		this.waitProductCardUpdate();
		return this.productCardPrices.map(item => {
			let textPrice = item.getText();
			return parseInt(textPrice.match(/[0-9]/g).join(''));
		});
	}

	sortByPrice() {
		const button = this.sortByPriceButton;
		button.waitForDisplayed();
		button.click();
	}
	waitProductCardUpdate() {
		$(
			'//div[contains(@class, "SmoothContentSwitcher_container") and contains(@class, "SmoothContentSwitcher_static")]'
		).waitForDisplayed();
	}

	open() {
		super.open(this.URL);
	}
}

export default new Phones();
