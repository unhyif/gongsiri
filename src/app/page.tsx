// import { ChatOpenAI } from '@langchain/openai';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { House } from '../types';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { recruitmentSystemPrompt } from '@llm/prompts';

const model = new ChatOllama({
  model: 'llama3',
  cache: true,
});
// const model = new ChatOpenAI({ cache: true });
const parser = new StringOutputParser();
const prompt = ChatPromptTemplate.fromMessages([
  ['system', recruitmentSystemPrompt],
  ['user', '{input}'],
]);
const chain = prompt.pipe(model).pipe(parser);

export default async function Home() {
  // const html = await scrapMainContent(
  //   'https://bx201seoul.modoo.at/?link=3gs5oxwu'
  // );
  // const res = await chain.invoke({
  //   input: html,
  // });
  const res = await fetch('http://localhost:3000/api/houses', {
    next: { revalidate: 7200 },
  });
  const data: House[] = await res.json();
  return (
    <ul>
      {data.map(house => (
        <li key={house.id}>
          {house.area} {house.name} {house.announcementUrl}
        </li>
      ))}
    </ul>
  );
}
