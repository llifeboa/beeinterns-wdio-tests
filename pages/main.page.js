import Page from './page';

class Main extends Page {
	constructor() {
		super();
		this.URL = '';
		this.title =
			'Интернет-магазин Билайн Москва - продажа сотовых телефонов, смартфонов и аксессуаров';
	}

	get phoneLink() {
		return $('//span[text()="телефоны"]');
	}

	open() {
		super.open(this.URL);
	}

	goToPhoneTab() {
		this.phoneLink.click();
	}
}

export default new Main();
