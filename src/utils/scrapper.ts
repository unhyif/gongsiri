import puppeteer from 'puppeteer';
import { reduceTokensFromHtml } from '@utils/string';

export const scrapMainContent = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
  } catch (e) {
    await browser.close();
    return null;
  }

  const result = await page.evaluate(() => {
    const selectorsToRemove = ['script', 'nav', 'header', 'footer', 'img'];
    selectorsToRemove.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => element.remove());
    });

    return document.body.innerHTML;
  });

  await browser.close();

  return reduceTokensFromHtml(result);
};
