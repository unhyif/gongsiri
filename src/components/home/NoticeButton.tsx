'use client';

const TEXT =
  '자동 업데이트 기능에 문제가 발생하여 현재 수동으로 진행 중입니다. 🥲\n빠른 시일 내에 고쳐 보겠습니다.';

export const NoticeButton = () => (
  <button onClick={() => alert(TEXT)}>📣 공지 (09.19)</button>
);
