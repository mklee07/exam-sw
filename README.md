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
