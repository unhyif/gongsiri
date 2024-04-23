import { crawlHouseAnnouncementUrls } from './houseAnnouncementUrlCrawler.mjs';
import fs from 'fs/promises';
import puppeteer from 'puppeteer';

const BASE_URL =
  'https://soco.seoul.go.kr/youth/pgm/home/yohome/list.do?menuNo=400002';

const scrapTotalPageIndex = () =>
  Number(document.body.querySelector('#totPage').innerText.split('/')[1]);

const scrapHouses = baseUrl => {
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
      shUrl: baseUrl.replace('/list', '/view') + `&homeCode=${houseId}`,
    };
    houses.push(house);
  });

  return houses;
};

const scrapHouseUrl = () => {
  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const url = document.body.querySelector('#detail1 a').innerText.trim();
  const houseUrl = isValidURL(url) ? url : null;
  return houseUrl;
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
  const listPage = await browser.newPage();
  await listPage.goto(BASE_URL, { waitUntil: 'networkidle0' });

  const totalPageIndex = await listPage.evaluate(scrapTotalPageIndex);

  const viewPage = await browser.newPage();
  let result = [];

  for (
    let currentPageIndex = 1;
    currentPageIndex <= totalPageIndex;
    currentPageIndex++
  ) {
    const houses = await listPage.evaluate(scrapHouses, BASE_URL);
    for (const house of houses) {
      await viewPage.goto(house.shUrl, { waitUntil: 'networkidle2' });
      house.url = await viewPage.evaluate(scrapHouseUrl);
    }

    result = result.concat(houses);

    if (currentPageIndex === totalPageIndex) break;
    await listPage.bringToFront();
    await goNext(listPage, currentPageIndex + 1);
  }

  await browser.close();
  await fs.writeFile('./src/data/houseList.json', JSON.stringify(result));
  await crawlHouseAnnouncementUrls();
})();
