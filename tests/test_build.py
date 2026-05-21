import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / 'blog'))
import build  # noqa: E402


SAMPLE_HTML = '''<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="blog:title" content="Hello World">
<meta name="blog:date" content="2026-05-19">
<meta name="blog:summary" content="첫 글입니다.">
<meta name="blog:tags" content="meta, intro">
<meta name="blog:lang" content="en">
</head><body></body></html>'''


class TestParsePostMeta(unittest.TestCase):
    def test_extracts_all_blog_meta(self):
        meta = build.parse_post_meta(SAMPLE_HTML)
        self.assertEqual(meta['title'], 'Hello World')
        self.assertEqual(meta['date'], '2026-05-19')
        self.assertEqual(meta['summary'], '첫 글입니다.')
        self.assertEqual(meta['tags'], 'meta, intro')
        self.assertEqual(meta['lang'], 'en')

    def test_ignores_non_blog_meta(self):
        meta = build.parse_post_meta(SAMPLE_HTML)
        self.assertNotIn('charset', meta)

    def test_missing_meta_returns_empty(self):
        self.assertEqual(build.parse_post_meta('<html></html>'), {})


class TestDiscoverPosts(unittest.TestCase):
    def _make_post(self, blog_dir, slug, langs):
        for lang in langs:
            d = blog_dir / 'posts' / slug / lang
            d.mkdir(parents=True)
            (d / 'index.html').write_text(SAMPLE_HTML, encoding='utf-8')

    def test_pairs_languages(self):
        with tempfile.TemporaryDirectory() as tmp:
            blog_dir = Path(tmp)
            self._make_post(blog_dir, 'hello-world', ['en', 'ko'])
            posts, warnings = build.discover_posts(blog_dir)
            self.assertEqual(len(posts), 1)
            self.assertEqual(posts[0].slug, 'hello-world')
            self.assertEqual(set(posts[0].meta), {'en', 'ko'})
            self.assertEqual(warnings, [])

    def test_warns_on_missing_language(self):
        with tempfile.TemporaryDirectory() as tmp:
            blog_dir = Path(tmp)
            self._make_post(blog_dir, 'only-en', ['en'])
            posts, warnings = build.discover_posts(blog_dir)
            self.assertEqual(len(posts), 1)
            ko_warnings = [w for w in warnings if 'ko' in w]
            self.assertEqual(len(ko_warnings), 1)
            self.assertIn('only-en', ko_warnings[0])


class TestRenderListPage(unittest.TestCase):
    def _posts(self):
        old = build.Post('old', {
            'en': {'title': 'Old', 'date': '2026-01-01', 'summary': 's1', 'tags': ''},
            'ko': {'title': '옛글', 'date': '2026-01-01', 'summary': 'ㄱ', 'tags': ''},
        })
        new = build.Post('new', {
            'en': {'title': 'New', 'date': '2026-05-19', 'summary': 's2', 'tags': 'a, b'},
        })
        return [old, new]

    def test_sorted_by_date_desc(self):
        page = build.render_list_page(self._posts(), 'en')
        self.assertLess(page.index('New'), page.index('Old'))

    def test_links_use_clean_url(self):
        page = build.render_list_page(self._posts(), 'en')
        self.assertIn('/blog/posts/new/en/', page)

    def test_excludes_posts_missing_language(self):
        page = build.render_list_page(self._posts(), 'ko')
        self.assertIn('옛글', page)
        self.assertNotIn('/blog/posts/new/ko/', page)

    def test_empty_message_when_no_posts(self):
        page = build.render_list_page([], 'ko')
        self.assertIn('아직 글이 없습니다', page)

    def test_renders_tags(self):
        page = build.render_list_page(self._posts(), 'en')
        self.assertIn('post-tag', page)

    def test_renders_thumbnail_when_image_present(self):
        post = build.Post('withimg', {
            'en': {'title': 'WithImg', 'date': '2026-06-01',
                   'summary': 's', 'tags': '', 'image': 'assets/cover.png'},
        })
        page = build.render_list_page([post], 'en')
        self.assertIn('post-thumb', page)
        self.assertIn('/blog/posts/withimg/assets/cover.png', page)

    def test_no_thumbnail_when_image_absent(self):
        page = build.render_list_page(self._posts(), 'en')
        self.assertNotIn('post-thumb', page)


class TestRedirectStub(unittest.TestCase):
    def test_detects_korean(self):
        self.assertIn("indexOf('ko')", build.REDIRECT_STUB)

    def test_has_noscript_fallback(self):
        self.assertIn('http-equiv="refresh"', build.REDIRECT_STUB)


class TestScaffoldPost(unittest.TestCase):
    def _blog_dir_with_template(self, tmp):
        blog_dir = Path(tmp)
        tpl = blog_dir / '_template'
        tpl.mkdir()
        (tpl / 'post.html').write_text(
            '<html lang="{{LANG}}"><title>{{TITLE}}</title>'
            '<meta name="blog:date" content="{{DATE}}">'
            '<a href="../ko/" class="lang-opt{{KO_ACTIVE}}">한국어</a>'
            '<a href="../en/" class="lang-opt{{EN_ACTIVE}}">English</a>'
            '<a href="/blog/{{LANG}}/">{{BACK_LABEL}}</a>'
            '<button data-copied="{{COPIED_LABEL}}">{{COPY_LABEL}}</button>'
            '</html>',
            encoding='utf-8')
        return blog_dir

    def test_creates_both_languages(self):
        with tempfile.TemporaryDirectory() as tmp:
            blog_dir = self._blog_dir_with_template(tmp)
            build.scaffold_post(blog_dir, 'my-post', today='2026-05-19')
            for lang in ('en', 'ko'):
                self.assertTrue(
                    (blog_dir / 'posts' / 'my-post' / lang / 'index.html').is_file())
            self.assertTrue(
                (blog_dir / 'posts' / 'my-post' / 'assets').is_dir())

    def test_substitutes_placeholders(self):
        with tempfile.TemporaryDirectory() as tmp:
            blog_dir = self._blog_dir_with_template(tmp)
            build.scaffold_post(blog_dir, 'my-post', today='2026-05-19')
            en = (blog_dir / 'posts' / 'my-post' / 'en' / 'index.html').read_text()
            self.assertIn('lang="en"', en)
            self.assertIn('../ko/', en)
            self.assertIn('2026-05-19', en)
            self.assertNotIn('{{', en)

    def test_rejects_existing_slug(self):
        with tempfile.TemporaryDirectory() as tmp:
            blog_dir = self._blog_dir_with_template(tmp)
            build.scaffold_post(blog_dir, 'dup', today='2026-05-19')
            with self.assertRaises(SystemExit):
                build.scaffold_post(blog_dir, 'dup', today='2026-05-19')


if __name__ == '__main__':
    unittest.main()
