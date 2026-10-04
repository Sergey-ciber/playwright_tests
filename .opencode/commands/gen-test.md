---
description: Generate Playwright tests from a test plan item
agent: playwright-test-generator
---

Test plan file: $1

Test plan item (top-level section, becomes the `test.describe` title): $2

Follow the plan steps exactly, execute each one with Playwright MCP tools,
then save each scenario with `generator_write_test`.
