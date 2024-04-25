export const latestAnnouncementSystemPrompt = `
You are an expert extraction algorithm.
Only extract relevant information from the context.
{format_instructions}

If you do not know the value of an attribute asked to extract, you must omit the attribute's value.
`;

export const latestAnnouncementHumanPrompt = `주어지는 context는 공지사항 페이지를 나타내는 HTML입니다.

<context>
{context}
</context>

<question>
HTML 페이지에 포함된 공지사항 중, 가장 최근 공지사항의 제목과 날짜를 찾아주세요.
- 찾은 제목과 날짜를 그대로 제공하세요. 그 외 다른 내용은 추가하지 마세요.
- 공지사항 목록은 'table' 태그 내에 위치해 있을 가능성이 높습니다.
</question>
`;
