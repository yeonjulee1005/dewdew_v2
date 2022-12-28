## 안녕하세요. FE 개발자 이연주 입니다.

## 사용한 스킬은 아래와 같습니다.

[![My Skills](https://skillicons.dev/icons?i=nuxtjs,vue,ts,html,sass,firebase,wasm,vscode,vim,github,git)](https://skillicons.dev)


## 사용한 모듈은 아래와 같습니다.

1. Element-Plus
2. Sass
3. Pinia
4. VueUse(hosting/analytics)
5. Firebase
6. Tiptap
7. Vue-gtag
8. Iconfy

___

## 기능

- #### 메인페이지
> 자기소개 및 작업물 소개, 연락방법 등을 간단히 표현

- #### 블로그
> 블로그 리스트목록, 블로그 글 읽기, 블로그 좋아요 누르기, 블로그 작현,
> 댓글 달기, 댓글 삭제 기능구현

- #### 프로젝트
> 토이토이한 프로젝트 들을 넣어놓는 공간
> (실제 서비스 제작시 필요로 하는 기능을 지속적으로 넣을 예정)

- #### 아카이브
> 사진 기록을 담아두는 공간
> (이미지 슬라이더 활용)

___

## 기본 셋업 방법

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn generate
```

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