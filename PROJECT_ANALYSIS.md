# leelog Project Analysis

## 목적

`leelog`는 `https://leelog.dafnelee.com`에서 운영하는 한국어 수동 작성 블로그다. `notes-blog`의 구조를 바탕으로 만들었으며, 글은 자동화 없이 사람이 직접 `_drafts`와 `_posts`에 작성한다.

이 레포의 핵심은 `Topics` 탭과 좌측 LNB 메뉴다. LNB 메뉴는 `_data/lnb_menu.yml`에서 관리하고, 각 메뉴 항목은 `topics/**/index.md` 페이지와 게시글 front matter의 `categories` 값으로 연결된다.

## 현재 상태

- 기반: Jekyll Chirpy 7.1.1
- 언어/시간대: `ko-KR`, `Asia/Seoul`
- 도메인: `leelog.dafnelee.com`
- 글 URL: `/topics/:categories/:title/`
- 작성자: `dafnelee`
- 자동화 runtime: 없음
- LNB 메뉴 데이터: `_data/lnb_menu.yml`
- LNB 페이지: `_tabs/topics.md`, `topics/**/index.md`

## 핵심 파일

| 경로 | 역할 |
| --- | --- |
| `_config.yml` | 사이트 제목, 도메인, 작성자, permalink 설정 |
| `_data/lnb_menu.yml` | Topics 좌측 LNB 메뉴의 상위/하위 항목 데이터 |
| `_tabs/topics.md` | Topics 탭 진입 페이지, LNB 메뉴 전체 표시 |
| `topics/<topic>/index.md` | 상위 LNB 메뉴의 목록 페이지 |
| `topics/<topic>/<subtopic>/index.md` | 하위 LNB 메뉴의 목록 페이지 |
| `_layouts/topic.html` | 토픽별 게시글 목록 레이아웃 |
| `_includes/lnb-menu.html` | LNB 트리 렌더링 |
| `_includes/sidebar.html` | Topics 화면에서 LNB를 붙이는 사이드바 |
| `_posts/*.md` | 발행 글, `categories`가 LNB 메뉴와 연결됨 |
| `_drafts/*.md` | 작성 중인 글 |

## 현재 LNB 메뉴 구조

| 상위 메뉴 | slug | 하위 메뉴 |
| --- | --- | --- |
| 일상 | `daily` | `record`, `thought`, `spend` |
| 공부 | `study` | `dev`, `english`, `reading` |
| 리뷰 | `review` | `book`, `product`, `place` |
| 레시피 | `recipe` | `korean`, `simple`, `lunchbox` |

게시글의 `categories`는 반드시 LNB 메뉴의 `category`와 맞춰야 한다.

예:

```yaml
categories: [daily, record]
```

위 글은 다음 위치와 연결된다.

- LNB 메뉴: `일상 > 기록`
- 목록 페이지: `/topics/daily/record/`
- 글 URL 예시: `/topics/daily/record/my-post-slug/`

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

| 구분 | `leelog` | `info-blog`/`tech-blog` |
| --- | --- | --- |
| 글 생성 | 사람이 직접 작성 | 자동화 초안 생성 가능 |
| 핵심 구조 | Topics LNB 메뉴 | 기본 post/category/tag 중심 |
| 후보 이슈/`pick` 댓글 | 없음 | 있을 수 있음 |
| URL 구조 | `/topics/<topic>/<subtopic>/<slug>/` | 블로그별 설정에 따름 |
| OpenAI API key | 사용하지 않음 | 자동화 레포에서만 사용 |

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
