### 사용한 스킬은 아래와 같습니다.

[![My Skills](https://skillicons.dev/icons?i=nuxtjs,vue,ts,html,sass,firebase,wasm,vscode,vim,github,git)](https://skillicons.dev)


# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
# dewdew_v2
## 셋업이 진행 안될 경우 조치사항
```
yarn.lock, node_modules 삭제, .nuxt 삭제, yarn 캐시클린 진행 
-> yarn or yarn install 진행
```
```
rm -rf node_modules
rm -rf yarn.lock
rm -rf .nuxt
yarn cache clean
yarn install
```