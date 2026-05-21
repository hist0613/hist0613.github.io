#!/usr/bin/env python3
"""블로그 목록·리다이렉트 스텁 생성 및 새 글 스캐폴딩.

표준 라이브러리만 사용한다. 저장소 루트에서 `python3 blog/build.py`로 실행.
"""
import argparse
import datetime
import html
import re
from dataclasses import dataclass, field
from pathlib import Path

LANGS = ('en', 'ko')

_META_TAG_RE = re.compile(r'<meta\b[^>]*>', re.IGNORECASE)
# 속성은 쌍따옴표만 처리한다 — 템플릿과 build.py 생성 HTML은 모두 쌍따옴표를 쓴다.
_ATTR_RE = re.compile(r'([\w-]+)\s*=\s*"([^"]*)"')


def parse_post_meta(html_text):
    """HTML 문자열에서 <meta name="blog:*"> 태그를 dict로 추출한다."""
    meta = {}
    for tag in _META_TAG_RE.findall(html_text):
        attrs = dict(_ATTR_RE.findall(tag))
        name = attrs.get('name', '')
        if name.startswith('blog:'):
            meta[name[len('blog:'):]] = attrs.get('content', '').strip()
    return meta


@dataclass
class Post:
    slug: str
    meta: dict[str, dict[str, str]] = field(default_factory=dict)  # lang -> 메타 dict

    @property
    def date(self):
        for lang in LANGS:
            value = self.meta.get(lang, {}).get('date')
            if value:
                return value
        return ''


def discover_posts(blog_dir):
    """blog/posts/<slug>/{en,ko}/index.html을 스캔해 (posts, warnings)를 반환한다."""
    posts_dir = Path(blog_dir) / 'posts'
    posts = []
    warnings = []
    if not posts_dir.is_dir():
        return posts, warnings
    for slug_dir in sorted(p for p in posts_dir.iterdir() if p.is_dir()):
        post = Post(slug=slug_dir.name)
        for lang in LANGS:
            index = slug_dir / lang / 'index.html'
            if index.is_file():
                post.meta[lang] = parse_post_meta(
                    index.read_text(encoding='utf-8'))
        if not post.meta:
            continue
        for lang in LANGS:
            if lang not in post.meta:
                warnings.append(f'{post.slug}: {lang} 버전 누락')
        for lang, m in post.meta.items():
            for required in ('title', 'date'):
                if not m.get(required):
                    warnings.append(
                        f'{post.slug}/{lang}: {required} 메타 누락')
        posts.append(post)
    return posts, warnings


UI = {
    'en': {'title': 'Blog', 'heading': 'Blog',
           'empty': 'No posts yet.'},
    'ko': {'title': 'Blog', 'heading': 'Blog',
           'empty': '아직 글이 없습니다.'},
}

REDIRECT_STUB = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <script>
    (function () {
      var lang = (navigator.language || 'en').toLowerCase();
      location.replace(lang.indexOf('ko') === 0 ? 'ko/' : 'en/');
    })();
  </script>
  <meta http-equiv="refresh" content="0; url=en/">
</head>
<body><a href="en/">Continue</a></body>
</html>
'''

_LIST_PAGE = '''<!DOCTYPE html>
<html lang="{lang}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} · Seungtaek Choi</title>
  <link href="/css/style.css" rel="stylesheet">
  <link href="/css/blog.css" rel="stylesheet">
</head>

<body class="blog-body">
  <nav class="navbar">
    <div class="nav-inner">
      <a href="/" class="nav-brand">Seungtaek Choi</a>
      <div class="nav-links">
        <a href="/" class="nav-link">About</a>
        <a href="/publications/" class="nav-link">Publications</a>
        <a href="/teaching/" class="nav-link">Teaching</a>
        <a href="/blog/" class="nav-link active">Blog</a>
      </div>
    </div>
  </nav>

  <div class="content blog-list">
    <div class="blog-list-header">
      <h1>{heading}</h1>
      {lang_switch}
    </div>
    {items}
  </div>
</body>

