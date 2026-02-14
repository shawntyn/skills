# Skills Generator

Generate [Agent Skills](https://agentskills.io/home) from project documentation.

PLEASE STRICTLY FOLLOW THE BEST PRACTICES FOR SKILL: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

- Focus on agents capabilities and practical usage patterns. 
- Ignore user-facing guides, introductions, get-started, install guides, etc.
- Ignore content that LLM agents already confident about in their training data.
- Make the skill as concise as possible, avoid creating too many references.

## Skill Source Types

There are two types of skill sources. The project lists are defined in `meta.ts`:

### Type 1: Synced Skills (`vendor/`)

For projects that **already maintain their own skills**. We clone their repo as a submodule and sync specified skills to ours.

- **Projects:** Slidev, Vercel AI SDK, Anthropics, Turborepo, Agent Skills
- **Workflow:** Pull updates → Copy specified skills (with optional renaming)
- **Source:** `vendor/{project}/skills/{skill-name}/`
- **Config:** Each vendor specifies which skills to sync and their output names in `meta.ts`

### Type 2: Hand-written Skills

For skills that are written by Shawntyn Ji with his preferences, experience, tastes and best practices.

You don't need to do anything about them unless being asked.

## Repository Structure

```
.
├── meta.ts                     # Project metadata (submodules & vendors)
├── scripts/
│   └── sync.ts                 # Sync script (see below)
├── vendor/                     # Submodule repositories (cloned from meta.ts submodules)
│   └── {project}/
│       └── skills/
│           └── {skill-name}/   # Source skills to sync
│
└── skills/                     # Output directory (synced skills)
    └── {output-name}/          # Renamed based on meta.ts vendors config
        ├── SKILL.md            # Index of all skills
        ├── SYNC.md             # Tracking metadata (for synced skills)
        └── references/
            └── *.md            # Individual skill files
```

**Note:** 
- `submodules` in `meta.ts` defines which repositories to clone as submodules into `vendor/`
- `vendors` in `meta.ts` defines which skills to sync and their output names

## Sync Script

The `scripts/sync.ts` script automates the entire sync workflow:

1. **Update `.gitmodules`** - Sync `.gitmodules` with submodule URLs defined in `meta.ts`
2. **Update submodules** - Pull latest changes for all repositories in `vendor/`
3. **Copy skills** - For each vendor defined in `meta.ts`, copy the specified skills from `vendor/{project}/skills/{skill-name}/` to `skills/{output-name}/` (with optional renaming)

### Usage

```bash
# Run the sync script
nr sync
```

The script reads configuration from `meta.ts`:
- `submodules` - repositories to clone as submodules
- `vendors` - which skills to sync and their output names

**Important:** For synced skills, the output name is configured in `meta.ts` and may differ from the source skill name.

## Workflows

### Using the Sync Script (Recommended)

Run the sync script to update all submodules and sync skills:

```bash
nr sync
```

This will:
1. Update `.gitmodules` with the latest submodule URLs from `meta.ts`
2. Pull latest changes for all vendor repositories
3. Copy specified skills to `skills/` directory with optional renaming

### Manual Sync (For Individual Updates)

If you need to sync a specific vendor manually:

#### Initial Sync

1. **Copy** specified skills from `vendor/{project}/skills/{skill-name}/` to `skills/{output-name}/`
2. **Create** `SYNC.md` with the vendor git SHA

#### Updating Synced Skills

1. **Run** `nr sync` to update all vendors and skills at once, OR manually:
2. **Check** git diff since the SHA recorded in `SYNC.md`:
   ```bash
   cd vendor/{project}
   git diff {old-sha}..HEAD -- skills/{skill-name}/
   ```
3. **Copy** changed files from `vendor/{project}/skills/{skill-name}/` to `skills/{output-name}/`
4. **Update** `SYNC.md` with new SHA

**Note:** Do NOT modify synced skills manually. Changes should be contributed upstream to the vendor project.

## File Formats

### `SKILL.md`

Index file listing all skills with brief descriptions. Name should be in `kebab-case`.

The version should be the date of the last sync.

Also record the version of the tool/project when the skills were generated.

```markdown
---
name: {name}
description: {description}
metadata:
 author: Shawntyn Ji
 version: "2026.2.14"
 source: Generated from {source-url}, scripts located at https://github.com/shawntyn/skills
---

> The skill is based on {project} v{version}, generated at {date}.

// Some concise summary/context/introduction of the project

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Markdown Syntax | Slide separators, frontmatter, notes, code blocks | [core-syntax](references/core-syntax.md) |
| Animations | v-click, v-clicks, motion, transitions | [core-animations](references/core-animations.md) |
| Headmatter | Deck-wide configuration options | [core-headmatter](references/core-headmatter.md) |

## Features

### Feature a

| Topic | Description | Reference |
|-------|-------------|-----------|
| Feature A Editor | Description of feature a | [feature-a](references/feature-a-foo.md) |
| Feature A Preview | Description of feature b | [feature-b](references/feature-a-bar.md) |

### Feature b

| Topic | Description | Reference |
|-------|-------------|-----------|
| Feature B | Description of feature b | [feature-b](references/feature-b-bar.md) |

// ...
```

### `SYNC.md`

Tracking metadata for synced skills (Type 1):

```markdown
# Sync Info

- **Source:** `vendor/{project}/skills/{skill-name}`
- **Git SHA:** `abc123def456...`
- **Synced:** 2024-01-15
```

### `references/*.md`

Individual skill files. One concept per file.

At the end of the file, include the reference links to the source documentation.

```markdown
---
name: {name}
description: {description}
---

# {Concept Name}

Brief description of what this skill covers.

## Usage

Code examples and practical patterns.

## Key Points

- Important detail 1
- Important detail 2

<!--
Source references:
- {source-url}
- {source-url}
- {source-url}
-->
```

## Writing Guidelines

1. **Rewrite for agents** - Don't copy docs verbatim; synthesize for LLM consumption
2. **Be practical** - Focus on usage patterns and code examples
3. **Be concise** - Remove fluff, keep essential information
4. **One concept per file** - Split large topics into separate skill files
5. **Include code** - Always provide working code examples
6. **Explain why** - Not just how to use, but when and why

## Supported Projects

See `meta.ts` for the canonical list of projects and their repository URLs.
