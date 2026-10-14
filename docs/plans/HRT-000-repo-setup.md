# HRT-000 — Repository Setup — Plan

**Branch:** `chore/repo-setup`
**Status:** Approved (2026-10-14), with the product owner's answers below

## Goal & Scope
- In scope:
  - Initialize Git in `heartline/` (repo root) with default branch `main`.
  - Complete the monorepo folder layout from `ARCHITECTURE.md` → "Repository Layout". No `.gitkeep` files: folders
    without files (`app/`, `backend/`, `supabase/`, `.github/workflows/`) are added by the tasks that create their first files.
  - Confirm docs are in `docs/` and `AGENTS.md` is at the root (already done, see "Current State").
  - Move the Figma Make mock export from `heartline/figma-mock/` to `design/figma-mock/` (contents unchanged).
  - `README.md`, `.gitignore`, `.github/pull_request_template.md`.
  - Initial commit on `main` (docs only), then this task's work on `chore/repo-setup`.
  - Add the remote `origin` = `git@github.com-personal:hitesh-yadav2801/heartline.git` (exists, empty) and push
    `main` + `chore/repo-setup`. Opening the PR and protecting `main` is done by the product owner (`gh` is not logged in).
  - Doc updates requested by the product owner (see Technical Deltas): Node.js 22, and PR-only merging in `GIT_GUIDE.md`.
- Out of scope:
  - Flutter project creation, `pubspec.yaml`, fonts, tokens (HRT-001).
  - Backend `package.json`/`tsconfig`/Dockerfile, Supabase CLI init (`config.toml`, `seed.sql`) (later tasks).
  - CI workflows in `.github/workflows/` (HRT-024). The folder is created empty now.
  - Any other change to doc contents.

## References Read
- AGENTS.md (full) · INDEX.md · AGENT_EXECUTE.md (workflow + HRT-000) · ARCHITECTURE.md ("Repository Layout")
- GIT_GUIDE.md (branching, commits, PR template, "Never Commit") · FLUTTER_GUIDE.md (packages, `lib/` layout)
- ROADMAP.md (HRT-000/001 rows, design source note)

## Current State (verified, 2026-10-14)
- `heartline/AGENTS.md` at root ✅
- `heartline/docs/` holds all 17 docs listed in `ARCHITECTURE.md` + `INDEX.md` ✅
- `heartline/docs/plans/` exists ✅
- All 18 relative links in `docs/INDEX.md` resolve ✅ (no other doc contains relative links)
- Not yet a Git repo. No `README.md`, `.gitignore`, `.github/`, `design/`, `app/`, `backend/`, `supabase/`.
- `.DS_Store` files present in `heartline/` and `heartline/docs/` (will be ignored, not committed).
- Figma mock export added by the product owner at `heartline/figma-mock/` (82 files, 620 KB, React/TSX source, no secrets).
  It contains `imports/HEARTLINE_UI_UX_SPEC*.md` copies. Those are part of the export only. `docs/HEARTLINE_UI_UX_SPEC.md` is canonical.

No doc moves are needed. The arrangement already matches the requirement.

## Approach
1. `git init -b main` in `heartline/`.
2. Commit 1 on `main`: `AGENTS.md` + the 17 docs in `docs/` only (no `.DS_Store`) →
   `docs: add product, design and technical documentation [HRT-000]`.
3. `git checkout -b chore/repo-setup`, then small commits:
   - `chore(repo): add gitignore [HRT-000]`
   - `docs(repo): add readme [HRT-000]`
   - `chore(github): add pull request template [HRT-000]`
   - `chore(design): add figma make mock export [HRT-000]`
   - `docs: use node 22 as the backend runtime [HRT-000]`
   - `docs(git): require pull requests for every branch merge [HRT-000]`
   - `docs: drop gitkeep files and attribution trailers [HRT-000]`
   - `docs(plans): add HRT-000 plan [HRT-000]`
4. Add `origin`, push `main`, push `chore/repo-setup`. The product owner opens the PR and protects `main`.

- Files to create:
  ```
  README.md
  .gitignore
  .github/pull_request_template.md       # verbatim from GIT_GUIDE.md
  design/figma-mock/**                   # moved from heartline/figma-mock/
  docs/plans/HRT-000-repo-setup.md       # this file
  ```
  `app/`, `backend/` and `supabase/` are not created now. `flutter create app` in HRT-001 creates `app/`; later tasks create the others.
- Files to modify: `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/BACKEND_GUIDE.md`, `docs/AGENT_EXECUTE.md` (Node 22),
  `docs/GIT_GUIDE.md` (PR-only merges). Approved by the product owner on 2026-10-14.
- Files to delete: `docs/plans/.gitkeep` (no `.gitkeep` files anywhere).

### README.md outline
- 2-line description of Heartline (from PRODUCT.md tone, no new claims).
- Repo layout tree (summary from INDEX.md).
- Links: `AGENTS.md`, `docs/INDEX.md`.
- Prerequisites: Flutter (stable), Node.js 22, Supabase CLI, Git + GitHub CLI (optional).
- "Running" section with placeholders for app / backend / supabase (filled by HRT-001 and later tasks).