</html>
'''

_LIST_ITEM = '''<article class="post-list-item">
      <div class="post-entry">
        <p class="post-meta"><time>{date}</time>{tags}</p>
        <h2><a href="{url}">{title}</a></h2>
        <p class="post-summary">{summary}</p>
      </div>{thumb}
    </article>'''


def _render_tags(raw):
    tags = [t.strip() for t in raw.split(',') if t.strip()]
    if not tags:
        return ''
    spans = ''.join(
        f'<span class="post-tag">{html.escape(t)}</span>' for t in tags)
    return spans


def _resolve_image(post, lang):
    """post의 blog:image 메타를 절대 URL로 변환한다. 없으면 ''.

    blog:image 값이 http(s):// 또는 /로 시작하면 그대로, 아니면 글 폴더
    (/blog/posts/<slug>/) 기준 상대 경로로 본다. 해당 언어에 없으면 다른
    언어 메타에서 찾는다 (이미지는 보통 언어 공통)."""
    for which in (lang, *(x for x in LANGS if x != lang)):
        raw = post.meta.get(which, {}).get('image', '').strip()
        if raw:
            if raw.startswith(('http://', 'https://', '/')):
                return raw
            return f'/blog/posts/{post.slug}/{raw}'
    return ''


def _render_thumb(url, image):
    """이미지가 있으면 측면 썸네일 HTML을, 없으면 ''을 반환한다."""
    if not image:
        return ''
    return (f'\n      <a class="post-thumb-link" href="{url}">'
            f'<img class="post-thumb" src="{html.escape(image)}" '
            f'alt="" loading="lazy"></a>')


def _render_lang_switch(active_lang):
    """'한국어 | English' 언어 전환 위젯. 현재 언어에 lang-active를 준다."""
    opts = []
    for code, label, href in (
            ('ko', '<img class="flag" src="/css/icons/flag-kr.svg" alt="">한국어',
             '/blog/ko/'),
            ('en', '<img class="flag" src="/css/icons/flag-us.svg" alt="">English',
             '/blog/en/')):
        cls = 'lang-opt lang-active' if code == active_lang else 'lang-opt'
        opts.append(f'<a href="{href}" class="{cls}">{label}</a>')
    return ('<span class="post-lang-switch">'
            f'{opts[0]}<span class="lang-sep">|</span>{opts[1]}</span>')


def render_list_page(posts, lang):
    """주어진 언어의 글 목록 HTML 페이지 문자열을 반환한다."""
    ui = UI[lang]
    visible = sorted(
        (p for p in posts if lang in p.meta),
        key=lambda p: p.date, reverse=True)
    if not visible:
        items = f'<p class="post-summary">{ui["empty"]}</p>'
    else:
        rendered = []
        for p in visible:
            m = p.meta[lang]
            url = f'/blog/posts/{p.slug}/{lang}/'
            rendered.append(_LIST_ITEM.format(
                url=url,
                title=html.escape(m.get('title', p.slug)),
                date=html.escape(m.get('date', '')),
                summary=html.escape(m.get('summary', '')),
                tags=_render_tags(m.get('tags', '')),
                thumb=_render_thumb(url, _resolve_image(p, lang)),
            ))
        items = '\n    '.join(rendered)
    return _LIST_PAGE.format(
        lang=lang, title=ui['title'], heading=ui['heading'],
        lang_switch=_render_lang_switch(lang),
        items=items)


_SUBSTITUTIONS = {
    'en': {'LANG': 'en', 'BACK_LABEL': '← All posts',
           'KO_ACTIVE': '', 'EN_ACTIVE': ' lang-active',
           'COPY_LABEL': 'Copy link', 'COPIED_LABEL': 'Copied!'},
    'ko': {'LANG': 'ko', 'BACK_LABEL': '← 글 목록',
           'KO_ACTIVE': ' lang-active', 'EN_ACTIVE': '',
           'COPY_LABEL': '링크 복사', 'COPIED_LABEL': '복사됨!'},
}


def scaffold_post(blog_dir, slug, today=None):
    """_template/post.html에서 en/ko 본문 파일을 생성한다. 생성된 폴더 경로 반환."""
    blog_dir = Path(blog_dir)
    today = today or datetime.date.today().isoformat()
    post_dir = blog_dir / 'posts' / slug
    if post_dir.exists():
        raise SystemExit(f'이미 존재하는 슬러그입니다: {slug}')
    template = (blog_dir / '_template' / 'post.html').read_text(encoding='utf-8')
    (post_dir / 'assets').mkdir(parents=True)
    for lang in LANGS:
        text = template
        subs = dict(_SUBSTITUTIONS[lang], TITLE=slug, DATE=today)
        for key, value in subs.items():
            text = text.replace('{{' + key + '}}', value)
        lang_dir = post_dir / lang
        lang_dir.mkdir()
        (lang_dir / 'index.html').write_text(text, encoding='utf-8')
    return post_dir


def build(blog_dir):
    """목록 페이지와 리다이렉트 스텁을 생성한다. (posts, warnings) 반환."""
    blog_dir = Path(blog_dir)
    posts, warnings = discover_posts(blog_dir)
    for lang in LANGS:
        out_dir = blog_dir / lang
        out_dir.mkdir(exist_ok=True)
        (out_dir / 'index.html').write_text(
            render_list_page(posts, lang), encoding='utf-8')
    (blog_dir / 'index.html').write_text(REDIRECT_STUB, encoding='utf-8')
    for post in posts:
        (blog_dir / 'posts' / post.slug / 'index.html').write_text(
            REDIRECT_STUB, encoding='utf-8')
    return posts, warnings


def main(argv=None):
    parser = argparse.ArgumentParser(
        description='블로그 목록 생성 및 새 글 스캐폴딩')
    parser.add_argument('--new', metavar='SLUG',
                        help='새 글 폴더를 _template에서 스캐폴딩')
    args = parser.parse_args(argv)
    blog_dir = Path(__file__).resolve().parent
    if args.new:
        post_dir = scaffold_post(blog_dir, args.new)
        print(f'생성됨: {post_dir}')
        print('en/index.html, ko/index.html 본문을 작성한 뒤 '
              'build.py를 다시 실행하세요.')
        return
    posts, warnings = build(blog_dir)
    for w in warnings:
        print(f'경고: {w}')
    print(f'{len(posts)}개 글로 목록 페이지를 생성했습니다.')


if __name__ == '__main__':
    main()
