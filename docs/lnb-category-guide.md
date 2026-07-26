# LNB 카테고리 관리 가이드

이 문서는 `leelog` 블로그의 `Topics` 좌측 메뉴를 추가, 수정, 삭제하는 방법을 설명한다. 코드를 많이 모르는 사람도 그대로 따라 할 수 있도록 실제 파일 이름과 예시를 함께 적었다.

## 먼저 알아둘 것

`leelog`의 카테고리는 2단계 구조다.

```text
1단계 카테고리: 일상
2단계 카테고리: 기록
```

파일에서는 한글 대신 영어 slug를 쓴다.

```text
1단계 slug: daily
2단계 slug: record
```

글에서는 front matter에 이렇게 쓴다.

```yaml
categories: [daily, record]
```

위 글은 `일상 > 기록`에 들어가고, URL은 다음처럼 만들어진다.

```text
/topics/daily/record/글-slug/
```

## 수정할 때 자주 만지는 파일

| 파일 | 역할 |
| --- | --- |
| `_data/lnb_menu.yml` | 좌측 LNB 메뉴에 보이는 1단계/2단계 메뉴 |
| `topics/<1단계>/index.md` | 1단계 카테고리 페이지 |
| `topics/<1단계>/<2단계>/index.md` | 2단계 카테고리 페이지 |
| `_posts/*.md` | 발행된 글의 `categories` 수정 |
| `_drafts/*.md` | 작성 중인 글의 `categories` 수정 |

현재 기본 구조는 다음과 같다.

```text
일상(daily)
  - 기록(record)
  - 생각(thought)
  - 소비(spend)

공부(study)
  - 개발(dev)
  - 영어(english)
  - 독서(reading)

리뷰(review)
  - 책(book)
  - 제품(product)
  - 장소(place)

레시피(recipe)
  - 한식(korean)
  - 간단요리(simple)
  - 도시락(lunchbox)
```

## 작업 전 확인 명령

터미널에서 `dafnelee89/leelog` 폴더로 이동한 뒤 확인한다.

```bash
sed -n '1,220p' _data/lnb_menu.yml
find topics -type f | sort
rg "categories:" _posts _drafts
```

`rg` 명령이 없다면 VS Code나 편집기 검색으로 `categories:`를 찾아도 된다.

## 1단계 카테고리 추가

목표: 새 1단계 카테고리 `운동`을 추가한다.

완성 구조:

```text
운동(workout)
  - 헬스(gym)
  - 러닝(running)
```

### 1. `_data/lnb_menu.yml`에 메뉴 추가

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

주의할 점:

- `title`은 화면에 보이는 이름이다.
- `slug`는 영어 소문자와 하이픈만 쓰는 것이 좋다.
- `url`은 `/topics/<slug>/` 형식으로 맞춘다.
- `category`는 글의 `categories`와 똑같이 맞춘다.
- 들여쓰기를 기존 메뉴와 똑같이 맞춘다.

### 2. 1단계 페이지 만들기

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

### 3. 2단계 페이지 만들기

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

### 4. 글에서 사용하기

헬스 글:

```yaml
categories: [workout, gym]
```

러닝 글:

```yaml
categories: [workout, running]
```

### 5. 추가 후 확인

```bash
rg "workout|/topics/workout" _data topics _posts _drafts
find topics/workout -type f | sort
```

## 1단계 카테고리 수정

1단계 수정은 두 가지다.

| 작업 | 예시 | URL 변경 |
| --- | --- | --- |
| 이름만 수정 | `공부`를 `스터디`로 변경 | 없음 |
| slug 수정 | `study`를 `learning`으로 변경 | 있음 |

처음에는 이름만 수정하는 것을 추천한다. slug를 바꾸면 기존 글 URL이 바뀐다.

### 1단계 이름만 수정

목표: 화면의 `공부`를 `스터디`로 바꾼다. URL은 `/topics/study/` 그대로 둔다.

수정할 파일:

```text
_data/lnb_menu.yml
topics/study/index.md
```

`_data/lnb_menu.yml` 변경 전:

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

`topics/study/index.md` 변경 전:

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

이 경우 글의 `categories: [study, dev]`는 바꾸지 않는다.

### 1단계 slug 수정

목표: `study`를 `learning`으로 바꾼다.

바뀌는 것:

```text
변경 전: /topics/study/dev/my-post/
변경 후: /topics/learning/dev/my-post/
```

수정할 파일:

```text
_data/lnb_menu.yml
topics/study/index.md
topics/study/dev/index.md
topics/study/english/index.md
topics/study/reading/index.md
_posts/*.md
_drafts/*.md
```

### 1. `_data/lnb_menu.yml` 수정

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
    - title: 영어
      slug: english
      url: /topics/study/english/
      category: [study, english]
    - title: 독서
      slug: reading
      url: /topics/study/reading/
      category: [study, reading]
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
    - title: 영어
      slug: english
      url: /topics/learning/english/
      category: [learning, english]
    - title: 독서
      slug: reading
      url: /topics/learning/reading/
      category: [learning, reading]
```

### 2. 폴더 이름 변경

```bash
git mv topics/study topics/learning
```

### 3. `topics/learning/index.md` 수정

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

### 4. 하위 페이지 수정

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

`english`, `reading` 페이지도 같은 방식으로 바꾼다.

### 5. 글 categories 수정

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

### 6. 수정 후 확인

```bash
rg "study|/topics/study" _data topics _posts _drafts
rg "learning|/topics/learning" _data topics _posts _drafts
```

첫 번째 검색 결과에는 의도치 않은 값이 없어야 한다.

## 1단계 카테고리 삭제

목표: `레시피` 1단계 카테고리를 삭제한다.

삭제 대상:

```text
레시피(recipe)
  - 한식(korean)
  - 간단요리(simple)
  - 도시락(lunchbox)
