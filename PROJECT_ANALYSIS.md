# leelog Project Analysis

## 목적

`leelog`는 `https://log.dafnelee.com`에서 운영하는 한국어 수동 작성 블로그다. `notes-blog`의 구조를 바탕으로 만들었으며, 글은 자동화 없이 사람이 직접 `_drafts`와 `_posts`에 작성한다.

이 레포의 핵심은 `Topics` 탭과 좌측 LNB 메뉴다. LNB 메뉴는 `_data/lnb_menu.yml`에서 관리하고, 각 메뉴 항목은 `topics/**/index.md` 페이지와 게시글 front matter의 `categories` 값으로 연결된다.

## 현재 상태

- 기반: Jekyll Chirpy 7.1.1
- 언어/시간대: `ko-KR`, `Asia/Seoul`
- 도메인: `log.dafnelee.com`
- 글 URL: `/topics/:categories/:title/`
- 작성자: `dafnelee`
- 자동화 runtime: 없음
- LNB 메뉴 데이터: `_data/lnb_menu.yml`
- LNB 페이지: `_tabs/topics.md`, `topics/**/index.md`

## 핵심 파일

| 경로                                 | 역할                                         |
| ------------------------------------ | -------------------------------------------- |
| `_config.yml`                        | 사이트 제목, 도메인, 작성자, permalink 설정  |
| `_data/lnb_menu.yml`                 | Topics 좌측 LNB 메뉴의 상위/하위 항목 데이터 |
| `_tabs/topics.md`                    | Topics 탭 진입 페이지, LNB 메뉴 전체 표시    |
| `topics/<topic>/index.md`            | 상위 LNB 메뉴의 목록 페이지                  |
| `topics/<topic>/<subtopic>/index.md` | 하위 LNB 메뉴의 목록 페이지                  |
| `_layouts/topic.html`                | 토픽별 게시글 목록 레이아웃                  |
| `_includes/lnb-menu.html`            | LNB 트리 렌더링                              |
| `_includes/sidebar.html`             | Topics 화면에서 LNB를 붙이는 사이드바        |
| `_posts/*.md`                        | 발행 글, `categories`가 LNB 메뉴와 연결됨    |
| `_drafts/*.md`                       | 작성 중인 글                                 |

## 현재 LNB 메뉴 구조

| 상위 메뉴 | slug     | 하위 메뉴                      |
| --------- | -------- | ------------------------------ |
| 일상      | `daily`  | `record`, `thought`, `spend`   |
| 공부      | `study`  | `dev`, `english`, `reading`    |
| 리뷰      | `review` | `book`, `product`, `place`     |
| 레시피    | `recipe` | `korean`, `simple`, `lunchbox` |

게시글의 `categories`는 반드시 LNB 메뉴의 `category`와 맞춰야 한다.

예:

```yaml
categories: [daily, record]
```

위 글은 다음 위치와 연결된다.

- LNB 메뉴: `일상 > 기록`
- 목록 페이지: `/topics/daily/record/`
- 글 URL 예시: `/topics/daily/record/my-post-slug/`

## 초보자용 LNB 카테고리 작업 가이드

이 블로그의 LNB 카테고리는 2단계 구조다.

```text
1단계 카테고리: 일상
2단계 카테고리: 기록
```

파일에서는 한글 이름 대신 영어 slug를 쓴다.

```text
1단계 카테고리 slug: daily
2단계 카테고리 slug: record
```

게시글에서는 두 값을 `categories`에 함께 적는다.

```yaml
categories: [daily, record]
```

즉, LNB 메뉴 한 줄은 아래 세 가지가 맞아야 정상 동작한다.

| 화면 이름   | slug             | 글 categories     |
| ----------- | ---------------- | ----------------- |
| 일상 > 기록 | `daily > record` | `[daily, record]` |
| 공부 > 개발 | `study > dev`    | `[study, dev]`    |
| 리뷰 > 책   | `review > book`  | `[review, book]`  |

### 작업 전 반드시 확인할 파일

LNB 카테고리를 바꾸기 전에는 이 네 가지를 먼저 확인한다.

```bash
sed -n '1,220p' _data/lnb_menu.yml
find topics -type f | sort
rg "categories:" _posts _drafts
```

역할은 다음과 같다.

