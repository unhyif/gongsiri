import { BaseHouse, House } from '@/types/index';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import {
  latestAnnouncementHumanPrompt,
  latestAnnouncementSystemPrompt,
} from '@llm/prompts';

import { ChatPromptTemplate } from '@langchain/core/prompts';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import houseList from '@data/houseList.json';
import { scrapMainContent } from '@utils/scrapper';
import { z } from 'zod';

export async function GET() {
  const houses: BaseHouse[] = houseList;
  const result: House[] = [];

  // TODO: temperature 확인
  const model = new ChatOpenAI({ temperature: 0, cache: true, maxRetries: 3 });
  const parser = StructuredOutputParser.fromZodSchema(
    z
      .object({
        title: z.string().nullish().describe('최신 공지사항 제목'),
        createdAt: z.string().nullish().describe('최신 공지사항 날짜'),
      })
      .describe('최신 공지사항 정보')
  );
  // const fixParser = OutputFixingParser.fromLLM(model, parser);

  const splitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
    chunkSize: 5000,
  });
  const embeddings = new OpenAIEmbeddings();

  for (const house of houses) {
    const html = house.announcementUrl
      ? (await scrapMainContent(house.announcementUrl)) ?? ''
      : '';

    const splittedDocs = await splitter.createDocuments([html]);
    const vectorstore = await MemoryVectorStore.fromDocuments(
      splittedDocs,
      embeddings
    );
    const retriever = vectorstore.asRetriever();

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', latestAnnouncementSystemPrompt],
      ['human', latestAnnouncementHumanPrompt],
    ]);

    const documentChain = await createStuffDocumentsChain({
      llm: model,
      prompt,
      outputParser: parser,
    });
    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });

    const { answer } = await retrievalChain.invoke({
      input: '',
      format_instructions: parser.getFormatInstructions(),
    });
    const { title = null, createdAt = null } = answer;

    result.push({
      ...house,
      latestAnnouncement: {
        title,
        createdAt,
      },
    });
  }

  return Response.json({ data: result, updatedAt: Date.now() });
}
