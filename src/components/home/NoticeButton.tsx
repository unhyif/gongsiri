'use client';

const TEXT =
  '안녕하세요 Gongsiri 운영자입니다.\nAI 비용 문제로 공지 업데이트를 중단하게 되었습니다. 🥲\n사이트는 내년 5월 초까지 유지될 예정입니다.\n주택 리스트 업데이트는 가능하여, 요청주시면 반영하겠습니다.\n감사합니다.';

export const NoticeButton = () => (
  <button onClick={() => alert(TEXT)}>📣 공지 (12.14)</button>
);