| 파일/폴더                         | 무엇을 확인하는가                      |
| --------------------------------- | -------------------------------------- |
| `_data/lnb_menu.yml`              | 좌측 LNB 메뉴에 보이는 이름, 순서, URL |
| `topics/<1단계>/index.md`         | 1단계 카테고리 페이지                  |
| `topics/<1단계>/<2단계>/index.md` | 2단계 카테고리 페이지                  |
| `_posts`, `_drafts`               | 글이 어떤 `categories`를 쓰는지        |

### 1단계 카테고리 추가 예시

목표: LNB에 새 1단계 카테고리 `운동`을 추가한다.

완성 구조:

```text
운동
  - 헬스
  - 러닝
```

영어 slug는 다음처럼 정한다.

| 이름 | slug      |
| ---- | --------- |
| 운동 | `workout` |
| 헬스 | `gym`     |
| 러닝 | `running` |

#### 1. `_data/lnb_menu.yml`에 1단계 블록 추가

파일 맨 아래에 아래 내용을 붙인다.

```yaml
- title: 운동
  icon: fas fa-dumbbell
  slug: workout
  url: /topics/workout/
  open: false
  children:
    - title: 헬스
      slug: gym
      url: /topics/workout/gym/
      category: [workout, gym]
    - title: 러닝
      slug: running
      url: /topics/workout/running/
      category: [workout, running]
```

각 줄의 뜻:

| 항목                       | 뜻                            |
| -------------------------- | ----------------------------- |
| `title: 운동`              | 화면에 보이는 한글 이름       |
| `icon: fas fa-dumbbell`    | LNB 아이콘                    |
| `slug: workout`            | 1단계 카테고리 영어 이름      |
| `url: /topics/workout/`    | 1단계 페이지 주소             |
| `open: false`              | 처음 화면에서 접힌 상태       |
| `children`                 | 2단계 카테고리 목록           |
| `category: [workout, gym]` | 글 front matter와 연결되는 값 |

#### 2. 1단계 페이지 만들기

새 파일을 만든다.

```text
topics/workout/index.md
```

내용:

```yaml
---
layout: topic
title: 운동
topic: workout
subtopics:
  - title: 헬스
    url: /topics/workout/gym/
  - title: 러닝
    url: /topics/workout/running/
---
```

#### 3. 2단계 페이지 만들기

새 파일을 만든다.

```text
topics/workout/gym/index.md
```

내용:

```yaml
---
layout: topic
title: 헬스
topic: workout
subtopic: gym
---
```

새 파일을 만든다.

```text
topics/workout/running/index.md
```

내용:

```yaml
---
layout: topic
title: 러닝
topic: workout
subtopic: running
---
```

#### 4. 새 카테고리에 글 쓰기

헬스 글:

```yaml
---
title: "하체 운동 기록"
slug: "leg-day-record"
date: 2026-07-26 10:00:00 +0900
categories: [workout, gym]
tags: [운동, 헬스, 기록]
description: "하체 운동 루틴과 느낀 점을 정리한 기록."
---
```

러닝 글:

```yaml
---
title: "아침 러닝 기록"
slug: "morning-running-record"
date: 2026-07-26 10:00:00 +0900
categories: [workout, running]
tags: [운동, 러닝, 기록]
description: "아침 러닝 거리와 컨디션을 정리한 기록."
---
```

#### 5. 추가 후 확인

```bash
rg "workout|/topics/workout" _data topics _posts _drafts
find topics/workout -type f | sort
```

### 1단계 카테고리 수정 예시

1단계 카테고리 수정은 두 종류가 있다.

| 수정 종류   | 예시                          | URL 변경 |
| ----------- | ----------------------------- | -------- |
| 이름만 수정 | `공부`를 `스터디`로 변경      | 안 바뀜  |
| slug 수정   | `study`를 `learning`으로 변경 | 바뀜     |

초보자에게는 이름만 수정하는 방법을 권장한다. slug를 바꾸면 기존 글 URL도 바뀐다.

#### 예시 A: 1단계 이름만 수정

목표: `공부`를 화면에서 `스터디`로 보이게 한다. URL은 `/topics/study/` 그대로 둔다.

수정 파일:

```text
_data/lnb_menu.yml
topics/study/index.md
```

`_data/lnb_menu.yml`에서 변경 전:

