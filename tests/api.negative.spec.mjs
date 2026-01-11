import { test, expect } from '@playwright/test';
import 'dotenv/config';

const baseURL = (process.env.BASE_URL || '').replace(/\/$/, '');

// Este teste é propositalmente "strict" para gerar falha e virar bug report.
// JSONPlaceholder às vezes responde 200 + {} em vez de 404. Em uma API real, 404 seria o esperado.
test('GET /posts/999999 should return 404 (strict)', async ({ request }) => {
  const res = await request.get(`${baseURL}/posts/999999`);
  expect(res.status(), `Expected 404, got ${res.status()}`).toBe(404);
});

test('GET invalid endpoint returns 404 or 400', async ({ request }) => {
  const res = await request.get(`${baseURL}/__does_not_exist__`);
  expect([404, 400]).toContain(res.status());
});
