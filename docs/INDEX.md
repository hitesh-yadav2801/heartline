# Heartline — Documentation Index

> Find any document fast. Paths are relative to the repo root.
> **Start here:** `AGENTS.md` (rules) → `docs/AGENT_EXECUTE.md` (current task + workflow).

---

## Document Map

### 🧭 Start & Workflow
| File | What it is | Read when |
|------|-----------|-----------|
| [`AGENTS.md`](../AGENTS.md) | Agent entry point: golden principle, workflow summary, hard rules, terminology, naming | Before **every** task |
| [`AGENT_EXECUTE.md`](AGENT_EXECUTE.md) | The 6-stage task workflow, current task, up next, completed log, plan template | Before **every** task |
| [`ROADMAP.md`](ROADMAP.md) | Ordered task list (HRT-000…045) with branch names, weeks, status | Picking/closing a task |
| [`GIT_GUIDE.md`](GIT_GUIDE.md) | Branch naming, commits, PRs, never-commit list, releases | Creating branches, committing, PRs |
| [`plans/`](plans/) | One approved plan per task (`HRT-XXX-<name>.md`) | Reviewing past decisions |

### 🔒 Product (fixed — what Heartline is)
| File | What it is | Read when |
|------|-----------|-----------|
| [`PRODUCT.md`](PRODUCT.md) | Identity, emotional promise, tone, sacred terminology | Any user-facing work |
| [`PRD.md`](PRD.md) | Problem, goals, personas, phase scopes, metrics, monetization | Scoping, phase questions |
| [`FEATURES.md`](FEATURES.md) | Behavior + edge cases for every feature | **Every feature task** |
| [`USER_FLOWS.md`](USER_FLOWS.md) | Step-by-step journeys + edge-case table | **Every feature task** |

### 🎨 Design (fixed — how it looks)
| File | What it is | Read when |
|------|-----------|-----------|
| [`HEARTLINE_UI_UX_SPEC.md`](HEARTLINE_UI_UX_SPEC.md) | Screen-by-screen spec, components, animation, copy (v1.1, mock-aligned) | **Every UI task** |
| [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) | Flutter tokens: colors, type, spacing, radius, sizes, shadows, motion | **Every UI task** |
| `design/figma-mock/` | Approved Figma Make mock (visual reference only) | Matching look & feel |

### 🛠 Technical (patterns fixed, details flexible)
| File | What it is | Read when |
|------|-----------|-----------|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Stack, **repo layout**, Flutter + backend structure, absolute rules | Setup, any structural question |
| [`FLUTTER_GUIDE.md`](FLUTTER_GUIDE.md) | Feature-first clean architecture, BLoC, use cases, DI, packages, testing | **Every Flutter task** |
| [`BACKEND_GUIDE.md`](BACKEND_GUIDE.md) | Express/TS patterns, auth middleware, services, AI service, env | **Every backend task** |
| [`DATABASE_SCHEMA.md`](DATABASE_SCHEMA.md) | 📐 Reference schema, time rules, status flows, RLS notes | DB/backend tasks (finalized in HRT-023) |
| [`API_CONTRACTS.md`](API_CONTRACTS.md) | 📐 Reference endpoints, payloads, error codes | Backend + data-layer tasks |
| [`NOTIFICATIONS.md`](NOTIFICATIONS.md) | 📐 Push types, copy, deep links, UTC scheduling | Notification-related tasks |
| [`AI_FEATURES.md`](AI_FEATURES.md) | 📐 The 4 AI features: prompts, limits, fallbacks, cost controls | AI tasks |

📐 = reference design, expected to grow and change during implementation. Product behavior never changes.

---

## What to Read for Which Task

| Task type | Read (in addition to AGENTS.md + AGENT_EXECUTE.md) |
|-----------|-----------------------------------------------------|
| Repo / project setup | ARCHITECTURE, GIT_GUIDE, FLUTTER_GUIDE (packages, layout) |
| UI task (Part A) | UI_UX_SPEC (screen sections), DESIGN_SYSTEM, FEATURES, USER_FLOWS, FLUTTER_GUIDE |
| Database task | DATABASE_SCHEMA, FEATURES (all), API_CONTRACTS, NOTIFICATIONS, AI_FEATURES |
| Backend feature | BACKEND_GUIDE, API_CONTRACTS, DATABASE_SCHEMA, FEATURES, USER_FLOWS |
| Flutter data wiring (Part B) | FLUTTER_GUIDE, API_CONTRACTS, DATABASE_SCHEMA (realtime), FEATURES |
| Notifications | NOTIFICATIONS, BACKEND_GUIDE, FEATURES |
| AI feature | AI_FEATURES, BACKEND_GUIDE, PRODUCT (tone) |
| Bug fix | The plan of the original task (`plans/`), FEATURES, USER_FLOWS |

---

## Precedence When Docs Disagree

1. **Product owner's latest decision** (recorded in the task plan)
2. **Product docs:** PRODUCT → PRD → FEATURES → USER_FLOWS (what the product does)
3. **Design docs:** HEARTLINE_UI_UX_SPEC → DESIGN_SYSTEM (how it looks)
4. **AGENTS.md + ARCHITECTURE + guides** (how it's built)
5. **Reference docs:** DATABASE_SCHEMA, API_CONTRACTS, NOTIFICATIONS, AI_FEATURES (starting points)

Any disagreement found goes into the task plan's Questions section and gets fixed in the docs.

---

## Repository Layout (summary)

```
heartline/
├── AGENTS.md          ← start here
├── README.md
├── docs/              ← all docs (this index lives here) + plans/
├── design/figma-mock/ ← visual reference
├── app/               ← Flutter (feature-first clean architecture)
├── backend/           ← Node.js + TypeScript API
├── supabase/          ← migrations, seed, config
└── .github/           ← CI + PR template
```

Full layout: `ARCHITECTURE.md` → "Repository Layout".
