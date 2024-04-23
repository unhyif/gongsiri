import puppeteer from 'puppeteer';
import { reduceTokensFromHtml } from './string';

export const scrapMainContent = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  const result = await page.evaluate(() => {
    const selectorsToRemove = ['script', 'nav', 'header', 'footer', 'img'];
    selectorsToRemove.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => element.remove());
    });

    return reduceTokensFromHtml(document.body.innerHTML);
  });

  await browser.close();

  return result;
};