```yaml
- title: 공부
  icon: fas fa-book-open
  slug: study
  url: /topics/study/
```

변경 후:

```yaml
- title: 스터디
  icon: fas fa-book-open
  slug: study
  url: /topics/study/
```

`topics/study/index.md`에서 변경 전:

```yaml
---
layout: topic
title: 공부
topic: study
subtopics:
```

변경 후:

```yaml
---
layout: topic
title: 스터디
topic: study
subtopics:
```

글의 `categories: [study, dev]`는 바꾸지 않는다.

#### 예시 B: 1단계 slug까지 수정

목표: `study`를 `learning`으로 바꾼다.

변경 결과:

```text
변경 전 URL: /topics/study/dev/my-post/
변경 후 URL: /topics/learning/dev/my-post/
```

수정 파일:

```text
_data/lnb_menu.yml
topics/study/index.md
topics/study/dev/index.md
topics/study/english/index.md
topics/study/reading/index.md
_posts/*.md
_drafts/*.md
```

#### 1. `_data/lnb_menu.yml` 수정

변경 전:

```yaml
- title: 공부
  icon: fas fa-book-open
  slug: study
  url: /topics/study/
  open: false
  children:
    - title: 개발
      slug: dev
      url: /topics/study/dev/
      category: [study, dev]
```

변경 후:

```yaml
- title: 공부
  icon: fas fa-book-open
  slug: learning
  url: /topics/learning/
  open: false
  children:
    - title: 개발
      slug: dev
      url: /topics/learning/dev/
      category: [learning, dev]
```

`english`, `reading`도 같은 방식으로 바꾼다.

```yaml
- title: 영어
  slug: english
  url: /topics/learning/english/
  category: [learning, english]
- title: 독서
  slug: reading
  url: /topics/learning/reading/
  category: [learning, reading]
```

#### 2. topic 폴더 이름 변경

변경 전:

```text
topics/study/
```

변경 후:

```text
topics/learning/
```

Git을 쓰고 있다면 다음처럼 이동한다.

```bash
git mv topics/study topics/learning
```

#### 3. `topics/learning/index.md` 수정

변경 전:

```yaml
---
layout: topic
title: 공부
topic: study
subtopics:
  - title: 개발
    url: /topics/study/dev/
```

변경 후:

```yaml
---
layout: topic
title: 공부
topic: learning
subtopics:
  - title: 개발
    url: /topics/learning/dev/
```

`영어`, `독서` URL도 `/topics/learning/.../`으로 바꾼다.

#### 4. 하위 페이지의 `topic` 수정

예: `topics/learning/dev/index.md`

변경 전:

```yaml
---
layout: topic
title: 개발
topic: study
subtopic: dev
---
```

변경 후:

```yaml
---
layout: topic
title: 개발
topic: learning
subtopic: dev
---
```

`english`, `reading` 페이지도 같은 방식으로 `topic: learning`으로 바꾼다.

#### 5. 기존 글 categories 수정

검색:

```bash
rg "categories: \\[study," _posts _drafts
```

변경 전:

```yaml
categories: [study, dev]
```

변경 후:

```yaml
categories: [learning, dev]
```

#### 6. 수정 후 확인

```bash
rg "study|/topics/study" _data topics _posts _drafts
rg "learning|/topics/learning" _data topics _posts _drafts
```

첫 번째 검색은 의도치 않은 남은 값이 없는지 보는 용도다.

### 1단계 카테고리 삭제 예시

목표: 1단계 카테고리 `레시피`를 삭제한다.

삭제 대상:

```text
레시피
  - 한식
  - 간단요리
  - 도시락
```

영어 slug:

```text
recipe
recipe > korean
recipe > simple
recipe > lunchbox
```

#### 1. 삭제 전에 기존 글 검색

```bash
rg "categories: \\[recipe," _posts _drafts
```

검색 결과가 있으면 먼저 글을 다른 카테고리로 옮긴다.

예를 들어 `레시피 > 한식` 글을 `일상 > 기록`으로 옮기려면:

변경 전:

```yaml
categories: [recipe, korean]
```

변경 후:

```yaml
categories: [daily, record]
```

이때 글 URL도 바뀐다.

```text
변경 전: /topics/recipe/korean/post-slug/
변경 후: /topics/daily/record/post-slug/
```

