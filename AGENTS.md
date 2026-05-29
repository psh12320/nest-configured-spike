<!-- templateCentral: nestjs@4.0.0 -->
# AGENTS.md - nest-configured

## Stack
NestJS 11 · Fastify · Zod + nestjs-zod · Swagger · TypeScript strict · Vitest · pnpm · Node >=24

## Commands
```bash
pnpm start:dev
pnpm build
pnpm test
pnpm test:e2e
pnpm check
```

## Architecture
- `src/modules/<name>/` - one module per feature
- DTOs use `createZodDto` from `nestjs-zod`
- Global pipes and filters live in `app.module.ts`
- Swagger metadata belongs on each route with `@ApiTags()` and `@ApiOperation()`

## Rules
- TypeScript strict; no `any` or `@ts-ignore`
- Validate user input with Zod at the boundary
- Use env vars for secrets and document them in `.env.example`
