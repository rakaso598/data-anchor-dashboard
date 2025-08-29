# Zod: 사용하는 이유와 목적, 그리고 적용 방법

## 1. Zod란?
Zod는 TypeScript 친화적인 스키마 선언 및 데이터 검증 라이브러리입니다. 런타임에서 객체 구조와 타입을 안전하게 검증할 수 있습니다.

## 2. 왜 Zod를 사용하는가?
- **타입 안전성**: TypeScript 타입과 스키마를 100% 동기화, 타입 추론이 매우 강력함
- **런타임 검증**: API 요청/응답, 폼 입력 등에서 데이터 구조를 런타임에 안전하게 검증
- **간결한 문법**: 선언적이고 직관적인 스키마 작성
- **생산성**: 타입 정의와 검증 로직을 한 번에 관리, 코드 중복 최소화
- **React Hook Form 등과 연동**: 폼 검증, API 데이터 검증에 쉽게 통합 가능

## 3. 무엇을 할 수 있나?
- 폼 입력값 검증(프론트엔드)
- API 요청/응답 데이터 구조 검증(프론트/백엔드 모두)
- 타입 추론 기반의 안전한 데이터 처리
- 복잡한 중첩 객체, 배열, 조건부 스키마 등 다양한 데이터 구조 지원

## 4. 어떻게 사용하는가? (pnpm 기준)

1. 설치
```bash
pnpm add zod
```

2. 기본 사용 예시
```ts
import { z } from 'zod';

// 예시: 레코드 생성 요청 스키마
type RecordData = { foo: string; bar: number };
const createRecordSchema = z.object({
  key: z.string(),
  data: z.object({
    foo: z.string(),
    bar: z.number(),
  })
});

// 검증
const result = createRecordSchema.safeParse({ key: 'test', data: { foo: 'abc', bar: 123 } });
if (!result.success) {
  // 에러 처리
}
```

3. React Hook Form 등과 연동 가능 (zodResolver)

## 5. 결론
- Zod는 타입 안전성과 런타임 검증을 동시에 제공하여, 견고하고 예측 가능한 대시보드 개발에 매우 적합합니다.
- 폼 검증, API 데이터 구조 명확화, 타입 추론 등 다양한 영역에서 생산성과 안정성을 높여줍니다.
