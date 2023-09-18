
## 기본 셋업 방법

## Setup

Make sure to install the dependencies:

```bash
# bun
bun install
```

## Development Server

```bash
bun dev
```

## Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun preview
```

## 셋업이 진행 안될 경우 조치사항
```
bun.lockb, node_modules 삭제, .nuxt 삭제 
-> bun install 진행
```
```
rm -rf node_modules
rm -rf yarn.lock
rm -rf .nuxt
bun pm cache rm
bun install
```

## Supabase Cli 셋업
```
패키지 설치
```
> `bun add supabase@`

```
로그인 및 토큰 확인 url
https://supabase.com/dashboard/account/tokens
```
> `bun supabase:login`

```
Typescript 자동생성
```
> `bun supabase gen types typescript --project-id "PROJECT Reference ID" --schema public > types/supabase.ts`


## Nuxt 패키지 정보확인
> `npx nuxi info`

## Code-Server 포트 설정방법(devTool 내 vscode 실행방법)
> `PORT=3080 code-server`

## Code-Server 설치 방법
> `brew install code-server` 및 하단 링크 참조
> [참조링크1:vscode server](https://code.visualstudio.com/docs/remote/vscode-server)
> [참조링크2:tunnels](https://code.visualstudio.com/docs/remote/tunnels#_using-the-vs-code-ui)

## Nuxt3 Edge Channel 설정법
> `package.json` 내에 `"nuxt": "npm:nuxt3@latest"` 처리
