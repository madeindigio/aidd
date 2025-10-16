# Kickstart Template System Documentation

## Overview
Kickstart is a scaffolding tool (available at https://github.com/Keats/kickstart) that automates project initialization by using pre-made templates. It's a powerful alternative to cookiecutter (Python) and Yeoman (Node.js).

## Core Concept
Kickstart uses a `template.toml` configuration file to define how projects are generated. When running kickstart, it:
1. Reads the template configuration
2. Asks users a series of questions (based on variables defined in template.toml)
3. Renders all files using Tera templating engine (similar to Jinja2)
4. Copies files to the output directory
5. Executes optional hooks (pre-gen and post-gen)
6. Performs optional cleanup

## Key Features of Kickstart

### Template Engine
- Uses **Tera** templating engine (Jinja2-inspired)
- Supports variable interpolation: `{{ variable_name }}`
- Includes built-in case conversion filters:
  - `upper_camel_case`: UpperCamelCase
  - `camel_case`: lowerCamelCase
  - `snake_case`: snake_case
  - `kebab_case`: kebab-case
  - `shouty_snake_case`: SHOUTY_SNAKE_CASE
  - `title_case`: Title Case
  - `shouty_kebab_case`: SHOUTY-KEBAB-CASE

### File and Directory Templating
- Directory names can be templated: `{{ repo_name }}/{{author}}.md`
- Filenames can also use templating
- On Windows, use `$$` separator instead of `|` for filters in paths

### Installation
- Available through crates.io: `cargo install kickstart --features=cli`
- Available as pre-built binary on GitHub Releases
- macOS: `brew install kickstart`

## Template Configuration (template.toml)

### Required Fields
1. **name**: Name of the template
2. **kickstart_version**: Schema version (currently only 1)

### Optional Configuration Sections

#### Basic Metadata
```toml
description = "A fully-featured Django template"
url = "https://google.com"
authors = ["Author Name"]
keywords = ["django", "python"]
follow_symlinks = false
```

#### File/Directory Handling
```toml
# Files NOT to copy (template-specific files like README, CI configs)
ignore = [
    "README.md",
    "CONTRIBUTING.md",
    ".travis.yml",
    "docs",
]

# Use this directory as template base (not root)
directory = "some-directory"

# Files to copy WITHOUT rendering through Tera (e.g., HTML, binary files)
copy_without_render = [
    "*.html",
    "*.png",
    "{{project_name}}/something.html",
]

# Post-generation cleanup paths based on variable values
cleanup = [
    { name = "spa", value = true, paths = ["{{ project_name }}/templates/"] },
    { name = "auth_method", value = "none", paths = ["{{ project_name }}/docs/auth.md"] },
]
```

#### Hooks
Hooks are executable scripts (bash, python, bat, etc.) that run at specific stages:

```toml
# Pre-gen hooks: Run after questions answered, before file generation
# Useful for complex validation, dependencies checking
pre_gen_hooks = [
    { name = "validate", path = "validate_vars.py" },
]

# Post-gen hooks: Run after files are generated
# Useful for git init, installing dependencies, additional setup
post_gen_hooks = [
    { name = "finish setup", path = "finish_setup.sh" },
    { name = "install deps", path = "install_deps.sh", only_if = { name = "spa", value = true} },
]
```

Hooks can be conditional with `only_if` clause. They receive all template variables as environment/context.

### Variables Definition
Variables define interactive prompts shown to the user:

```toml
[[variables]]
name = "project_name"              # Variable name in Tera context
default = "my-project"             # Default value (determines type)
prompt = "Project name?"           # Question shown to user
validation = "^([a-zA-Z][a-zA-Z0-9_-]+)$"  # Optional regex validation
```

#### Variable Options

**Required:**
- `name`: Variable identifier
- `default`: Default value (deduces type: string, bool, integer)
- `prompt`: Question text

**Optional:**
- `choices`: List of values for user selection
- `only_if`: Conditional prompt (only asks if another variable has specific value)
- `validation`: Regex pattern for string validation

#### Example: Conditional Variables
```toml
[[variables]]
name = "database"
choices = ["postgres", "mysql", "sqlite"]
default = "postgres"
prompt = "Which database?"

[[variables]]
name = "pg_version"
default = "10.4"
prompt = "Which Postgres version?"
choices = ["10.4", "10.3", "10.2", "9.6"]
only_if = { name = "database", value = "postgres" }  # Only ask if postgres selected
```

## DIGIO-AI Kickstart Template

The AI Kickstart template (`/www/digio-aidd/kickstart-template`) is specifically designed to configure AI agents in VS Code projects. It supports:

### Configuration Options
1. **use_docker**: Whether to use Docker versions of MCP servers (default: true)
2. **project_name**: Project identifier
3. **project_overview**: Project description
4. **programming_language**: Language choice (default: Typescript)
5. **programming_framework**: Framework choice (default: Deno)
6. **database**: Database selection (none, postgres, mysql, sqlite, mongodb)
7. **include_remembrances**: Include Remembrances AI memory system
8. **remembrances_db**: Database path (conditional on include_remembrances)
9. **include_serena**: Include Serena AI MCP assistance
10. **include_kilocode**: Include Kilocode configuration
11. **has_build_system**: Build command for the project
12. **has_tests**: Test command for the project

### MCP Servers Included
The template configures several MCP (Model Context Protocol) servers:

1. **hyper-mcp**: Multi-purpose search and integration tools
   - Integrations: Google Search, Brave, Perplexity, Bing, YouTrack, Logseq
   - Installation: Latest release from https://github.com/tuananh/hyper-mcp/releases

2. **mycommand-mcp**: Execute system commands as MCP tools
   - Installation: https://github.com/sevir/mycommandmcp/releases

3. **Serena**: Code analysis and semantic search MCP
   - Index of classes, methods, functions, variables
   - Semantic code search capabilities
   - Requires: uv or pkgx for Python execution
   - Requires: rust-analyzer for Rust projects

4. **Remembrances**: Knowledge base for project information
   - Stores facts, entities, relationships, documents
   - Requires: Ollama (with nomic-embed-text model) or OpenAI API key
   - Requires: SurrealDB for data storage

### Post-Generation Hooks
1. **Setting up Serena** (if not using Docker)
   - Runs: `.ai/scripts/index-serena.sh`
   - Creates symbolic links for code analysis

2. **Setting up Kilocode** (if include_kilocode = true)
   - Runs: `.ai/scripts/kilocode-symbolic-links.sh`

### File Configuration
- **Ignored files**: README.md, template.toml (template-specific)
- **Copy without render**: Shell scripts (*.sh) - preserves script syntax
- **AI Configuration Structure**:
  - `.ai/AGENTS.md`: Agent definitions
  - `.ai/opencode.json`: OpenCode configuration
  - `.ai/copilot/`: VS Code Copilot settings
  - `.ai/mcp/`: MCP server configurations
  - `.ai/scripts/`: Setup and configuration scripts
  - `.serena/`: Serena project configuration
  - `.vscode/`: VS Code settings and MCP configuration

## Usage

### With kickstart binary
```bash
kickstart https://github.com/madeindigio/aidd -d kickstart-template -o .
```

### With Docker
```bash
docker run -it --rm -v$(pwd):/workspace -w /workspace \
  ghcr.io/sevir/kickstart:latest -o /workspace -d kickstart-template \
  https://github.com/madeindigio/aidd.git
```

## Important Considerations

### Case Conversion Filters
Use in variable defaults: `{{ project_name | snake_case }}`

### Windows Compatibility
- Use `$$` in filenames/paths instead of `|` for filters
- Keep using `|` inside file templates

### Path Safety
- Kickstart avoids path traversals in cleanup actions
- Cleanup paths are properly validated

### Symlink Support
- As of v0.5.0, templates can follow symlinks during copying
- Controlled by `follow_symlinks` setting

## Template Versioning
- Current schema version: 1
- Kickstart maintains backward compatibility
- Check README for changelog updates when upgrading

## References
- Official Documentation: https://github.com/Keats/kickstart
- Example Templates: https://github.com/Keats/rust-cli-template
- Tera Template Engine: https://keats.github.io/tera/docs/
