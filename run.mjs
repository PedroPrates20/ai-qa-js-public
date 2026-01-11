import 'dotenv/config';
import { mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { llmEnabled } from './ai/llm.mjs';
import { generateBugReport, generateTestIdeas } from './ai/reporter.mjs';

function runPlaywrightAndCapture() {
  mkdirSync('reports', { recursive: true });

  // Capture both stdout and stderr
  let output = '';
  try {
    output = execSync('npx playwright test --config=playwright.config.mjs', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    // If no errors, still store output
    writeFileSync('reports/test-output.txt', output, 'utf-8');
    return { exitCode: 0, output };
  } catch (err) {
    const stdout = err?.stdout?.toString?.() ?? '';
    const stderr = err?.stderr?.toString?.() ?? '';
    output = `${stdout}\n${stderr}`.trim();
    writeFileSync('reports/test-output.txt', output, 'utf-8');
    return { exitCode: err?.status ?? 1, output };
  }
}

function tail(text, maxChars = 12000) {
  if (!text) return '';
  return text.length > maxChars ? text.slice(-maxChars) : text;
}

async function main() {
  const baseURL = (process.env.BASE_URL || '').trim();
  if (!baseURL) {
    console.error('Missing BASE_URL. Set it in .env or environment variables.');
    process.exit(2);
  }

  const { exitCode, output } = runPlaywrightAndCapture();
  console.log('\nPlaywright finished with exit code:', exitCode);
  console.log('HTML report generated in: playwright-report/\n');

  if (!llmEnabled()) {
    console.log('LLM is disabled (LLM_API_KEY not set). Skipping AI bug reports.');
    process.exit(exitCode);
  }

  const failureText = tail(output);

  try {
    const bug = await generateBugReport(failureText);
    const ideas = await generateTestIdeas(failureText);

    writeFileSync('reports/ai_bug_reports.md', bug, 'utf-8');
    writeFileSync('reports/ai_test_ideas.md', ideas, 'utf-8');

    console.log('AI bug reports saved to: reports/ai_bug_reports.md');
    console.log('AI test ideas saved to: reports/ai_test_ideas.md');
  } catch (e) {
    console.error('AI step failed:', e?.message || e);
  }

  process.exit(exitCode);
}

await main();
