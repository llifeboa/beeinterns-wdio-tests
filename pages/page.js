class Page {
	constructor() {
		this.defaultURL = 'https://moskva.beeline.ru/shop/';
	}

	static get title() {
		return browser.getTitle();
	}
	static get URL() {
		return browser.getUrl();
	}

	open(url) {
		if (url) browser.url(url);
		else browser.url(this.defaultURL);
	}
}

export default Page;