#### 2. `_data/lnb_menu.yml`에서 1단계 블록 삭제

아래 전체 블록을 삭제한다.

```yaml
- title: 레시피
  icon: fas fa-utensils
  slug: recipe
  url: /topics/recipe/
  open: false
  children:
    - title: 한식
      slug: korean
      url: /topics/recipe/korean/
      category: [recipe, korean]
    - title: 간단요리
      slug: simple
      url: /topics/recipe/simple/
      category: [recipe, simple]
    - title: 도시락
      slug: lunchbox
      url: /topics/recipe/lunchbox/
      category: [recipe, lunchbox]
```

#### 3. topic 폴더 삭제

삭제할 폴더:

```text
topics/recipe/
```

Git을 쓰고 있다면:

```bash
git rm -r topics/recipe
```

#### 4. 삭제 후 확인

```bash
rg "recipe|/topics/recipe" _data topics _posts _drafts
```

검색 결과가 없어야 한다. 단, 본문에서 일반 단어로 쓴 `레시피`는 남아 있어도 괜찮다.

### 2단계 카테고리 추가 예시

목표: `일상` 아래에 2단계 카테고리 `여행`을 추가한다.

완성 구조:

```text
일상
  - 기록
  - 생각
  - 소비
  - 여행
```

slug:

```text
daily > travel
```

#### 1. `_data/lnb_menu.yml`에 child 추가

`daily` 그룹의 `children` 맨 아래에 추가한다.

```yaml
- title: 여행
  slug: travel
  url: /topics/daily/travel/
  category: [daily, travel]
```

주의: 들여쓰기는 기존 `기록`, `생각`, `소비`와 정확히 같아야 한다.

#### 2. `topics/daily/index.md`에 링크 추가

변경 전:

```yaml
subtopics:
  - title: 기록
    url: /topics/daily/record/
  - title: 생각
    url: /topics/daily/thought/
  - title: 소비
    url: /topics/daily/spend/
```

변경 후:

```yaml
subtopics:
  - title: 기록
    url: /topics/daily/record/
  - title: 생각
    url: /topics/daily/thought/
  - title: 소비
    url: /topics/daily/spend/
  - title: 여행
    url: /topics/daily/travel/
```

#### 3. 2단계 페이지 생성

새 파일:

```text
topics/daily/travel/index.md
```

내용:

```yaml
---
layout: topic
title: 여행
topic: daily
subtopic: travel
---
```

#### 4. 글에서 사용

```yaml
categories: [daily, travel]
```

#### 5. 추가 후 확인

```bash
rg "travel|/topics/daily/travel" _data topics _posts _drafts
find topics/daily -maxdepth 2 -type f | sort
```

### 2단계 카테고리 수정 예시

2단계 카테고리도 이름만 바꾸는 경우와 slug를 바꾸는 경우가 다르다.

| 수정 종류   | 예시                       | URL 변경 |
| ----------- | -------------------------- | -------- |
| 이름만 수정 | `소비`를 `지출`로 변경     | 안 바뀜  |
| slug 수정   | `spend`를 `expense`로 변경 | 바뀜     |

#### 예시 A: 2단계 이름만 수정

목표: `일상 > 소비`를 화면에서 `일상 > 지출`로 보이게 한다. URL은 `/topics/daily/spend/` 그대로 둔다.

수정 파일:

```text
_data/lnb_menu.yml
topics/daily/index.md
topics/daily/spend/index.md
```

`_data/lnb_menu.yml` 변경 전:

```yaml
- title: 소비
  slug: spend
  url: /topics/daily/spend/
  category: [daily, spend]
```

변경 후:

```yaml
- title: 지출
  slug: spend
  url: /topics/daily/spend/
  category: [daily, spend]
```

`topics/daily/index.md` 변경 전:

```yaml
- title: 소비
  url: /topics/daily/spend/
```

변경 후:

```yaml
- title: 지출
  url: /topics/daily/spend/
```

`topics/daily/spend/index.md` 변경 전:

```yaml
---
layout: topic
title: 소비
topic: daily
subtopic: spend
---
```

변경 후:

```yaml
---
layout: topic
title: 지출
topic: daily
subtopic: spend
---
```

글의 `categories: [daily, spend]`는 바꾸지 않는다.

#### 예시 B: 2단계 slug까지 수정

