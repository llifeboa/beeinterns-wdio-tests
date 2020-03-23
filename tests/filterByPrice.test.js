import { expect } from 'chai';
import Main from '../pages/main.page';
import Page from '../pages/page';
import Phones from '../pages/phones.page';
const { addStep } = require('@wdio/allure-reporter').default;

let startPrice;

describe('Фильтрация по цене', function() {
	it('Перейти на главную страницу', () => {
		addStep(`Переходим на ${Main.defaultURL}`);
		Main.open();
		addStep(`Находимся на ${Main.title}?`);
		expect(Page.title).to.equal(Main.title);
	});

	it('Нажать на вкладку Телефоны', () => {
		addStep('Нажимаем на вкладку “Телефоны');
		Main.goToPhoneTab();
		addStep(`Находимся на ${Phones.title}?`);
		expect(Page.title).to.equal(Phones.title);
	});

	it('Получить значение атрибута placeholder для поля “До”. Отнять 2000 и ввести полученное значение в поле “От”', () => {
		addStep('Изменяем значение поля "От"');
		startPrice =
			parseInt(Phones.priceInputTo.getAttribute('placeholder')) - 2000;
		const header = Phones.getProductCardHeader(0);
		Phones.setPriceInputFromValue(startPrice);
		Phones.waitProductCardUpdate();
		addStep('Проверяем изменился ли заголовок заголовок первого товара');
		expect(Phones.getProductCardHeader(0)).not.equal(header);
	});

	it('Все цены находятся в заданном диапазоне', () => {
		Phones.waitProductCardUpdate();
		addStep('Проверяем все ли цены находятся в данном диапазоне');
		let prices = Phones.getProductCardPrices();
		for (let price of prices) {
			console.log(prices);
			expect(price).to.gte(startPrice);
		}
	});
});
