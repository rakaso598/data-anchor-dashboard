# Next.js 대시보드 개발을 위한 NestJS API 연동 가이드

## 1. API 엔드포인트 및 요청-응답 형식

### 엔드포인트 목록

- `GET    /records`  
  모든 key의 최신(active) 레코드 목록 조회
  
  **응답 예시:**
  ```json
  [
    {
      "key": "example",
      "version": 3,
      "data": { ... },
      "status": "active",
      "prevHash": "...",
      "hash": "...",
      "createdAt": "2025-08-29T12:34:56.000Z"
    },
    ...
  ]
  ```

- `GET    /records/:key`  
  특정 key의 최신(active) 레코드 조회
  
  **응답:** 위와 동일(단일 객체)

- `GET    /records/:key/history`  
  특정 key의 모든 이력(append-only, 삭제 포함) 조회
  
  **응답 예시:**
  ```json
  [
    { "version": 1, "status": "active", ... },
    { "version": 2, "status": "active", ... },
    { "version": 3, "status": "deleted", ... }
  ]
  ```

- `POST   /records`  
  새 key/value 등록
  
  **요청:**
  ```json
  { "key": "example", "data": { ... } }
  ```
  **응답:** 생성된 레코드 객체  
  **API Key 필요:** 헤더에 `x-api-key: <API_KEY>`

- `PUT|PATCH /records/:key`  
  기존 key의 값 수정(append-only, version+1)
  
  **요청:**
  ```json
  { "data": { ... } }
  ```
  **응답:** 새 버전 레코드  
  **API Key 필요**

- `DELETE /records/:key`  
  기존 key 논리적 삭제(append-only, status: deleted)
  
  **응답:** 삭제 처리된 새 버전 레코드  
  **API Key 필요**

---

## 2. 대시보드 구현 기본 골격

### 주요 기능

- **전체 레코드 목록 테이블**  
  key, version, status, createdAt 등 표시
  
- **레코드 상세/이력 보기**  
  key별 모든 버전(append-only 이력) 타임라인/테이블로 표시

- **레코드 생성/수정/삭제 폼**  
  key/data 입력, 수정/삭제 시 API Key 입력(또는 환경변수로 관리)

- **API Key 인증 처리**  
  CUD 요청 시 헤더에 `x-api-key` 자동 포함

- **에러/성공 메시지, 로딩 상태 등 UX 처리**

### 기술 스택/구현 팁

- **Next.js (React 기반)**
- **UI 라이브러리**: Material UI, Ant Design, Chakra UI 등
- **데이터 패칭**: fetch, axios, SWR, React Query 등
- **환경변수**: API URL, API Key 등 .env.local로 관리
- **Vercel 배포**: next.config.js, 환경변수 세팅

---

## 3. 예시 코드 스니펫

### 레코드 목록 조회 (SWR 예시)
```javascript
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());
const { data, error } = useSWR('/api/records', fetcher);
```

### 레코드 생성 (API Key 포함)
```javascript
await fetch('/api/records', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY
  },
  body: JSON.stringify({ key, data })
});
```

---

## 4. 대시보드 UI 예시

- **메인 페이지**: 전체 레코드 테이블, “생성” 버튼
- **상세/이력 페이지**: key별 버전 타임라인/테이블
- **폼**: 생성/수정/삭제 입력, API Key 입력(또는 자동)

---

## 5. 기타 참고

- API URL, API Key 등은 환경변수(.env.local)로 관리
- CUD 요청 시 반드시 API Key 필요
- 데이터 구조(append-only, status, version 등)와 불변성 원칙 반영

---

이 문서를 참고하면 다른 에이전트가 Next.js 대시보드 개발에 바로 착수할 수 있습니다.