목표: `daily > spend`를 `daily > expense`로 바꾼다.

변경 결과:

```text
변경 전 URL: /topics/daily/spend/my-post/
변경 후 URL: /topics/daily/expense/my-post/
```

#### 1. `_data/lnb_menu.yml` 수정

변경 전:

```yaml
- title: 소비
  slug: spend
  url: /topics/daily/spend/
  category: [daily, spend]
```

변경 후:

```yaml
- title: 소비
  slug: expense
  url: /topics/daily/expense/
  category: [daily, expense]
```

#### 2. `topics/daily/index.md` 수정

변경 전:

```yaml
- title: 소비
  url: /topics/daily/spend/
```

변경 후:

```yaml
- title: 소비
  url: /topics/daily/expense/
```

#### 3. 폴더 이름 변경

변경 전:

```text
topics/daily/spend/
```

변경 후:

```text
topics/daily/expense/
```

Git을 쓰고 있다면:

```bash
git mv topics/daily/spend topics/daily/expense
```

#### 4. 하위 페이지 내용 수정

파일:

```text
topics/daily/expense/index.md
```

변경 전:

```yaml
---
layout: topic
title: 소비
topic: daily
subtopic: spend
---
```

변경 후:

```yaml
---
layout: topic
title: 소비
topic: daily
subtopic: expense
---
```

#### 5. 기존 글 categories 수정

검색:

```bash
rg "categories: \\[daily, spend\\]" _posts _drafts
```

변경 전:

```yaml
categories: [daily, spend]
```

변경 후:

```yaml
categories: [daily, expense]
```

#### 6. 수정 후 확인

```bash
rg "daily, spend|/topics/daily/spend|subtopic: spend" _data topics _posts _drafts
rg "daily, expense|/topics/daily/expense|subtopic: expense" _data topics _posts _drafts
```

### 2단계 카테고리 삭제 예시

목표: `일상 > 소비`를 삭제한다.

삭제 대상:

```text
daily > spend
topics/daily/spend/index.md
```

#### 1. 삭제 전에 기존 글 검색

```bash
rg "categories: \\[daily, spend\\]" _posts _drafts
```

검색 결과가 있으면 글을 다른 2단계 카테고리로 옮긴다.

예를 들어 `일상 > 소비` 글을 `일상 > 기록`으로 옮긴다.

변경 전:

```yaml
categories: [daily, spend]
```

변경 후:

```yaml
categories: [daily, record]
```

URL도 바뀐다.

```text
변경 전: /topics/daily/spend/post-slug/
변경 후: /topics/daily/record/post-slug/
```

#### 2. `_data/lnb_menu.yml`에서 child 삭제

아래 블록만 삭제한다.

```yaml
- title: 소비
  slug: spend
  url: /topics/daily/spend/
  category: [daily, spend]
```

상위 `일상` 블록 전체를 지우면 안 된다.

#### 3. `topics/daily/index.md`에서 subtopic 링크 삭제

아래 두 줄을 삭제한다.

```yaml
- title: 소비
  url: /topics/daily/spend/
```

#### 4. 2단계 페이지 삭제

삭제할 파일:

```text
topics/daily/spend/index.md
```

Git을 쓰고 있다면:

```bash
git rm -r topics/daily/spend
```

#### 5. 삭제 후 확인

```bash
rg "daily, spend|/topics/daily/spend|subtopic: spend" _data topics _posts _drafts
```

검색 결과가 없어야 한다.

## LNB 메뉴 추가 방법

LNB 메뉴를 추가할 때는 보통 세 군데를 함께 수정한다.

1. `_data/lnb_menu.yml`
2. `topics/<topic>/index.md`
3. `topics/<topic>/<subtopic>/index.md`

이미 발행할 글이 있다면 `_posts/*.md`의 `categories`도 새 값으로 맞춘다.

### 예시 1: 기존 상위 메뉴에 하위 메뉴 추가

목표: `일상` 아래에 `여행` 메뉴를 추가한다.

추가 후 구조:

```text
일상
  - 기록
  - 생각
  - 소비
  - 여행
```

#### 1. `_data/lnb_menu.yml` 수정

`daily` 그룹의 `children` 아래에 `travel`을 추가한다.

