import { callLLM } from './llm.mjs';
import { BUG_REPORT_PROMPT, TEST_IDEAS_PROMPT } from './prompts.mjs';

export async function generateBugReport(failureText) {
  const prompt = BUG_REPORT_PROMPT.replace('{{FAILURE_TEXT}}', failureText);
  return callLLM(prompt);
}

export async function generateTestIdeas(failureText) {
  const prompt = TEST_IDEAS_PROMPT.replace('{{FAILURE_TEXT}}', failureText);
  return callLLM(prompt);
}
