# Heartline — Git Guide & Best Practices

> This applies to every change, whether a person or an AI agent makes it.
> Workflow stages (plan → confirm → build → test) are in `AGENT_EXECUTE.md`. This file covers the Git side.

---

## Branching Model

A simple trunk-based flow with short-lived branches.

```
main ──●────────●────────●────────●──▶   always stable, always runnable
        \      /  \      /  \      /
         feature/   fix/     chore/        one branch per task, merged by PR (squash)
```

- **`main`** is protected. It is always stable and builds/runs. Nobody commits to it directly.
- Every task from `ROADMAP.md` gets **one branch**, created from the latest `main`.
- Branches are short-lived. Merge within the task, then delete.
- Releases are **tags** on `main` (see Releases), not long-lived release branches.

---

## Branch Naming

Format: `<type>/<short-kebab-name>`. Lowercase, hyphens only, 2–5 words. The branch name for each task is listed in `ROADMAP.md`.

| Type | Use for | Example |
|------|---------|---------|
| `feature/` | New feature or screen (UI or functionality) | `feature/heart-raise-ui`, `feature/couple-linking` |
| `fix/` | Bug fix in already-merged work | `fix/mood-day-boundary`, `fix/hug-button-double-tap` |
| `hotfix/` | Urgent fix for a released build | `hotfix/fcm-token-crash` |
| `chore/` | Setup, tooling, deps, config, CI, release prep | `chore/repo-setup`, `chore/upgrade-go-router` |
| `refactor/` | Restructure code with no behavior change | `refactor/heart-repository-split` |
| `docs/` | Documentation-only changes | `docs/update-api-contracts` |
| `test/` | Adding or fixing tests only | `test/heart-bloc-coverage` |

Don't use generic names (`feature/update`, `fix/bug`, `wip`), personal names, or uppercase.

---

## Commit Messages — Conventional Commits

```
<type>(<scope>): <summary in imperative, lowercase, no period> [HRT-XXX]

<optional body: what and why, wrapped at ~72 chars>
```

- **type:** `feat` · `fix` · `refactor` · `style` (formatting only) · `test` · `docs` · `chore` · `perf` · `build` · `ci`
- **scope:** the feature or area, e.g. `heart`, `mood`, `couple`, `auth`, `router`, `theme`, `backend`, `db`, `docs`
- **summary:** ≤ 72 characters, says *what* changed

```
feat(heart): add feeling selection grid [HRT-008]
feat(heart): add note step with 500-char counter [HRT-008]
fix(mood): use user-local date for daily limit [HRT-031]
docs(api): add resolve-request error codes [HRT-030]
chore(deps): add equatable [HRT-001]
```

**Commit habits**
- Small, logical commits. Each one compiles and makes sense alone. Not "WIP", and not one giant commit.
- Don't mix unrelated changes. Formatting-only changes get their own `style:` commit.
- Commit doc updates (schema/API) alongside the code that required them.

---

## Pull Requests

Every branch merges into `main` through a PR.

**Title:** same format as a commit: `feat(heart): open a heart UI [HRT-008]`
**Merge method:** **Squash and merge.** The squash commit keeps the PR title. Delete the branch after merge.

### PR template (`.github/pull_request_template.md`)

```markdown
## Task
HRT-XXX — <Feature> · Plan: docs/plans/HRT-XXX-<name>.md

## What changed
-

## Technical deltas vs reference docs
- None / <schema, API, notification, package changes + docs updated>

## How to test
<copy of the manual test checklist>

## Checklist
- [ ] Plan approved before build
- [ ] `flutter analyze` 0 issues · `flutter test` passes (backend: lint + tests pass)
- [ ] No hardcoded colors / strings / sizes · copy follows PRODUCT.md terminology
- [ ] Docs updated in this branch (schema / API / notifications / env example) if anything changed
- [ ] No secrets, keys, or `.env` files committed
- [ ] Manual testing passed (product owner)
- [ ] ROADMAP.md status + AGENT_EXECUTE.md completed log updated
```

### Merge rules
- Merge only after the product owner accepts manual testing.
- The branch must be up to date with `main`. Rebase onto `main` before merging (`git pull --rebase origin main`).
- CI (once it exists, HRT-024) must be green.

---

## Day-to-Day Commands

```bash
# Start a task
git checkout main && git pull
git checkout -b feature/heart-raise-ui

# Work
git add -p                      # stage hunks deliberately
git commit -m "feat(heart): add feeling selection grid [HRT-008]"

# Keep the branch current (on a personal branch, rebasing is fine)
git fetch origin && git rebase origin/main

# Publish & open PR
git push -u origin feature/heart-raise-ui

# After merge
git checkout main && git pull && git branch -d feature/heart-raise-ui
```

---

## Never Commit

- `.env`, `.env.*` (except `.env.example` with empty values)
- Service account JSON (Firebase Admin, Google Cloud), API keys, Supabase **service role** key, signing keys
- Android keystores (`*.jks`, `*.keystore`), `key.properties`, iOS certificates/provisioning profiles
- Build output: `app/build/`, `.dart_tool/`, `node_modules/`, `backend/dist/`, `coverage/`
- IDE/OS junk: `.idea/`, `.vscode/` (except shared settings if agreed), `.DS_Store`
- Large binaries (videos, raw design exports) beyond the reference mock in `design/`

`google-services.json`, `GoogleService-Info.plist`, and `firebase_options.dart` hold client identifiers, not secrets.
Committing them is acceptable. Decide in HRT-025 and record the decision there.

If a secret is ever committed: **rotate it immediately**. Removing it from history is not enough.

---

## Releases & Tags

- Version format: `MAJOR.MINOR.PATCH+BUILD` in `app/pubspec.yaml` (e.g. `0.3.0+12`).
- Tag on `main` after a release-worthy merge: `git tag -a v0.3.0 -m "MVP beta"` → `git push --tags`.
- Suggested milestones: `v0.1.0` UI freeze · `v0.5.0` MVP beta · `v1.0.0` store launch.
- Hotfix: branch `hotfix/<name>` from the release tag/`main`, fix, PR, merge, tag a PATCH bump.

---

## Rules for AI Agents

1. Never commit directly to `main`. Never force-push to `main`. Never rewrite shared history.
2. Create the task branch **after** the plan is approved, using the branch name in `ROADMAP.md`.
3. One task per branch. Don't sneak unrelated changes in. Note them as follow-ups instead.
4. Never merge a PR yourself unless the product owner explicitly says so after manual testing passes.
5. Never commit secrets. If a task needs a new secret, add the key name (empty) to `.env.example` and tell the product owner.
6. Before handing over for testing, make sure the branch is pushed, the working tree is clean, and the PR description is filled in.
