// import { ChatOpenAI } from '@langchain/openai';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { recruitmentSystemPrompt } from '@llm/prompts';
import { scrapMainContent } from '@utils/index';

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
  const HTML = await scrapMainContent(
    'https://bx201seoul.modoo.at/?link=3gs5oxwu'
  );
  const res = await chain.invoke({
    input: HTML,
  });
  return <p>{res}</p>;
}
