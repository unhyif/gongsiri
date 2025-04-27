import FeatureItem, { Feature } from '@components/home/FeatureItem/FeatureItem';
import {
  adNotice,
  bcfStyle,
  bottomAdfitArea,
  descriptionStyle,
  featureListStyle,
  footerInsideStyle,
  footerStyle,
  introStyle,
  mainStyle,
  serviceStyle,
  tableWrapperStyle,
  titleStyle,
  titleWrapperStyle,
  topAdfit,
  topAdfitArea,
  updatedDateStyle,
} from './page.css';
import { formatCreatedAt, sortHouses } from '@utils/house';

import Clock from '@assets/svgs/clock.svg';
import { DBService } from '@utils/database';
import HouseTableArea from '@components/home/HouseTableArea/HouseTableArea';
import Loading from '@assets/svgs/loading.svg';
import { NoticeButton } from '@components/home/NoticeButton';
import Sparkle from '@assets/svgs/sparkle.svg';
import { checkMobile } from '@utils/userAgent';
import { formatInTimeZone } from 'date-fns-tz';
import { ko } from 'date-fns/locale/ko';

const houseList = [
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000365',
    area: '마포구',
    announcementUrl: 'https://www.creaone.kr/kr/customer/notice.php',
    id: 20000365,
    url: 'https://www.creaone.kr/kr/index.php',
    name: '상수역 홍대 크리원',
    isCrawlable: true,
    latestAnnouncement: {
      title:
        '대출안내 - KB국민은행(버팀목전세자금 / 신혼부부전용버팀목전세자금 / 청년전용버팀목전세자금대출 )',
      createdAt: '2021-05-10',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000363',
    area: '서초구',
    announcementUrl: 'https://seocho1502.modoo.at/?link=8a7g4ml6',
    id: 20000363,
    url: 'https://seocho1502.modoo.at/',
    name: '서초역 서초꽃마을',
    isCrawlable: true,
    latestAnnouncement: {
      title: '서초역 청년주택 903호 계약완료',
      createdAt: '2024.10.10',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000412',
    area: '강서구',
    announcementUrl: 'https://fortunablue.modoo.at/?link=dcn8otgl',
    id: 20000412,
    url: 'https://fortunablue.modoo.at',
    name: '화곡역 포르투나 블루',
    isCrawlable: true,
    latestAnnouncement: {
      title: '2023년 8월 관리비 총괄표',
      createdAt: '2023.10.24',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000506',
    area: '강남구',
    announcementUrl: 'https://maestrosamseong.com/sub.php?code=26',
    id: 20000506,
    url: 'https://maestrosamseong.com',
    name: '선릉역 마에스트로',
    isCrawlable: true,
    latestAnnouncement: {
      title: '보증금 비율 이행 확약서 - (신혼부부 또는, 청년)',
      createdAt: '2023-09-21',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000531',
    area: '동작구',
    announcementUrl: 'https://thesummittower.co.kr/24',
    id: 20000531,
    url: 'https://thesummittower.co.kr/',
    name: '노량진역 더써밋타워',
    isCrawlable: true,
    latestAnnouncement: {
      title: '더써밋타워 입주신청 안내',
      createdAt: '2024-09-05',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000360',
    area: '강서구',
    announcementUrl: 'https://im2030.modoo.at/?link=6h5mcxkx',
    id: 20000360,
    url: 'https://im2030.modoo.at',
    name: '등촌역 아임2030',
    isCrawlable: true,
    latestAnnouncement: {
      title:
        '아임2030이 입주민에게 드리는 일곱번째 선물 - 위카페 허브티 쿠폰 증정',
      createdAt: '2021.12.15',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000418',
    area: '광진구',
    announcementUrl: 'http://vivahillskb.co.kr/bbs/board.php?bo_table=notice',
    id: 20000418,
    url: 'https://www.vivahillskb.co.kr/',
    name: '강변역 비바힐스 강변',
    isCrawlable: true,
    latestAnnouncement: {
      title: '[ 공공임대 모집공고문 확인 시 ]',
      createdAt: '2024-08-05',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000419',
    area: '도봉구',
    announcementUrl: null,
    id: 20000419,
    url: 'http://ghp.kr/',
    name: '쌍문역 인히어쌍문',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000443',
    area: '동대문구',
    announcementUrl: 'https://www.doojin2030.co.kr/sub.php?code=10',
    id: 20000443,
    url: 'https://www.doojin2030.co.kr/',
    name: '회기역 하트리움',
    isCrawlable: true,
    latestAnnouncement: {
      title: '회기역 하트리움 입주관심 등록 안내',
      createdAt: '2023-09-27',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000414',
    area: '광진구',
    announcementUrl: null,
    id: 20000414,
    url: null,
    name: '강변역 옥산그린타워',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000550',
    area: '관악구',
    announcementUrl: 'https://centersquaresnu.com/sub/sub04_02.php',
    id: 20000550,
    url: 'https://centersquaresnu.com/',
    name: '서울대벤처타운역 센터스퀘어 서울대점',
    isCrawlable: true,
    latestAnnouncement: {
      title: '[센터스퀘어 서울대점 선착순 모집 안내]',
      createdAt: '2024-11-08',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000496',
    area: '관악구',
    announcementUrl: 'https://www.xn--939aq02c7teiyd.com/sub/sub05_01.php',
    id: 20000496,
    url: 'https://www.최강타워.com',
    name: '신림역 최강타워',
    isCrawlable: false,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000420',
    area: '송파구',
    announcementUrl: 'http://www.jamsilltower.co.kr/bbs/board.php?bo_table=5_1',
    id: 20000420,
    url: 'http://www.jamsilltower.co.kr/index.php',
    name: '잠실새내역 잠실엘타워',
    isCrawlable: true,
    latestAnnouncement: {
      title: '일반공급(청년) 33형 선착순 현장계약 마감 안내',
      createdAt: '2023.06~',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000480',
    area: '강남구',
    announcementUrl: 'https://www.theoneys.co.kr/notice',
    id: 20000480,
    url: 'https://www.theoneys.co.kr/',
    name: '역삼역 더원역삼',
    isCrawlable: true,
    latestAnnouncement: {
      title: '[공지] 추가 입주자 모집 당첨자(예비 당첨 포함) 발표',
      createdAt: '2023-03-29',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000370',
    area: '강남구',
    announcementUrl: 'http://www.listgangnam.co.kr/bbs/board.php?bo_table=news',
    id: 20000370,
    url: 'http://www.listgangnam.co.kr/',
    name: '신논현역 리스트 강남',
    isCrawlable: true,
    latestAnnouncement: {
      title: '새로운 소식을 알려드립니다.',
      createdAt: null,
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000513',
    area: '중구',
    announcementUrl: 'https://166tower.modoo.at/?link=5j8b3kfn',
    id: 20000513,
    url: 'https://166tower.modoo.at/',
    name: '동대문역사문화공원역 166 tower',
    isCrawlable: true,
    latestAnnouncement: {
      title: '임대료 계좌 변경에 따른 입주공고문 수정 안내',
      createdAt: '2023.11.21',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000353',
    area: '마포구',
    announcementUrl: null,
    id: 20000353,
    url: null,
    name: '합정역 서교 효성 해링턴타워',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000484',
    area: '강남구',
    announcementUrl: null,
    id: 20000484,
    url: 'https://first-home.co.kr/',
    name: '선정릉역 모아엘가 퍼스트홈',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000354',
    area: '강서구',
    announcementUrl: 'https://centersquare.modoo.at/?link=bpjvg4uq',
    id: 20000354,
    url: 'https://centersquare.modoo.at/',
    name: '등촌역 센터스퀘어 등촌',
    isCrawlable: true,
    latestAnnouncement: {
      title:
        '센터스퀘어 등촌 임대보증금 보증보험 가입완료 안내(24.03.04 ~ 25.03.03)',
      createdAt: '2024.4.2',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000475',
    area: '영등포구',
    announcementUrl: 'https://www.xn--910b48b70glxklhy.com/notice.html',
    id: 20000475,
    url: 'http://www.포레나당산.com',
    name: '영등포구청역 포레나 당산',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000526',
    area: '동작구',
    announcementUrl: 'https://www.db40314.kr/29',
    id: 20000526,
    url: 'https://www.db40314.kr/',
    name: '신대방삼거리역 골든노블레스',
    isCrawlable: true,
    latestAnnouncement: { title: '공지사항', createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000544',
    area: '동작구',
    announcementUrl:
      'http://sadang-cove.com/system/bbs/board.php?bo_table=notice',
    id: 20000544,
    url: 'http://sadang-cove.com/',
    name: '사당역 코브(cove)',
    isCrawlable: true,
    latestAnnouncement: {
      title: '■예비당첨자 2차 계약일정 및 입주기간 공고■',
      createdAt: '11-14',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000357',
    area: '동대문구',
    announcementUrl: 'https://hkjskycity.modoo.at/?link=f3scs7qg',
    id: 20000357,
    url: 'https://hkjskycity.modoo.at/',
    name: '회기역 휘경제이스카이시티',
    isCrawlable: true,
    latestAnnouncement: {
      title: '전화 상담 운영 시간 안내',
      createdAt: '2022.2.7',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000495',
    area: '송파구',
    announcementUrl: 'https://jamsilcentralpark.com/notice1',
    id: 20000495,
    url: 'https://jamsilcentralpark.com/',
    name: '잠실새내역 잠실센트럴파크',
    isCrawlable: true,
    latestAnnouncement: {
      title: '[임차인 모집공고] 1세대 모집(일반형 21 타입)',
      createdAt: '2024-10-15',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000415',
    area: '강서구',
    announcementUrl: 'https://youngtower.modoo.at/?link=94gu5os0',
    id: 20000415,
    url: 'https://youngtower.modoo.at/',
    name: '발산역 엘크루',
    isCrawlable: true,
    latestAnnouncement: {
      title: '[2024년 HUG임대보증금 보증보험안내]',
      createdAt: '2024.5.13',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000352',
    area: '서대문구',
    announcementUrl: 'https://www.elyes.co.kr/info/notice.do',
    id: 20000352,
    url: 'https://www.elyes.co.kr/main/stayView.do?pid=10',
    name: '충정로역 어바니엘 위드 더 스타일 충정로',
    isCrawlable: true,
    latestAnnouncement: {
      title: "[어바니엘 충정로] 공실세대 모집공고 (공고일:'24.11.15.)",
      createdAt: '2024-11-15',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000416',
    area: '중랑구',
    announcementUrl: 'https://carltonterrace.modoo.at/?link=8pc68vsh',
    id: 20000416,
    url: 'https://carltonterrace.modoo.at',
    name: '먹골역 칼튼테라스',
    isCrawlable: true,
    latestAnnouncement: {
      title: '먹골역 칼튼테라스 33타입 재공고(안)',
      createdAt: '2022.2.25',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000362',
    area: '용산구',
    announcementUrl:
      'https://www.ys-vertium-friends.co.kr/board/board_list.php?board_name=508c75c8507',
    id: 20000362,
    url: 'http://www.ys-vertium-friends.co.kr/main/index.php',
    name: '삼각지역 용산 베르디움 프렌즈',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000549',
    area: '노원구',
    announcementUrl: 'https://mhinitium.co.kr/customer/index.php',
    id: 20000549,
    url: 'https://mhinitium.co.kr/',
    name: '태릉입구역 이니티움',
    isCrawlable: true,
    latestAnnouncement: {
      title: '보존등기 완료 안내',
      createdAt: '2024-11-13',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000501',
    area: '영등포구',
    announcementUrl: 'https://juntower.co.kr/service/notice',
    id: 20000501,
    url: 'https://juntower.co.kr',
    name: '신길역 준타워',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000373',
    area: '은평구',
    announcementUrl: 'https://duckyoung2016.com/notice',
    id: 20000373,
    url: 'https://duckyoung2016.com/',
    name: '구산역 구산주택',
    isCrawlable: true,
    latestAnnouncement: {
      title: '구산주택 입주안내문',
      createdAt: '2022-05-11',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000364',
    area: '강동구',
    announcementUrl:
      'http://xn--zf0bo4e9zsyre7pe70grdw68amqm.com/bbs/board.php?bo_table=notice',
    id: 20000364,
    url: 'http://xn--zf0bo4e9zsyre7pe70grdw68amqm.com/',
    name: '천호역 한강리슈빌',
    isCrawlable: true,
    latestAnnouncement: {
      title: '입주자 자동차 소유·운행 기준 변경 시행 안내',
      createdAt: '2023-11-13',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000540',
    area: '은평구',
    announcementUrl: 'https://www.thestudio163.co.kr/sub/sub05_01.php',
    id: 20000540,
    url: 'http://www.thestudio163.co.kr',
    name: '연신내역 THE STUDIO 163',
    isCrawlable: true,
    latestAnnouncement: {
      title: '연신내역 THE STUDIO 163 임대보증금보증보험 가입 완료 안내',
      createdAt: '2024-09-12',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000482',
    area: '광진구',
    announcementUrl: 'http://www.centumhills.co.kr/bbs/board.php?bo_table=news',
    id: 20000482,
    url: 'http://www.centumhills.co.kr/',
    name: '강변역 센텀힐스한강',
    isCrawlable: true,
    latestAnnouncement: {
      title: 'A16 타입 동,호수 당첨자 발표.',
      createdAt: '2023-02-21',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000358',
    area: '성동구',
    announcementUrl: null,
    id: 20000358,
    url: null,
    name: '장한평역 힐데스하임(U-삼진랜드)',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000356',
    area: '강서구',
    announcementUrl: 'https://bonumhaus2030.modoo.at/?link=czpnlnoj',
    id: 20000356,
    url: 'https://bonumhaus2030.modoo.at/',
    name: '화곡역 보눔하우스 화곡',
    isCrawlable: true,
    latestAnnouncement: {
      title: '임대보증금 보증증권',
      createdAt: '2021.7.28',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000386',
    area: '관악구',
    announcementUrl: 'https://bx201seoul.modoo.at/?link=3gs5oxwu',
    id: 20000386,
    url: 'https://bx201seoul.modoo.at/',
    name: '서울대입구역 BX201',
    isCrawlable: true,
    latestAnnouncement: {
      title: '[마감]BX201 서울대입구역 역세권 청년주택 15형 일반 청년 공실안내',
      createdAt: '2024.11.4',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000359',
    area: '종로구',
    announcementUrl: null,
    id: 20000359,
    url: 'https://younghome.modoo.at/',
    name: '동묘앞역 동대문영하우스',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000355',
    area: '마포구',
    announcementUrl: 'http://elandhome.co.kr/sub/sub04_03.php',
    id: 20000355,
    url: 'http://elandhome.co.kr/index.php',
    name: '광흥창역 이랜드신촌청년주택',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000525',
    area: '은평구',
    announcementUrl: 'https://lucestation.com/sub/sub05_01.php',
    id: 20000525,
    url: 'https://lucestation.com',
    name: '연신내역 루체스테이션',
    isCrawlable: true,
    latestAnnouncement: {
      title: '임차인모집공고(4차) 당첨자 및 예비당첨자 발표 - 특별공급(35.43)',
      createdAt: '2024-06-07',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000424',
    area: '도봉구',
    announcementUrl: 'https://eadgarssangmun.modoo.at/?link=qhovm1s8',
    id: 20000424,
    url: 'https://eadgarssangmun.modoo.at/',
    name: '솔밭공원역 에드가쌍문',
    isCrawlable: true,
    latestAnnouncement: {
      title: '에드가쌍문 추가모집(선착순) 및 계약 공고',
      createdAt: '2024.10.16',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000421',
    area: '광진구',
    announcementUrl: 'https://remarkvillgunja.com/sub/sub04_02.php',
    id: 20000421,
    url: 'https://remarkvillgunja.com/',
    name: '군자역 리마크빌 군자',
    isCrawlable: true,
    latestAnnouncement: {
      title: '리마크빌 군자 잔여세대 상시모집',
      createdAt: '2022-10-24',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000417',
    area: '노원구',
    announcementUrl: 'https://yntower.modoo.at/?link=a88etaku',
    id: 20000417,
    url: 'https://yntower.modoo.at/',
    name: '태릉입구역 와이엔타워',
    isCrawlable: true,
    latestAnnouncement: {
      title: '민간임대 중도 퇴실자 안내 사항입니다',
      createdAt: '2024.10.30',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000361',
    area: '동작구',
    announcementUrl: 'https://theclassic2030.modoo.at/?link=eez99qhu',
    id: 20000361,
    url: 'https://theclassic2030.modoo.at/',
    name: '노량진역 더클래식동작',
    isCrawlable: true,
    latestAnnouncement: {
      title:
        '더클래식 동작 계약종료 요청서, 중도퇴실요청서, 보증금반환신청서 양식 다운로드',
      createdAt: '2024.8.2',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000537',
    area: '중랑구',
    announcementUrl: 'https://sbnpart.co.kr/center/notice.php',
    id: 20000537,
    url: 'https://sbnpart.co.kr/index.php',
    name: '상봉역 상봉동양엔파트',
    isCrawlable: true,
    latestAnnouncement: {
      title: '3차 입주자모집 안내(특별공급 1세대) 추첨결과 안내',
      createdAt: '2024-10-31',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000498',
    area: '강동구',
    announcementUrl: 'https://www.cheonho2030.com/sub/sub04_02.php',
    id: 20000498,
    url: 'https://www.cheonho2030.com/',
    name: '천호역 효성해링턴타워',
    isCrawlable: true,
    latestAnnouncement: {
      title:
        '천호역 효성 해링턴타워(청년안심주택) 예비당첨자 동호수 발표(23.10.25)',
      createdAt: '2023-10-25',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000406',
    area: '용산구',
    announcementUrl: 'https://www.elyes.co.kr/info/notice.do',
    id: 20000406,
    url: 'https://www.elyes.co.kr',
    name: '남영역 용산 원효 루미니',
    isCrawlable: true,
    latestAnnouncement: {
      title: "[어바니엘 충정로] 공실세대 모집공고 (공고일:'24.11.15.)",
      createdAt: null,
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000479',
    area: '서초구',
    announcementUrl: 'http://www.conest.co.kr/notice',
    id: 20000479,
    url: 'http://www.conest.co.kr/',
    name: '양재역 CONEST',
    isCrawlable: true,
    latestAnnouncement: { title: '당첨 안내', createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000503',
    area: '종로구',
    announcementUrl: 'https://lovenheim.imweb.me/notice1',
    id: 20000503,
    url: 'https://lovenheim.imweb.me/',
    name: '동묘앞역 청계로벤하임',
    isCrawlable: true,
    latestAnnouncement: {
      title: '특별공급 제출서류 안내(계약서 작성 시 원본 제출)',
      createdAt: '2024-06-04',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000436',
    area: '서대문구',
    announcementUrl: 'http://www.stkaja.co.kr/bbs/board.php?bo_table=news',
    id: 20000436,
    url: 'http://www.stkaja.co.kr/',
    name: '가좌역 스타타워',
    isCrawlable: true,
    latestAnnouncement: {
      title: '2차 입주자모집공고 및 청년주택 입주자 주거비지원 안내문',
      createdAt: '2023-01-10',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000366',
    area: '중랑구',
    announcementUrl: 'https://jstar2030.modoo.at/?link=26i11qts',
    id: 20000366,
    url: 'https://jstar2030.modoo.at',
    name: '상봉역 제이스타상봉',
    isCrawlable: true,
    latestAnnouncement: {
      title: '일반공급 추가모집 당첨자 발표',
      createdAt: '2024.9.2',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000541',
    area: '영등포구',
    announcementUrl: 'https://sinpung2030.com/html/sub3/sub5.html',
    id: 20000541,
    url: 'https://sinpung2030.com',
    name: '신풍역 비스타동원',
    isCrawlable: false,
    latestAnnouncement: {
      title: '[민간임대] 신풍역 비스타동원 입주자 모집공고문',
      createdAt: '2024-05-10',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000437',
    area: '은평구',
    announcementUrl:
      'https://xn--2z1bz6f6tctpw4vlsgid92d895c2hl.com/notice.html',
    id: 20000437,
    url: 'http://호반베르디움스테이원.com',
    name: '불광역 호반베르디움 스테이원',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000413',
    area: '영등포구',
    announcementUrl: 'https://dorimbravo.modoo.at/?link=286i2ogk',
    id: 20000413,
    url: 'https://dorimbravo.modoo.at/',
    name: '신도림역 도림브라보',
    isCrawlable: true,
    latestAnnouncement: {
      title: '금일 담당자 휴가로 문의 답변 불가합니다.',
      createdAt: '3시간 전',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000529',
    area: '송파구',
    announcementUrl: 'https://maestromunjeong.com/sub.php?code=26',
    id: 20000529,
    url: 'https://maestromunjeong.com',
    name: '문정역 마에스트로',
    isCrawlable: true,
    latestAnnouncement: {
      title: '문정역 마에스트로 고객안내센터 폐관 안내',
      createdAt: '2024-03-12',
    },
  },
  {
    shUrl:
      'https://soco.seoul.go.kr/youth/pgm/home/yohome/view.do?menuNo=400002&homeCode=20000371',
    area: '강서구',
    announcementUrl: 'https://ujs2030.co.kr/sub06_1',
    id: 20000371,
    url: 'https://ujs2030.co.kr/',
    name: '우장산역 해링턴타워',
    isCrawlable: true,
    latestAnnouncement: { title: null, createdAt: null },
  },
];

const FEATURES: Feature[] = [
  {
    title: '평일 하루 4번 업데이트',
    description: '9시 · 12시 · 15시 · 18시에 페이지 업데이트를 진행해요.',
    Icon: Clock,
  },
  {
    title: 'ChatGPT를 통한 공실 안내',
    description:
      'GPT-4o mini를 통해 최신 공지를 추려내고 있어요.\n현재 기술 수준에서는 오차가 있을 수 있어요.',
    Icon: Sparkle,
  },
  {
    title: '기기 간 즐겨찾기 연동 미지원',
    description: '아직은 즐겨찾기한 주택이 다른 기기와 연동되지 않아요.',
    Icon: Loading,
  },
];

export default async function Home() {
  const dbService = new DBService();

  // const houseList = await dbService.getHouseList();
  const formattedHouseList = houseList.map(house => ({
    ...house,
    latestAnnouncement: {
      ...house.latestAnnouncement,
      createdAt: formatCreatedAt(house.latestAnnouncement.createdAt),
    },
  }));
  // const updatedAt = await dbService.getHouseListUpdatedAt();
  const updatedAt = 1731985633747;

  const updatedDate = formatInTimeZone(
    updatedAt,
    'Asia/Seoul',
    'yyyy년 M월 d일 (E) HH:mm',
    { locale: ko }
  );

  const isMobile = checkMobile();

  return (
    <>
      <main className={mainStyle}>
        <div className={introStyle}>
          <div className={serviceStyle}>
            <a
              className={bcfStyle}
              href="https://buymeacoffee.com/unhyif?l=en"
              target="_blank"
            >
              ☕️ 커피 후원
            </a>
            <NoticeButton />
            <a href="https://forms.gle/SYQ6MWoKET2nMhXo8" target="_blank">
              💌 서비스 문의
            </a>
          </div>

          <div className={titleWrapperStyle}>
            <h1 className={titleStyle}>Gongsiri</h1>
            <p className={descriptionStyle}>SH 청년안심주택 공실 안내 서비스</p>
          </div>

          <ul className={featureListStyle}>
            {FEATURES.map(feature => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </ul>

          <div className={topAdfitArea}>
            <div className={topAdfit({ isMobile })}>
              {isMobile ? (
                <ins
                  className="kakao_ad_area"
                  style={{ display: 'none' }}
                  data-ad-unit={process.env.ADFIT_MOBILE_UNIT}
                  data-ad-width="320"
                  data-ad-height="100"
                />
              ) : (
                <ins
                  className="kakao_ad_area"
                  style={{ display: 'none' }}
                  data-ad-unit={process.env.ADFIT_PC_UNIT}
                  data-ad-width="728"
                  data-ad-height="90"
                />
              )}
            </div>
            <p className={adNotice}>광고 적립금은 OpenAI 비용에 사용됩니다.</p>
          </div>

          <p className={updatedDateStyle}>최근 업데이트: {updatedDate}</p>
        </div>

        <div className={tableWrapperStyle}>
          <HouseTableArea houseList={sortHouses(formattedHouseList)} />
        </div>

        <div className={bottomAdfitArea}>
          <ins
            className="kakao_ad_area"
            style={{ display: 'none' }}
            data-ad-unit={process.env.ADFIT_BASIC_UNIT}
            data-ad-width="300"
            data-ad-height="250"
          />
        </div>
      </main>

      <footer className={footerStyle}>
        <div className={footerInsideStyle}>
          <p>© 2025 Gongsiri. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
