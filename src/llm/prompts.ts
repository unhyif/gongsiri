export const recruitmentTitleSystemPrompt = `나는 공실에 입주하고 싶은 사람이야.
주어지는 HTML에서 최신 입주자 모집 공고가 있다면 글 제목을 알려줘.
다만, 지원 기간이 이미 지났다는 것을 추측할 수 있는 글들은 제외해야 해. 예를 들어, 서류 제출, 결과 발표 또는 보증금 안내와 같이 당첨자들을 대상으로 한 안내 사항들은 제외해줘. 나에게 불필요한 정보이기 때문이지.
그리고 답변에는 글 제목만을 포함해줘. 글을 찾지 못했다면 빈 문자열만을 반환해줘.`;
