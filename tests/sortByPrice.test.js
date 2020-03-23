import { expect } from 'chai';
import Main from '../pages/main.page';
import Page from '../pages/page';
import Phones from '../pages/phones.page';
const { addStep } = require('@wdio/allure-reporter').default;

let startPrice;

describe('Сортировка по цене', function() {
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

	it('Нажать “Сортировать по цене”', () => {
		const header = Phones.getProductCardHeader(0);
		addStep('Сортируем по цене');
		Phones.sortByPrice();
		Phones.waitProductCardUpdate();
		addStep('Проверяем изменился ли заголовок заголовок первого товара');
		expect(Phones.getProductCardHeader(0)).not.equal(header);
	});

	it('Проверить правильность сортировки', () => {
		Phones.waitProductCardUpdate();
		addStep('Получаем список цен');
		let prices = Phones.getProductCardPrices();
		addStep('Копируем список и сортируем его по возрастанию');
		let newPrices = [...prices].sort((a, b) => a - b);
		addStep('Сравниваем 2 списка');
		console.log(prices, newPrices);
		expect(newPrices).to.eql(prices);
	});
});
