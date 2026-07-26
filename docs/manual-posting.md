# Manual Posting Guide

이 블로그는 AI 자동 초안 생성 없이 사람이 직접 글을 작성한다. 품질 검증, 썸네일, SEO 구조는 기존 블로그와 같은 Jekyll/Chirpy 흐름을 따른다.

## 새 글 작성

1. `_drafts/YYYY-MM-DD-english-slug.md` 파일을 만든다.
2. 글 검수 후 `_posts/YYYY-MM-DD-english-slug.md`로 이동한다.
3. 대표 이미지는 `assets/img/posts/blog/english-slug/cover.webp`에 둔다.

## Front Matter

```yaml
---
title: "글 제목"
slug: "english-slug"
date: 2026-07-18 10:00:00 +0900
categories: [daily, record]
tags: [일상, 기록, 개인블로그]
image:
  path: /assets/img/posts/blog/english-slug/cover.webp
  alt: "대표 이미지 설명"
description: "검색 결과와 공유 카드에 사용할 짧은 설명."
---
```

## URL과 카테고리 규칙

- 글 URL은 `/topics/:categories/:title/` 형식을 사용한다.
- 1단계 카테고리: `daily`, `study`, `review`, `recipe`
- 2단계 카테고리와 LNB 항목은 `_data/lnb_menu.yml`의 children 값을 사용한다.
- 예: `categories: [daily, record]` + `slug: weekend-note`는 `/topics/daily/record/weekend-note/`로 발행된다.
- 세부 키워드는 `tags`에 둔다.

## LNB 메뉴 추가

`_data/lnb_menu.yml`에 원하는 페이지 경로를 추가한다.

```yaml
- title: 일상
  icon: fas fa-seedling
  slug: daily
  open: true
  children:
    - title: 월간 기록
      slug: monthly
      url: /topics/daily/monthly/
      category: [daily, monthly]
    - title: 여행
      slug: travel
      url: /topics/daily/travel/
      children:
        - title: 국내
          url: /topics/daily/travel/korea/
```

## 검증

```bash
npm run build
bundle exec jekyll b
npm run verify:indexing
```

`verify:indexing`은 배포된 `https://leelog.dafnelee.com` 기준으로 sitemap, feed, robots, canonical, OG 메타데이터를 확인한다.