```yaml
- title: 일상
  icon: fas fa-seedling
  slug: daily
  url: /topics/daily/
  open: true
  children:
    - title: 기록
      slug: record
      url: /topics/daily/record/
      category: [daily, record]
    - title: 생각
      slug: thought
      url: /topics/daily/thought/
      category: [daily, thought]
    - title: 소비
      slug: spend
      url: /topics/daily/spend/
      category: [daily, spend]
    - title: 여행
      slug: travel
      url: /topics/daily/travel/
      category: [daily, travel]
```

#### 2. 상위 페이지 `topics/daily/index.md` 수정

`subtopics`에 여행 링크를 추가한다.

```yaml
---
layout: topic
title: 일상
topic: daily
subtopics:
  - title: 기록
    url: /topics/daily/record/
  - title: 생각
    url: /topics/daily/thought/
  - title: 소비
    url: /topics/daily/spend/
  - title: 여행
    url: /topics/daily/travel/
---
```

#### 3. 하위 페이지 생성

새 파일을 만든다.

```text
topics/daily/travel/index.md
```

파일 내용:

```yaml
---
layout: topic
title: 여행
topic: daily
subtopic: travel
---
```

#### 4. 글 front matter 작성

여행 글은 다음처럼 작성한다.

```yaml
---
title: "부산 1박 2일 기록"
slug: "busan-weekend-trip"
date: 2026-07-26 10:00:00 +0900
categories: [daily, travel]
tags: [여행, 부산, 일상]
description: "부산 1박 2일 여행에서 남기고 싶은 장면과 동선을 기록한 글."
---
```

### 예시 2: 새 상위 메뉴 추가

목표: `운동` 상위 메뉴를 추가하고, 하위 메뉴로 `헬스`, `러닝`을 둔다.

추가 후 구조:

```text
운동
  - 헬스
  - 러닝
```

#### 1. `_data/lnb_menu.yml`에 상위 메뉴 추가

파일 맨 아래에 새 그룹을 추가한다.

```yaml
- title: 운동
  icon: fas fa-dumbbell
  slug: workout
  url: /topics/workout/
  open: false
  children:
    - title: 헬스
      slug: gym
      url: /topics/workout/gym/
      category: [workout, gym]
    - title: 러닝
      slug: running
      url: /topics/workout/running/
      category: [workout, running]
```

아이콘은 Font Awesome class를 사용한다. 기존 메뉴와 같은 형식으로 `fas fa-...` 값을 넣으면 된다.

#### 2. 상위 페이지 생성

새 파일:

```text
topics/workout/index.md
```

내용:

```yaml
---
layout: topic
title: 운동
topic: workout
subtopics:
  - title: 헬스
    url: /topics/workout/gym/
  - title: 러닝
    url: /topics/workout/running/
---
```

#### 3. 하위 페이지 생성

새 파일:

```text
topics/workout/gym/index.md
```

내용:

```yaml
---
layout: topic
title: 헬스
topic: workout
subtopic: gym
---
```

새 파일:

```text
topics/workout/running/index.md
```

내용:

```yaml
---
layout: topic
title: 러닝
topic: workout
subtopic: running
---
```

#### 4. 글 front matter 작성

헬스 글:

```yaml
categories: [workout, gym]
```

러닝 글:

```yaml
categories: [workout, running]
```

## LNB 메뉴 삭제 방법

LNB 메뉴를 삭제할 때는 메뉴 파일만 지우면 안 된다. 연결된 topic 페이지와 기존 게시글의 `categories`까지 확인해야 한다.

삭제 전 확인할 것:

1. 삭제할 메뉴의 `slug`와 `category` 값
2. 해당 category를 쓰는 `_posts` 글
3. 삭제할 `topics/**/index.md` 페이지
4. 삭제 후 글을 이동할 새 LNB 메뉴

### 예시 1: 하위 메뉴 삭제

목표: `일상 > 소비` 메뉴를 삭제한다.

삭제 대상:

- 메뉴 데이터: `category: [daily, spend]`
- 페이지: `topics/daily/spend/index.md`
- 기존 글: `categories: [daily, spend]`를 가진 글

#### 1. 기존 글 검색

```bash
rg "categories: \\[daily, spend\\]" _posts _drafts
```

검색 결과가 있다면 글을 다른 메뉴로 이동한다.

예를 들어 `소비` 글을 `일상 > 기록`으로 합치려면:

