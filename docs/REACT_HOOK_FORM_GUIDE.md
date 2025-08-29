# React Hook Form: 사용하는 이유와 목적, 그리고 적용 방법

## 1. React Hook Form이란?
React Hook Form은 React에서 쉽고 성능 좋게 폼을 관리할 수 있게 해주는 라이브러리입니다. 최소한의 리렌더링, 간결한 코드, 다양한 검증 기능이 특징입니다.

## 2. 왜 React Hook Form을 사용하는가?
- **고성능**: 입력값 변경 시 필요한 부분만 리렌더링, 대규모 폼에서도 빠름
- **간결한 코드**: useForm 훅 기반, 불필요한 상태 관리 코드 최소화
- **유효성 검사**: 내장 검증, Yup/Zod 등 외부 스키마와 연동 가능
- **MUI 등 UI 라이브러리와 호환**: 공식 예제 및 지원이 풍부
- **동적 필드/배열/중첩 폼 등 복잡한 폼도 쉽게 구현**

## 3. 무엇을 할 수 있나?
- 레코드 생성/수정/삭제 등 다양한 폼 구현
- 실시간 검증, 에러 메시지, 조건부 렌더링 등 UX 개선
- Zod 등과 결합해 타입 안전성 강화

## 4. 어떻게 사용하는가? (pnpm 기준)

1. 설치
```bash
pnpm add react-hook-form
```

2. 기본 사용 예시
```tsx
import { useForm } from 'react-hook-form';

type FormValues = { key: string; data: string };

export default function ExampleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => { /* 처리 */ };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('key', { required: true })} />
      {errors.key && <span>Key is required</span>}
      <input {...register('data', { required: true })} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

3. Zod와 연동 (zodResolver)
```bash
pnpm add @hookform/resolvers zod
```
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ key: z.string(), data: z.string() });

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

## 5. 결론
- React Hook Form은 대시보드의 다양한 폼을 쉽고, 빠르고, 안전하게 구현할 수 있게 해줍니다.
- Zod, MUI 등과 결합하면 견고하고 일관된 폼 UX를 만들 수 있습니다.
