import 'dotenv/config';

export function llmEnabled() {
  return Boolean((process.env.LLM_API_KEY || '').trim());
}

export async function callLLM(prompt) {
  const apiKey = (process.env.LLM_API_KEY || '').trim();
  const baseUrl = (process.env.LLM_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = (process.env.LLM_MODEL || 'gpt-4.1-mini').trim();

  if (!apiKey) throw new Error('LLM_API_KEY not set');

  const url = `${baseUrl}/chat/completions`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM request failed: ${res.status} ${res.statusText}\n${text.slice(0, 500)}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? '';
}
