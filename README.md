<!-- markdownlint-disable MD013 MD024 MD001 MD045 -->

# cc-determine

Replaces all `Math.random()` with predictable seed-based RNG's with different categories:
- general (default)
- visual
- sound
- event
- misc

## Building

```bash
git clone https://github.com/krypciak/cc-determine
cd cc-determine
pnpm install
pnpm run start
# this should return no errors (hopefully)
npx tsc
```
