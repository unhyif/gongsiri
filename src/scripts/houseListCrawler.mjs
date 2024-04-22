import fs from 'fs';
import puppeteer from 'puppeteer';

const BASE_URL =
  'https://soco.seoul.go.kr/youth/pgm/home/yohome/list.do?menuNo=400002';

const getTotalPageIndex = () =>
  Number(document.body.querySelector('#totPage').innerText.split('/')[1]);

const getHouses = baseUrl => {
  const houses = [];

  const rows = document.body.querySelectorAll('#cohomeForm tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const areaCell = cells[2];
    const nameCell = cells[3];
    const houseId = Number(nameCell.querySelector('a').href.match(/\d+/)[0]);

    const house = {
      id: houseId,
      area: areaCell.innerText.trim(),
      name: nameCell.innerText.trim(),
      shUrl: `${baseUrl.replace('/list', '/view')}&homeCode=${houseId}`,
    };
    houses.push(house);
  });

  return houses;
};

const goNext = async (page, nextPageIndex) => {
  return await Promise.all([
    page.click('.paginate button.next'),
    page.waitForFunction(
      nextPageIndex =>
        document.body.querySelector('.paginate button.on').innerText ===
        String(nextPageIndex),
      {},
      nextPageIndex
    ),
  ]);
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  const totalPageIndex = await page.evaluate(getTotalPageIndex);
  let result = [];

  for (
    let currentPageIndex = 1;
    currentPageIndex <= totalPageIndex;
    currentPageIndex++
  ) {
    const additionalResult = await page.evaluate(getHouses, BASE_URL);

    result = result.concat(additionalResult);

    if (currentPageIndex === totalPageIndex) break;
    await goNext(page, currentPageIndex + 1);
  }

  await browser.close();

  fs.writeFileSync('./src/data/houseList.json', JSON.stringify(result));
})();
