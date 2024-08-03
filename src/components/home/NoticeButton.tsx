'use client';

import { formatInTimeZone } from 'date-fns-tz';
import { ko } from 'date-fns/locale';

const TEXT =
  '- 주택 목록을 최신 공지순으로 정렬하였습니다.\n- 최근 Elyes 계열 주택의 공지가 수집되지 않는 문제가 발생하여, 해당 주택을 임시적으로 목록 상단에 배치하였습니다.';

export const NoticeButton = () => (
  <button onClick={() => alert(TEXT)}>
    📣 공지 (
    {formatInTimeZone(new Date(), 'Asia/Seoul', 'MM.dd', {
      locale: ko,
    })}
    )
  </button>
);
