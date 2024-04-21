// import { ChatOpenAI } from '@langchain/openai';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { recruitmentTitleSystemPrompt } from '@llm/prompts';

const HTML = `
<table class="table_type1">
              <caption><span class="blind">자유게시판 목록</span></caption>
              <colgroup>
								<col style="width:52px;">
                <col>
                <col style="width:120px;">
                <col style="width:129px;">
              </colgroup>
              <thead>
              <tr>
								<th scope="col">번호</th>
                <th scope="col">글제목</th>
                <th scope="col">글쓴이</th>
                <th scope="col">작성일</th>
              </tr>
              </thead>
              <tbody class="_boardContent"><tr class="notice" data-message-no="13" data-login-id="bx201" data-is-old-secret-reply="0">
          <td>
            <span class="icon nicon_sound3"><span class="blind">공지사항</span></span>
          </td>
          <td>
            <div class="area">
							<!-- [D] 한 번 열람했던 글에 visited 클래스 추가해주세요 <a href="#" class="tit visited"> -->
              <a href="#" class="tit">
                [마감]BX201 서울대입구역 역세권 청년주택 15형 특별 청년 공실안내
              </a>
            </div>
          </td>
          <td><span class="writer">bx201</span></td>
          <td><span class="date">2024.4.17</span></td>
        </tr><tr class="notice" data-message-no="12" data-login-id="bx201" data-is-old-secret-reply="0">
          <td>
            <span class="icon nicon_sound3"><span class="blind">공지사항</span></span>
          </td>
          <td>
            <div class="area">
							<!-- [D] 한 번 열람했던 글에 visited 클래스 추가해주세요 <a href="#" class="tit visited"> -->
              <a href="#" class="tit">
                [마감]BX201 서울대입구역 역세권 청년주택 15형 일반 청년 공실안내
              </a>
            </div>
          </td>
          <td><span class="writer">bx201</span></td>
          <td><span class="date">2024.4.17</span></td>
        </tr><tr class="notice" data-message-no="8" data-login-id="bx201" data-is-old-secret-reply="0">
          <td>
            <span class="icon nicon_sound3"><span class="blind">공지사항</span></span>
          </td>
          <td>
            <div class="area">
							<!-- [D] 한 번 열람했던 글에 visited 클래스 추가해주세요 <a href="#" class="tit visited"> -->
              <a href="#" class="tit">
                BX201 서울대청년안심주택 (공공지원민간임대) 임대보증금 지원 신청 안내
              </a>
            </div>
          </td>
          <td><span class="writer">bx201</span></td>
          <td><span class="date">2024.3.19</span></td>
        </tr><tr class="notice" data-message-no="6" data-login-id="bx201" data-is-old-secret-reply="0">
          <td>
            <span class="icon nicon_sound3"><span class="blind">공지사항</span></span>
          </td>
          <td>
            <div class="area">
							<!-- [D] 한 번 열람했던 글에 visited 클래스 추가해주세요 <a href="#" class="tit visited"> -->
              <a href="#" class="tit">
                BX201 서울대 청년주택 퇴실신청서 안내
              </a>
            </div>
          </td>
          <td><span class="writer">bx201</span></td>
          <td><span class="date">2024.3.6</span></td>
        </tr><tr class="notice" data-message-no="5" data-login-id="bx201" data-is-old-secret-reply="0">
          <td>
            <span class="icon nicon_sound3"><span class="blind">공지사항</span></span>
          </td>
          <td>
            <div class="area">
							<!-- [D] 한 번 열람했던 글에 visited 클래스 추가해주세요 <a href="#" class="tit visited"> -->
              <a href="#" class="tit">
                BX201 서울대 청년주택 입주서류 안내(월평균소득현황, 자산보유사실확인서)
              </a>
            </div>
          </td>
          <td><span class="writer">bx201</span></td>
          <td><span class="date">2024.3.6</span></td>
        </tr><tr class="notice" data-message-no="3" data-login-id="bx201" data-is-old-secret-reply="0">
          <td>
            <span class="icon nicon_sound3"><span class="blind">공지사항</span></span>
          </td>
          <td>
            <div class="area">
							<!-- [D] 한 번 열람했던 글에 visited 클래스 추가해주세요 <a href="#" class="tit visited"> -->
              <a href="#" class="tit">
                BX201 서울대청년안심주택 라온(라온플러스)공인중개사 업무종료 안내
              </a>
            </div>
          </td>
          <td><span class="writer">bx201</span></td>
          <td><span class="date">2024.2.28</span></td>
        </tr><tr class="" data-message-no="13" data-login-id="bx201" data-is-old-secret-reply="0">
          <td>
            <span class="index">13</span>
          </td>
          <td>
            <div class="area">
							<!-- [D] 한 번 열람했던 글에 visited 클래스 추가해주세요 <a href="#" class="tit visited"> -->
              <a href="#" class="tit">
                [마감]BX201 서울대입구역 역세권 청년주택 15형 특별 청년 공실안내
              </a>
            </div>
          </td>
          <td><span class="writer">bx201</span></td>
          <td><span class="date">2024.4.17</span></td>
        </tr><tr class="" data-message-no="12" data-login-id="bx201" data-is-old-secret-reply="0">
          <td>
            <span class="index">12</span>
          </td>
          <td>
            <div class="area">
							<!-- [D] 한 번 열람했던 글에 visited 클래스 추가해주세요 <a href="#" class="tit visited"> -->
              <a href="#" class="tit">
                [마감]BX201 서울대입구역 역세권 청년주택 15형 일반 청년 공실안내
              </a>
            </div>
          </td>
          <td><span class="writer">bx201</span></td>
          <td><span class="date">2024.4.17</span></td>
        </tr></tbody>
            </table>
`;

const model = new ChatOllama({
  model: 'llama3',
  cache: true,
});
// const model = new ChatOpenAI({ cache: true });
const parser = new StringOutputParser();
const prompt = ChatPromptTemplate.fromMessages([
  ['system', recruitmentTitleSystemPrompt],
  ['user', '{input}'],
]);
const chain = prompt.pipe(model).pipe(parser);

export default async function Home() {
  const res = await chain.invoke({
    input: HTML,
  });
  return <p>{res}</p>;
}
