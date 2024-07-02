# Gongsiri

> SH 청년안심주택 공실 안내 서비스

<div align="center">

![opengraph-image](https://github.com/unhyif/gongsiri/assets/93528293/b68f37ff-dd71-4eb9-b83a-12cee622153d)
[https://gongsiri.vercel.app/](https://gongsiri.vercel.app/)

</div>

<br />

- ChatGPT와 동적 크롤링을 활용한 공공주택 공실 공지 수집 서비스
- 공실 공지 확인을 위해 각 주택 홈페이지에 직접 접속해야 했던 비효율을 해결하고자 ChatGPT, Puppeteer, AWS Lambda를 통해 공실 공지 수집을 자동화
  - 기존의 공실 확인 시간 **평균 10~20분 → 1분 이내로 감축**

<br />

### Tech Stack

- TypeScript, Next.js, vanilla-extract
- Serverless, AWS Lambda, DynamoDB [(repo)](https://github.com/unhyif/gongsiri-lambda)
- Langchain.js (ChatGPT), Puppeteer
- Vercel

<br />

**2024.07.01 기준 총 934명 사용, 평일 평균 40여명의 DAU 존재**

![image](https://github.com/unhyif/gongsiri/assets/93528293/71a53825-13ed-47dc-ba01-6d67b8ee7e3e)
