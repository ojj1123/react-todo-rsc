# React TodoList w/ RSC

## 목표

- Vite API와 React18 기능을 이용해 React server component(RSC) 환경을 직접 구축한다.
- RSC를 위한 HMR(Hot Module Replacement) 플러그인을 제작한다.

## 기술스택

- React (w/ RSC)
- Vite
- Typescript
- CSS module

## 그라운드 룰

### 커밋 컨벤션

- feat: 새로운 기능 개발
- refactor: 코드 리팩터링
- docs: 문서 수정
- fix: 버그 수정
- chore: 사소한 작업
- test: 테스트 코드

## 기능 요구 사항

기능 우선순위: 상 / 중 / 하

- 상) 할일을 입력하고 등록이 되면 TODO가 등록된다
- 상) 등록된 TODO는 삭제할 수 있다.
- 상) 등록된 TODO에 완료표시를 하면 취소선으로 완료 표시를 보여준다
- 중) 등록된 TODO는 수정할 수 있다.
  - TODO를 누르면 input으로 바뀌고 `확인`이나 `enter`를 클릭하면 수정된다
  - 수정 단계에서 취소를 누르면 입력된 값이 원래대로 돌아온다
- 하) `localStorage` 에 TODO를 저장한다
