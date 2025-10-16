# DIGIO-AI Kickstart Template: Implementation Guide

## What is the DIGIO-AI Kickstart Template?

The `kickstart-template` folder in `/www/digio-aidd/` is a template generator that automatically sets up AI agent configurations for VS Code projects. It uses the Kickstart tool to scaffold new projects with pre-configured:
- Copilot integration settings
- Kilocode symbolic links
- OpenCode configuration
- MCP (Model Context Protocol) servers

## Template Structure

```
kickstart-template/
├── template.toml           # Configuration defining variables and hooks
├── README.md              # Installation and usage instructions
├── .ai/                   # AI configuration files
│   ├── AGENTS.md         # AI agent definitions
│   ├── opencode.json     # OpenCode configuration
│   ├── copilot/          # VS Code Copilot settings
│   ├── mcp/              # MCP server configurations
│   └── scripts/          # Setup scripts
├── .serena/              # Serena MCP configuration
└── .vscode/              # VS Code settings
```

## How It Works (Step-by-Step)

### 1. User Runs Kickstart
```bash
kickstart https://github.com/madeindigio/aidd -d kickstart-template -o .
```

### 2. Template Engine Asks Interactive Questions
Kickstart reads `template.toml` and presents questions to the user:
- Project name and overview
- Programming language/framework
- Database preference
- AI features (Remembrances, Serena, Kilocode)
- Build and test commands

Some questions are **conditional** - they only appear based on previous answers using `only_if` clauses.

### 3. File Rendering
After collecting answers, Kickstart:
- Renders all project files through Tera template engine
- Variables from questions become available as `{{ variable_name }}`
- Shell scripts (*.sh) are copied without rendering to preserve script syntax
- README.md and template.toml are ignored (not copied)

### 4. Post-Generation Hooks
After files are generated, two hooks can run:
- **index-serena.sh**: Creates Serena symbolic links (if not using Docker)
- **kilocode-symbolic-links.sh**: Sets up Kilocode integration (if selected)

## Variable Configuration Details

### 12 Interactive Variables

| Variable | Type | Default | Purpose |
|----------|------|---------|---------|
| use_docker | boolean | true | Use Docker for MCP servers |
| project_name | string | "some-project" | Project identifier |
| project_overview | string | "overview" | Project description |
| programming_language | string | "Typescript" | Language choice |
| programming_framework | string | "Deno" | Framework choice |
| database | choice | "none" | Database system |
| include_remembrances | boolean | false | Enable Remembrances MCP |
| remembrances_db | string | "./remembrances_data" | Remembrances location (conditional) |
| include_serena | boolean | false | Enable Serena MCP |
| include_kilocode | boolean | true | Enable Kilocode |
| has_build_system | string | "" | Build command |
| has_tests | string | "" | Test command |

### Conditional Variables
```toml
[[variables]]
name = "remembrances_db"
only_if = {name = "include_remembrances", value = true}
# Only appears if user selected "yes" to include_remembrances
```

## MCP Servers Integration

### hyper-mcp
Multi-purpose integration server with tools for:
- Web search (Google, Brave, Perplexity, Bing, Serper)
- Project management (YouTrack)
- Note-taking (Logseq)

### mycommand-mcp
Executes system commands as MCP tools for CI/CD and automation.

### Serena
Code analysis server providing:
- Symbol indexing (classes, methods, functions, variables)
- Semantic code search
- Integration with rust-analyzer for Rust projects

### Remembrances
Knowledge base for project information:
- Stores facts, entities, relationships
- Vector embeddings for semantic search
- Uses Ollama or OpenAI embeddings
- Requires SurrealDB for persistence

## Key Features

### 1. Conditional Configuration
Questions adapt based on user choices - no unnecessary prompts.

### 2. Case Conversion
Variables can be transformed:
```
{{ project_name | snake_case }}
{{ project_name | kebab_case }}
{{ project_name | upper_camel_case }}
```

### 3. Automated Setup
Post-gen hooks automate:
- Serena indexing for code analysis
- Symbolic link creation for Kilocode
- Potentially: git initialization, dependency installation

### 4. File Filtering
- **Ignored**: Template-specific files (README.md, template.toml)
- **Copy without render**: Scripts to preserve syntax
- **Conditional cleanup**: Remove unused configuration based on choices

## Installation Methods

### Option 1: Kickstart Binary
Fastest for local development:
```bash
brew install kickstart  # macOS
cargo install kickstart --features=cli  # Any platform
kickstart https://github.com/madeindigio/aidd -d kickstart-template -o .
```

### Option 2: Docker
Platform-independent, no binary needed:
```bash
docker run -it --rm -v$(pwd):/workspace -w /workspace \
  ghcr.io/sevir/kickstart:latest \
  -o /workspace -d kickstart-template \
  https://github.com/madeindigio/aidd.git
```

## Why Kickstart Over Alternatives?

| Feature | Kickstart | Cookiecutter | Yeoman |
|---------|-----------|-------------|--------|
| Language | Rust (single binary) | Python | Node.js |
| Cross-platform | ✅ | ✅ | ✅ |
| Template Engine | Tera | Jinja2 | Custom |
| Conditional Logic | ✅ | Limited | ✅ |
| Pre/Post Hooks | ✅ | ✅ | ✅ |
| Installation | Simple | Requires Python | Requires Node.js |
| Performance | Fast | Slower | Medium |

## Future Extensions

The template system allows for:
1. **Additional MCP servers** - Add new tool integrations
2. **Language-specific templates** - Branch templates by programming_language
3. **Framework-specific configs** - Conditional Deno vs Node.js settings
4. **Database-specific setup** - Docker compose files for selected databases
5. **Pre-deployment hooks** - Validation before project generation
6. **Custom variables** - Add organization-specific configurations

## Integration with DIGIO Tools

The template seamlessly integrates DIGIO's AI development suite:
- **Serena**: For code understanding and navigation
- **Remembrances**: For knowledge base and project memory
- **Kilocode**: For keyboard shortcuts and code navigation
- **OpenCode**: For AI-powered code generation
- **VS Code Copilot**: For inline suggestions and chat

## Key Takeaway
Kickstart templates eliminate manual configuration by automating the setup of complex AI agent environments. The DIGIO template transforms hours of configuration into a 5-minute interactive questionnaire, ensuring consistency and best practices across projects.