### .gitignore coverage
- macOS/OS: `.DS_Store`, `Thumbs.db`
- IDEs: `.idea/`, `.vscode/` (ignored fully), `*.iml`, `*.swp`
- Flutter/Dart: `.dart_tool/`, `.flutter-plugins`, `.flutter-plugins-dependencies`, `.packages`, `build/`,
  `app/ios/Pods/`, `app/ios/.symlinks/`, `app/ios/Flutter/Generated.xcconfig`, `app/ios/Flutter/flutter_export_environment.sh`,
  `app/android/.gradle/`, `app/android/local.properties`, `*.g.dart` NOT ignored (generated code stays tracked if used)
- Node: `node_modules/`, `backend/dist/`, `coverage/`, `npm-debug.log*`, `*.tsbuildinfo`
- Supabase: `supabase/.branches/`, `supabase/.temp/`
- Secrets (per GIT_GUIDE "Never Commit"): `.env`, `.env.*` with `!.env.example`, `*service-account*.json`,
  `*.jks`, `*.keystore`, `key.properties`, `*.p12`, `*.mobileprovision`, `*.cer`
- Firebase client config (`google-services.json`, `GoogleService-Info.plist`, `firebase_options.dart`) is **not**
  ignored now. That decision belongs to HRT-025.

## Technical Deltas vs Reference Docs
| Area | Reference says | Proposed | Why |
|------|----------------|----------|-----|
| Backend runtime | Node.js 20 (`AGENTS.md`, `BACKEND_GUIDE.md` says 20+, `AGENT_EXECUTE.md` README prereq) | Node.js 22 | Product owner decision: matches the installed Node v22.14.0 |
| Git workflow | "Every branch merges into `main` through a PR" | Made explicit and stricter: every branch (feature/fix/chore/...) merges only via a GitHub PR, never via local `git merge` or direct push | Product owner decision |
| Empty folders | `.gitkeep` in empty folders (`AGENT_EXECUTE.md`) | No `.gitkeep` anywhere. `AGENT_EXECUTE.md` updated; `GIT_GUIDE.md` "Never Commit" lists `.gitkeep` | Product owner decision |
| Commit messages | (not specified) | No `Co-Authored-By` / AI attribution trailers (`GIT_GUIDE.md` → Commit habits) | Product owner decision |

## New Packages
- None.

## Risks & Assumptions
- Repo root = `/Users/noah/Mine/06_Heartline_Project/heartline/` (the folder that contains `AGENTS.md`).
- Supabase CLI is not installed locally. Not needed for this task.
- Git commits will use your existing global git identity.
- `gh` is not authenticated, so the PR and branch protection are manual steps for the product owner.
- Branch protection on a **private** repo needs a paid GitHub plan (or a public repo). If unavailable, `main` stays unprotected and we rely on the workflow.

## Questions for Product Owner (answered 2026-10-14)
1. Figma mock → added at `heartline/figma-mock/`; arrange it into `design/figma-mock/`.
2. Remote → `git@github.com-personal:hitesh-yadav2801/heartline.git` (`github.com-personal` = default personal SSH alias).
3. Repo root → `06_Heartline_Project/heartline/`.
4. `.gitkeep` → none anywhere. Folders without files appear when their first files are added.
5. `.vscode/` → ignored fully.
6. Canonical spec → `docs/HEARTLINE_UI_UX_SPEC.md`.
7. Extra: use Node 22 in docs; state in `GIT_GUIDE.md` that every branch merges through a PR.
8. Extra: no `.gitkeep` files, and no `Co-Authored-By` trailers in commits.

## Manual Test Checklist
- [ ] `git clone <remote> && cd heartline` → tree matches `ARCHITECTURE.md` "Repository Layout"
      (`AGENTS.md`, `README.md`, `.gitignore`, `.github/`, `docs/`, `docs/plans/`, `design/figma-mock/`).
      `app/`, `backend/`, `supabase/` are not present yet (no files)
- [ ] `git ls-files | grep gitkeep` → no output; `git log --format=%B main..chore/repo-setup | grep -i co-authored` → no output
- [ ] `design/figma-mock/` holds the mock (`app/`, `imports/`, `styles/`); no `figma-mock/` left at the root
- [ ] `AGENTS.md`, `docs/BACKEND_GUIDE.md` say Node.js 22; `docs/GIT_GUIDE.md` says every branch merges through a PR
- [ ] `git log main --oneline` → one docs-only commit; `git log chore/repo-setup` → the small HRT-000 commits on top
- [ ] Open `AGENTS.md` and `docs/INDEX.md`; click every link in INDEX → each resolves
- [ ] `git status` clean; `git ls-files | grep -E 'DS_Store|\.env$|\.jks|keystore'` → no output
- [ ] `touch .env app/.DS_Store && git status` → neither shows as untracked (then delete them)
- [ ] README shows description, layout, links to AGENTS.md + INDEX.md, prerequisites, run placeholders
- [ ] Open a PR from `chore/repo-setup` on GitHub → body is pre-filled with the PR template
- [ ] (If remote set up) Try `git push origin main` directly / force-push → rejected by branch protection
