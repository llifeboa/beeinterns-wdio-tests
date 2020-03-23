import { expect } from 'chai';
import Main from '../pages/main.page';
import Page from '../pages/page';
import Phones from '../pages/phones.page';
import Basket from '../pages/basket.page';
import basketPage from '../pages/basket.page';
const { addStep } = require('@wdio/allure-reporter').default;

describe('Удаление товара и его восстановление', function() {
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

	it('Добавляем товар из середины списка в корзину', () => {
		addStep('Выбираем товар из середины списка и добавляем его в корзину');
		Phones.waitProductCardUpdate();
		const components = Phones.productCardComponents;
		const n = Math.floor(components.length / 2);
		const { headerText, buyButton } = Phones.getProductInfo(components[n]);
		buyButton.click();
		$('//div[starts-with(@class,"content ")]').waitForDisplayed();
		addStep('Проверяем URL');
		expect(Page.URL).to.contain(Basket.URL);
		addStep('Проверяем заголовок товара');
		expect(Basket.getProductHeaderText(0)).to.equal(headerText);
	});

	it('Нажать на “крестик” рядом с выбранным ранее товаром', () => {
		addStep('Удаляем товар из корзины');
		Basket.removeProduct(0);
		Basket.removeMessage.waitForDisplayed();
		addStep('Появилась ли информация по удалению');
		expect(Basket.removeMessage.isDisplayed()).to.equal(true);
	});

	it('Нажать на “Восстановить”', () => {
		addStep('Востанавливаем товар');
		Basket.restoreButton.click();
		Basket.removeMessage.waitForDisplayed(undefined, true);
		addStep('Пропала ли информация по удалению');
		expect(Basket.removeMessage.isDisplayed()).to.equal(false);
	});
});
