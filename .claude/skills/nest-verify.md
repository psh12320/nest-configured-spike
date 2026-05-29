---
name: nest-verify
description: Run typecheck, lint, and tests for this NestJS project in one pass
---

Run all quality checks in sequence:

```bash
pnpm exec tsc --noEmit --incremental && pnpm check && pnpm test --run
```
