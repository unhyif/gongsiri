import puppeteer from 'puppeteer';

const HOUSE_LIST_ENTRY_URL =
  'https://soco.seoul.go.kr/youth/pgm/home/yohome/list.do?menuNo=400002';

const getNumOfTotalPages = () =>
  Number(document.body.querySelector('#totPage').innerText.split('/')[1]);

const getHouses = () => {
  const houses = [];

  const rows = document.body.querySelectorAll('#cohomeForm tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const house = {
      id: Number(cells[0].innerText.trim()),
      area: cells[2].innerText.trim(),
      name: cells[3].innerText.trim(),
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
  await page.goto(HOUSE_LIST_ENTRY_URL, { waitUntil: 'networkidle0' });

  const numOfTotalPages = await page.evaluate(getNumOfTotalPages);
  let result = [];

  for (let currentPage = 1; currentPage <= numOfTotalPages; currentPage++) {
    const additionalResult = await page.evaluate(getHouses);
    result = result.concat(additionalResult);

    if (currentPage === numOfTotalPages) break;
    await goNext(page, currentPage + 1);
  }

  await browser.close();

  return result;
})();
