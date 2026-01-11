import { test, expect } from '@playwright/test';
import 'dotenv/config';

const baseURL = (process.env.BASE_URL || '').replace(/\/$/, '');

test('GET /posts returns list with expected fields', async ({ request }) => {
  const start = Date.now();
  const res = await request.get(`${baseURL}/posts`);
  const elapsedMs = Date.now() - start;

  expect(res.status()).toBe(200);
  expect(elapsedMs).toBeLessThan(2000);

  const data = await res.json();
  expect(Array.isArray(data)).toBeTruthy();
  expect(data.length).toBeGreaterThan(0);

  const item = data[0];
  expect(item).toHaveProperty('userId');
  expect(item).toHaveProperty('id');
  expect(item).toHaveProperty('title');
  expect(item).toHaveProperty('body');
});

test('GET /posts/1 contract', async ({ request }) => {
  const res = await request.get(`${baseURL}/posts/1`);
  expect(res.status()).toBe(200);
  const data = await res.json();

  expect(data.id).toBe(1);
  expect(typeof data.title).toBe('string');
  expect(data.title.length).toBeGreaterThan(0);
});
