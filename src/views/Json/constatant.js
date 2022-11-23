const path = `${process.env.PUBLIC_URL}` + "/manual/";

const contentPage0 = [
  {
    title: "실시간 감지 API 지정",
  },
];

const contentPage1 = [
  {
    title: "설명",
    body: `테이블 명 : DB의 테이블 명을 적는것을 권장, 최종 파일명이 되며, 중복으로는 입력 불가. 
    \n전체 데이터API 주소 : CSV 파일의 첫 구조를 생성.
    \n수정감지 API 주소 : 실시간으로 감지할 API 주소 입력, 해당 API 내 내용의 변화를 감지하여 CSV파일에 추가.`,
    img: path + "1/API_Create_1.PNG",
  },
];

const contentPage2 = [
  {
    title: "예제",
    body: `테이블 명 : "USER"
전체 데이터API 주소 : "https://jsonplaceholder.typicode.com/users".
수정감지 API 주소 : https://jsonplaceholder.typicode.com/users.
\n테이블 명 : "USER"
전체 데이터API 주소 : "https://jsonplaceholder.typicode.com/comments".
수정감지 API 주소 : https://jsonplaceholder.typicode.com/comments.`,
    img: path + "1/API_Create_2.PNG",
  },
];

const contentPage3 = [
  {
    title: "실시간 암호화",
  },
];

const contentPage4 = [
  {
    title: "실시간 암호화 시작",
    body: `API 주소를 설정한 다음. "좌측 데이터 암호화-실시간 동작" 클릭, 
파란색 "실시간 암호화 진행" 버튼 클릭`,
    img: path + "2/liveStart.PNG",
  },
];
const contentPage5 = [
  {
    title: "실시간 암호화 중지",
    body: `API 주소를 수정하거나, 실시간 암호화를 중지시키고 싶다면
빨간색 "중지" 버튼 클릭, 잠시후 현재까지 진행된 내용 자동 다운로드`,
    img: path + "2/liveStop.PNG",
  },
];
const contentPage6 = [
  {
    title: "사용언어에 따른 API 생성 가이드",
  },
];
const contentPage7 = [
  {
    title: "(자바)",
    body: `1. JDBC 를 이용한 DB 연결(ORM 사용 가능)`,
    img: path + "3/API_JAVA_Create_1.png",
  },
  {
    body: `2. SELECT 쿼리를 이용한 테이블 조회(암호화 위치지정)`,
    img: path + "3/API_JAVA_Create_2.png",
  },
  {
    body: `3. Result Set Data => JSON 형식으로 변경`,
    img: path + "3/API_JAVA_Create_3.png",
  },
  {
    body: `4. JSON 데이터 반환`,
    img: path + "3/API_JAVA_Create_4.png",
  },
  {
    body: `5. API 생성`,
    img: path + "3/API_JAVA_Create_5.png",
  },
  {
    body: `6. 생성된 API`,
    img: path + "3/JAVA_JSONDATA.png",
  },
];

const contentPage8 = [
  {
    title: "(파이썬)",
    body: `1. pymysql, jdbc 등 데이터베이스 연결
2. SELECT 쿼리를 이용한 테이블 조회
3. KEY, VALUE 형태의 JSON으로 변경
4. API 생성`,
    img: path + "3/API_Python_Create_1.png",
  },
];

export {
  contentPage0,
  contentPage1,
  contentPage2,
  contentPage3,
  contentPage4,
  contentPage5,
  contentPage6,
  contentPage7,
  contentPage8,
};
