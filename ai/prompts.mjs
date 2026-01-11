export const BUG_REPORT_PROMPT = `
You are a senior QA engineer.
Write a clear bug report based on this failed test output.

Include:
- Title
- Environment
- Steps to Reproduce
- Expected Result
- Actual Result
- Severity (Low/Medium/High/Critical)
- Suggested Areas to Investigate

FAILED TEST OUTPUT:
{{FAILURE_TEXT}}
`;

export const TEST_IDEAS_PROMPT = `
You are a QA engineer.
Based on the failure below, propose 8 additional test cases (mix of positive, negative, edge).
Use short titles + 1 line description each.

FAILURE:
{{FAILURE_TEXT}}
`;
