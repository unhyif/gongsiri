import fs from 'fs';
import puppeteer from 'puppeteer';

const scrapStaticUrls = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const result = await page.evaluate(() => {
    const links = document.body.querySelectorAll('a');
    return Array.from(links).map(link => ({
      href: link.href,
      text: link.textContent,
    }));
  });

  await browser.close();

  return result;
};

export const getHouseAnnouncementUrls = () => {
  fs.readFile('./src/data/houseList.json', async (e, data) => {
    if (e) return;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const houses = JSON.parse(data);

    for (const house of houses) {
      // scrapStaticUrls
      // prompt
      // house.annoucementUrl =
    }

    fs.writeFile(
      './src/data/houseList.json',
      JSON.stringify(houses),
      async e => {
        if (e) return;
      }
    );
  });
};
