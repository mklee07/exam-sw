API 목록

BaseUrl = http://192.168.180.14:3000/calendar

1. 목록조회

- GET /getTodos
- Param ( date : String \* 필수) ex) 2022-08

2. 상세조회

- GET /getDetail
- Param ( date : String \* 필수) ex) 2022-08-01

3. 목록추가

- POST /setTodo
- Body {
  contents : String,
  date : String, ex) 2022-08-01
  }

4. 상세수정

- PUT /updateTodo
- Body { id : Integer , \* 필수
  contents : String,
  }

5. 목록삭제

- DELETE /delTodo
- Body { id: Integer \* 필수 }



---
### 07.28 ~ 08.03
- 각 날짜마다 이동, 파라미터 값 넣기

- 년도 검색 시 이동

- 전송을 누를시 메시지 alert 표시 후 달력 페이지로 돌아가기

- 날짜페이지에서 이전 버튼 누를 시 경로로 이동

- 날짜 클릭시 이동한다는걸 표시
