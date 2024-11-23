import puppeteer from 'puppeteer';

const OPERATORS_PAGE = 'https://www.ubisoft.com/en-gb/game/rainbow-six/siege/game-info/operators';

const buttons = {
	attacker:
		'#app > div.r6s-op-list.undefined > div.oplist.r6s-operators-list > div:nth-child(1) > button:nth-child(1)',
	defender:
		'#app > div.r6s-op-list.undefined > div.oplist.r6s-operators-list > div:nth-child(1) > button:nth-child(2)'
};

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(OPERATORS_PAGE);

async function getOperators(): Promise<object[]> {
	return await page.evaluate(() => {
		const OPERATORS_DIV =
			'#app > div.r6s-op-list.undefined > div.oplist.r6s-operators-list > div.oplist__cards__wrapper';

		const c = document.querySelector(OPERATORS_DIV)?.children;

		let items = [];

		if (!c) return [];

		for (let i = 0; i < c?.length; i++) {
			const e = c[i];

			if (!e) continue;
			const op = {
				name: e.firstChild?.textContent,
				character: e.firstChild?.childNodes[0].src,
				icon: e.firstChild?.childNodes[1].src
			};
			items.push(op);
		}

		return items;
	});
}

await page.locator(buttons.attacker).click();
const attackers = (await getOperators()).map((e) => ({
	...e,
	side: 'attacker'
}));

await page.reload();

await page.locator(buttons.defender).click();
const defenders = (await getOperators()).map((e) => ({
	...e,
	side: 'defender'
}));

const operators = [...attackers, ...defenders];

await browser.close();

await Bun.write('./src/lib/generated/data.json', JSON.stringify(operators));
