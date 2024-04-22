import puppeteer from 'puppeteer';

const HOUSE_LIST_ENTRY_URL =
  'https://soco.seoul.go.kr/youth/pgm/home/yohome/list.do?menuNo=400002';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(HOUSE_LIST_ENTRY_URL, { waitUntil: 'networkidle0' });

  const result = await page.evaluate(() => {
    const houses = [];

    const rows = document.body.querySelectorAll('#cohomeForm tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const house = {
        id: Number(cells[0].textContent ?? -1),
        area: (cells[2].textContent ?? '').trim(),
        name: (cells[3].textContent ?? '').trim(),
      };
      houses.push(house);
    });

    return houses;
  });

  await browser.close();

  return result;
})();
