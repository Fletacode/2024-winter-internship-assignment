# 간단한 프로젝트 관리 대시보드

<br>

## 프로젝트 개요

<br>


이 프로젝트는 Node.js와 Express로 백엔드 API를 구축하는 것 입니다. 사용자는 프로젝트와 각 프로젝트에 속한 태스크를 추가, 수정, 삭제할 수 있습니다.


## 기능 요구 사항

### 1. 프로젝트 관리 기능

 - **프로젝트 생성**: 새로운 프로젝트를 생성할 수 있습니다.
- **프로젝트 목록 조회**: 모든 프로젝트의 목록을 볼 수 있습니다.
- **특정 프로젝트 조회**: 선택한 프로젝트의 상세 정보와 태스크 목록을 확인할 수 있습니다.
- **프로젝트 삭제**: 선택한 프로젝트와 관련된 모든 태스크를 삭제합니다.

### 2. 태스크 관리 기능

- **태스크 생성**: 각 프로젝트에 속한 새로운 태스크를 추가할 수 있습니다.
- **태스크 목록 조회**: 선택한 프로젝트에 속한 모든 태스크를 볼 수 있습니다.
- **태스크 수정**: 특정 태스크의 제목, 설명, 우선순위, 마감일 등을 수정할 수 있습니다.
- **태스크 삭제**: 특정 태스크를 삭제할 수 있습니다.

### 3. 기타 요구 사항

- **데이터 저장**: 파일 시스템을 사용하여 데이터(JSON 파일)에 영구 저장합니다. 파일을 사용하기 싫은경우, 로컬 DB를 사용해도 괜찮습니다.
- **에러 처리**: 잘못된 요청에 대해 적절한 에러 메시지와 상태 코드를 반환합니다.


## API 엔드포인트 설계

### 프로젝트 API

- **POST /projects**: 새 프로젝트 생성

  - 요청: `{ "title": "프로젝트 제목", "description": "프로젝트 설명" }`
  - 응답: 생성된 프로젝트의 ID와 기본 정보

- **GET /projects**: 모든 프로젝트 조회

  - 응답: 모든 프로젝트 목록

- **GET /projects/:projectId**: 특정 프로젝트 조회

  - 응답: 선택한 프로젝트의 정보와 해당 프로젝트에 속한 태스크 목록

- **DELETE /projects/:projectId**: 특정 프로젝트 삭제 | 단, 태스크가 존재할 경우 삭제 불가 처리(응답 메시지 반환)
  - 응답: 삭제 성공 여부 메시지

### 태스크 API

- **POST /projects/:projectId/tasks**: 프로젝트에 태스크 추가

  - 요청: `{ "pjId": 1, "title": "태스크 제목", "description": "태스크 설명", "priority": "high", "dueDate": "2024-11-10" }`
  - 응답: 생성된 태스크의 ID와 기본 정보

- **GET /projects/:projectId/tasks**: 특정 프로젝트의 모든 태스크 조회

  - 응답: 프로젝트 내 모든 태스크 목록

- **PUT /projects/:projectId/tasks/:taskId**: 특정 태스크 수정

  - 요청: `{ "title": "수정된 태스크 제목", "priority": "medium", "dueDate": "2024-11-15", "status": "completed" }`
  - 응답: 수정된 태스크 정보

- **DELETE /projects/:projectId/tasks/:taskId**: 특정 태스크 삭제
  - 응답: 삭제 성공 여부 메시지

---

## 데이터 구조

### 프로젝트 데이터 구조

```json
{
  "id": "1",
  "title": "프로젝트 제목",
  "description": "프로젝트 설명",
  "tasks": [] // task id list
}
```

### 태스크 데이터 구조

```json
{
  "pjId": 1, // project id
  "id": "1",
  "title": "태스크 제목",
  "description": "태스크 설명",
  "priority": "high", // high | medium | low
  "dueDate": "2024-11-10",
  "status": "in-progress" // not-started | in-progress | done
}
```