```yaml
categories: [daily, spend]
```

를 다음처럼 바꾼다.

```yaml
categories: [daily, record]
```

URL도 함께 바뀐다.

변경 전:

```text
/topics/daily/spend/example-slug/
```

변경 후:

```text
/topics/daily/record/example-slug/
```

검색 유입이 있는 글이라면 redirect를 따로 둘지 검토해야 한다.

#### 2. `_data/lnb_menu.yml`에서 하위 메뉴 삭제

삭제 전:

```yaml
- title: 소비
  slug: spend
  url: /topics/daily/spend/
  category: [daily, spend]
```

삭제 후에는 해당 블록을 완전히 제거한다.

#### 3. 상위 페이지 `topics/daily/index.md` 수정

`subtopics`에서도 `소비` 링크를 제거한다.

삭제 전:

```yaml
- title: 소비
  url: /topics/daily/spend/
```

삭제 후에는 해당 두 줄을 제거한다.

#### 4. 하위 페이지 삭제

삭제할 파일:

```text
topics/daily/spend/index.md
```

#### 5. 삭제 후 확인

다음 검색 결과가 없어야 한다.

```bash
rg "daily, spend|/topics/daily/spend|subtopic: spend" _data topics _posts _drafts
```

### 예시 2: 상위 메뉴 전체 삭제

목표: `레시피` 메뉴 전체를 삭제한다.

삭제 대상:

- 메뉴 데이터: `slug: recipe`
- 페이지: `topics/recipe/index.md`
- 하위 페이지:
  - `topics/recipe/korean/index.md`
  - `topics/recipe/simple/index.md`
  - `topics/recipe/lunchbox/index.md`
- 기존 글:
  - `categories: [recipe, korean]`
  - `categories: [recipe, simple]`
  - `categories: [recipe, lunchbox]`

#### 1. 기존 글 검색

```bash
rg "categories: \\[recipe," _posts _drafts
```

기존 글이 있으면 삭제 전에 새 위치를 정한다.

예를 들어 레시피 글을 `일상 > 기록`으로 이동하려면:

```yaml
categories: [recipe, korean]
```

를 다음처럼 바꾼다.

```yaml
categories: [daily, record]
```

#### 2. `_data/lnb_menu.yml`에서 상위 그룹 삭제

다음 전체 블록을 제거한다.

```yaml
- title: 레시피
  icon: fas fa-utensils
  slug: recipe
  url: /topics/recipe/
  open: false
  children:
    - title: 한식
      slug: korean
      url: /topics/recipe/korean/
      category: [recipe, korean]
    - title: 간단요리
      slug: simple
      url: /topics/recipe/simple/
      category: [recipe, simple]
    - title: 도시락
      slug: lunchbox
      url: /topics/recipe/lunchbox/
      category: [recipe, lunchbox]
```

#### 3. topic 페이지 삭제

삭제할 파일:

```text
topics/recipe/index.md
topics/recipe/korean/index.md
topics/recipe/simple/index.md
topics/recipe/lunchbox/index.md
```

#### 4. 삭제 후 확인

다음 검색 결과가 없어야 한다.

```bash
rg "recipe|/topics/recipe" _data topics _posts _drafts
```

단, 본문에서 음식이나 레시피라는 일반 단어로 쓴 경우는 남아 있어도 괜찮다. 중요한 것은 front matter의 `categories`, LNB 데이터, topic 페이지 경로다.

## LNB 메뉴 이름만 바꾸는 방법

화면에 보이는 한글 이름만 바꾸고 URL은 유지하려면 `title`만 바꾸면 된다.

예: `공부 > 개발`을 `공부 > 개발노트`로 표시

`_data/lnb_menu.yml`:

```yaml
- title: 개발노트
  slug: dev
  url: /topics/study/dev/
  category: [study, dev]
```

`topics/study/dev/index.md`:

```yaml
---
layout: topic
title: 개발노트
topic: study
subtopic: dev
---
```

이 경우 기존 글의 `categories: [study, dev]`와 URL은 바뀌지 않는다.

## LNB 메뉴 slug를 바꾸는 방법

slug를 바꾸면 URL과 글 category가 같이 바뀐다. 가장 영향이 크므로 신중하게 처리한다.

예: `study > dev`를 `study > programming`으로 변경

