import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import dotenv from 'dotenv';
import fs from 'fs';
import puppeteer from 'puppeteer';

dotenv.config({ path: '.env' });

const scrapStaticUrls = () => {
  const links = document.body.querySelectorAll('a');
  return JSON.stringify(
    Array.from(links).map(link => ({
      href: link.href,
      text: link.textContent,
    }))
  );
};

const getHouseAnnouncementUrl = async input => {
  const model = new ChatOpenAI({
    cache: true,
  });
  const parser = new StringOutputParser();
  // TODO: 수정
  const systemPrompt = `공지사항 링크를 찾아줘.
  링크만 출력해야 해. 예를 들어 링크가 "https://www.abc.com" 이면, 답변은 https://www.abc.com 여야 해.
  링크를 찾지 못했다면 아무것도 출력하지마.`;
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    ['user', '{input}'],
  ]);
  const chain = prompt.pipe(model).pipe(parser);
  const res = await chain.invoke({ input });
  return res;
};

export const crawlHouseAnnouncementUrls = () => {
  fs.readFile('./src/data/houseList.json', async (e, data) => {
    if (e) return;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const houses = JSON.parse(data);

    for (const house of houses) {
      try {
        await page.goto(house.url);
        const urls = await page.evaluate(scrapStaticUrls);
        house.announcementUrl = await getHouseAnnouncementUrl(urls);
      } catch (e) {
        console.log(house, e);
        house.announcementUrl = null;
      }
    }

    await browser.close();

    fs.writeFile(
      './src/data/houseList.json',
      JSON.stringify(houses),
      async e => {
        if (e) return;
      }
    );
  });
};
