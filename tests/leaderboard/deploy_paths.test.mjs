// GitHub Pages 는 Jekyll 로 빌드해 _ 로 시작하는 파일·폴더를 배포하지 않는다.
// 2026-11 까지 샘플 문항 본문을 data/samples/_items 에 두어 사이트에서 모든 문항 본문과 이미지가 404 였다. 실행: node --test tests/leaderboard/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

function underscored(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('_')) out.push(join(dir, e.name));
    else if (e.isDirectory()) out.push(...underscored(join(dir, e.name)));
  }
  return out;
}

test('leaderboard 아래에 _ 로 시작하는 파일·폴더가 없다(Jekyll 이 배포하지 않는다)', () => {
  assert.deepEqual(underscored('leaderboard'), []);
});