```

### 1. 삭제 전에 글 검색

```bash
rg "categories: \\[recipe," _posts _drafts
```

검색 결과가 있으면 글을 다른 카테고리로 옮긴다.

변경 전:

```yaml
categories: [recipe, korean]
```

변경 후 예시:

```yaml
categories: [daily, record]
```

URL도 바뀐다.

```text
변경 전: /topics/recipe/korean/post-slug/
변경 후: /topics/daily/record/post-slug/
```

### 2. `_data/lnb_menu.yml`에서 전체 블록 삭제

아래 블록 전체를 삭제한다.

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

### 3. topic 폴더 삭제

```bash
git rm -r topics/recipe
```

### 4. 삭제 후 확인

```bash
rg "recipe|/topics/recipe" _data topics _posts _drafts
```

검색 결과가 없어야 한다. 글 본문에 일반 단어로 `레시피`가 남는 것은 괜찮다.

## 2단계 카테고리 추가

목표: `일상` 아래에 `여행`을 추가한다.

완성 구조:

```text
일상(daily)
  - 기록(record)
  - 생각(thought)
  - 소비(spend)
  - 여행(travel)
```

### 1. `_data/lnb_menu.yml`에 child 추가

`daily` 그룹의 `children` 아래에 추가한다.

```yaml
    - title: 여행
      slug: travel
      url: /topics/daily/travel/
      category: [daily, travel]
```

들여쓰기는 기존 `기록`, `생각`, `소비`와 같아야 한다.

### 2. `topics/daily/index.md`에 링크 추가

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

### 3. 2단계 페이지 생성

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

### 4. 글에서 사용

```yaml
categories: [daily, travel]
```

### 5. 추가 후 확인

```bash
rg "travel|/topics/daily/travel" _data topics _posts _drafts
find topics/daily -maxdepth 2 -type f | sort
```

## 2단계 카테고리 수정

2단계 수정도 두 가지다.

| 작업 | 예시 | URL 변경 |
| --- | --- | --- |
| 이름만 수정 | `소비`를 `지출`로 변경 | 없음 |
| slug 수정 | `spend`를 `expense`로 변경 | 있음 |

### 2단계 이름만 수정

목표: 화면의 `일상 > 소비`를 `일상 > 지출`로 바꾼다. URL은 `/topics/daily/spend/` 그대로 둔다.

수정할 파일:

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

### 2단계 slug 수정

목표: `daily > spend`를 `daily > expense`로 바꾼다.

바뀌는 것:

```text
변경 전: /topics/daily/spend/my-post/
변경 후: /topics/daily/expense/my-post/
```

### 1. `_data/lnb_menu.yml` 수정

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

### 2. `topics/daily/index.md` 수정

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

### 3. 폴더 이름 변경

```bash
git mv topics/daily/spend topics/daily/expense
```

### 4. 하위 페이지 수정

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

### 5. 글 categories 수정

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

### 6. 수정 후 확인

```bash
rg "daily, spend|/topics/daily/spend|subtopic: spend" _data topics _posts _drafts
rg "daily, expense|/topics/daily/expense|subtopic: expense" _data topics _posts _drafts
```

첫 번째 검색 결과에는 의도치 않은 값이 없어야 한다.

## 2단계 카테고리 삭제

목표: `일상 > 소비`를 삭제한다.

삭제 대상:

```text
daily > spend
topics/daily/spend/index.md
```

### 1. 삭제 전에 글 검색

```bash
rg "categories: \\[daily, spend\\]" _posts _drafts
```

검색 결과가 있으면 글을 다른 2단계 카테고리로 옮긴다.

변경 전:

```yaml
categories: [daily, spend]
```

변경 후 예시:

```yaml
categories: [daily, record]
```

URL도 바뀐다.

```text
변경 전: /topics/daily/spend/post-slug/
변경 후: /topics/daily/record/post-slug/
```

### 2. `_data/lnb_menu.yml`에서 child 삭제

아래 블록만 삭제한다.

```yaml
    - title: 소비
      slug: spend
      url: /topics/daily/spend/
      category: [daily, spend]
```

상위 `일상` 블록 전체를 지우면 안 된다.

### 3. `topics/daily/index.md`에서 링크 삭제

아래 두 줄을 삭제한다.

```yaml
  - title: 소비
    url: /topics/daily/spend/
```

### 4. 2단계 페이지 삭제

```bash
git rm -r topics/daily/spend
```

### 5. 삭제 후 확인

```bash
rg "daily, spend|/topics/daily/spend|subtopic: spend" _data topics _posts _drafts
```

검색 결과가 없어야 한다.

## 실수 방지 체크리스트

작업 후 아래를 확인한다.

- `_data/lnb_menu.yml`에서 들여쓰기가 깨지지 않았는가
- 1단계 메뉴마다 `topics/<1단계>/index.md`가 있는가
- 2단계 메뉴마다 `topics/<1단계>/<2단계>/index.md`가 있는가
- 글의 `categories`가 실제 LNB 메뉴의 `category`와 같은가
- 삭제한 slug가 `_data`, `topics`, `_posts`, `_drafts`에 남아 있지 않은가
- slug를 바꾼 경우 기존 URL이 바뀐다는 점을 알고 있는가

자주 쓰는 확인 명령:

```bash
find topics -type f | sort
rg "categories:" _posts _drafts
rg "삭제한-slug|/topics/삭제한-slug" _data topics _posts _drafts
```

빌드 확인이 필요할 때만 다음 명령을 실행한다.

```bash
npm run build
bundle exec jekyll b
```
