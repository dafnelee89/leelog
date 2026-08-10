# leelog

`leelog` is a manual Jekyll Chirpy site for `garnet.dafnelee.com`.

The site is Dafne's version of `notes-blog`: personally written notes across daily life, study, reviews, and recipes. It does not connect to `blog-automation`; posts are written by hand and published through the normal `_drafts` to `_posts` flow.

## Content Rules

- Use two-level categories from `_data/lnb_menu.yml`.
- Keep slugs and filenames in lowercase English kebab-case.
- Add a `description`, `image.path`, and `image.alt` before publishing.
- Store post images under `assets/img/posts/blog/<slug>/`.
- Run indexing readiness checks after deployment when the domain is live.

## Local Notes

The site uses the Chirpy theme. Install dependencies before building locally.

See `docs/manual-posting.md` for the posting template and publishing checklist.