수정할 곳:

1. `_data/lnb_menu.yml`
2. `topics/study/index.md`
3. `topics/study/dev/index.md`를 `topics/study/programming/index.md`로 이동
4. `_posts`와 `_drafts`의 `categories: [study, dev]`를 `categories: [study, programming]`으로 변경

변경 전:

```yaml
- title: 개발
  slug: dev
  url: /topics/study/dev/
  category: [study, dev]
```

변경 후:

```yaml
- title: 개발
  slug: programming
  url: /topics/study/programming/
  category: [study, programming]
```

게시글:

```yaml
categories: [study, programming]
```

기존 URL `/topics/study/dev/<slug>/`는 새 URL `/topics/study/programming/<slug>/`로 바뀐다. 이미 배포된 글이라면 검색엔진과 외부 링크를 위해 redirect 정책을 별도로 정한다.

## 글 작성 규칙

초안은 `_drafts/YYYY-MM-DD-english-slug.md`로 작성하고, 발행 시 `_posts/YYYY-MM-DD-english-slug.md`로 이동한다.

기본 front matter:

```yaml
---
title: "기록 예시 글"
slug: "daily-record-example"
date: 2026-07-26 10:00:00 +0900
categories: [daily, record]
tags: [daily, record, personal-note]
image:
  path: /assets/img/posts/blog/daily-record-example/cover.webp
  alt: "이미지 대체 텍스트"
description: "검색 결과와 공유 카드에 표시할 짧은 설명입니다."
---
```

규칙:

- `categories`는 반드시 `_data/lnb_menu.yml`의 `category` 값 중 하나와 맞춘다.
- `slug`는 영어 소문자 kebab-case를 쓴다.
- 대표 이미지는 `assets/img/posts/blog/<slug>/cover.webp`에 둔다.
- `description`은 검색 결과와 공유 카드에 쓰이므로 짧고 구체적으로 쓴다.

## 자동화 블로그와 다른 점

| 구분                  | `leelog`                             | `info-blog`/`tech-blog`     |
| --------------------- | ------------------------------------ | --------------------------- |
| 글 생성               | 사람이 직접 작성                     | 자동화 초안 생성 가능       |
| 핵심 구조             | Topics LNB 메뉴                      | 기본 post/category/tag 중심 |
| 후보 이슈/`pick` 댓글 | 없음                                 | 있을 수 있음                |
| URL 구조              | `/topics/<topic>/<subtopic>/<slug>/` | 블로그별 설정에 따름        |
| OpenAI API key        | 사용하지 않음                        | 자동화 레포에서만 사용      |

## 수정 시 체크리스트

LNB 메뉴 추가/삭제 후에는 아래를 확인한다.

- `_data/lnb_menu.yml`에 YAML 들여쓰기 오류가 없는가
- `topics/<topic>/index.md`의 `subtopics`가 실제 하위 메뉴와 맞는가
- `topics/<topic>/<subtopic>/index.md`가 존재하거나 삭제되었는가
- `_posts`와 `_drafts`의 `categories`가 사라진 메뉴를 가리키지 않는가
- `_config.yml`의 permalink `/topics/:categories/:title/` 구조를 유지하는가
- 삭제한 메뉴의 URL을 기존 글이 사용했다면 redirect 필요 여부를 검토했는가

## 자주 쓰는 검색 명령

특정 LNB category를 쓰는 글 찾기:

```bash
rg "categories: \\[daily, record\\]" _posts _drafts
```

특정 topic URL 참조 찾기:

```bash
rg "/topics/daily/record" _data topics _posts _drafts
```

삭제한 slug가 남아 있는지 확인:

```bash
rg "spend|/topics/daily/spend|subtopic: spend" _data topics _posts _drafts
```

현재 topic 페이지 목록 확인:

```bash
find topics -type f | sort
```

## AI 수정용 요약

`leelog`에서 LNB 메뉴를 수정할 때는 먼저 `_data/lnb_menu.yml`, `topics/**/index.md`, `_tabs/topics.md`, `_layouts/topic.html`, `_includes/lnb-menu.html`을 확인한다. 메뉴 추가/삭제는 `_data/lnb_menu.yml`만 바꾸면 끝나지 않는다. 반드시 topic 페이지와 기존 글의 `categories`까지 함께 맞춘다.
