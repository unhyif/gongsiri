import puppeteer from 'puppeteer';

export const removeComments = (html: string) => {
  return html.replace(/<!--[\s\S]*?-->/g, '');
};

export const scrapStaticLinks = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const result = await page.evaluate(() => {
    const links = document.body.querySelectorAll('a');
    return Array.from(links).map(link => ({
      href: link.href,
      text: link.innerText,
    }));
  });

  await browser.close();

  return result;
};

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

    return removeComments(document.body.innerHTML);
  });

  await browser.close();

  return result;
};