# Kickstart Template System: Executive Summary

**Date**: October 16, 2025  
**Project**: DIGIO-AI Kickstart Template  
**Documentation Scope**: Comprehensive analysis of kickstart template system and DIGIO implementation

## Quick Overview

**What is Kickstart?**  
A Rust-based scaffolding tool that automatically generates project structures from templates using interactive questions and the Tera template engine.

**Why DIGIO Uses It?**  
The DIGIO Kickstart template automates the setup of complex AI agent environments (Copilot, Kilocode, OpenCode, MCP servers) in VS Code projects with a 5-minute interactive questionnaire.

## Project Location
- **Template Location**: `/www/digio-aidd/kickstart-template`
- **Main Repository**: https://github.com/madeindigio/aidd
- **Original Tool**: https://github.com/Keats/kickstart

## How Kickstart Works (4 Steps)

```
1. User Question Phase
   └─ Interactive prompts from template.toml variables
   └─ Conditional questions based on previous answers
   
2. File Rendering Phase
   └─ Tera template engine processes all files
   └─ {{ variable }} substitution from answers
   └─ Shell scripts copied as-is (no rendering)
   
3. File Generation Phase
   └─ Rendered files copied to output directory
   └─ Template-specific files ignored
   └─ Conditional files included/excluded by variable values
   
4. Post-Generation Phase
   └─ Execute setup hooks (pre-gen, post-gen)
   └─ Serena indexing for code analysis
   └─ Kilocode symbolic link creation
```

## DIGIO Template Configuration

### 12 Interactive Variables
| Category | Variables |
|----------|-----------|
| **Project** | project_name, project_overview |
| **Tech Stack** | programming_language, programming_framework, database |
| **AI Features** | include_remembrances, remembrances_db (conditional), include_serena, include_kilocode |
| **Deployment** | use_docker |
| **CI/CD** | has_build_system, has_tests |

### MCP Servers Configured
1. **hyper-mcp**: Web search, integrations (Google, Brave, Perplexity, YouTrack, Logseq)
2. **mycommand-mcp**: System command execution for automation
3. **Serena**: Code analysis and semantic search (if not using Docker)
4. **Remembrances**: Knowledge base with vector embeddings (if selected)

### Post-Generation Hooks
```bash
# If not using Docker: Setup Serena code indexing
.ai/scripts/index-serena.sh

# If including Kilocode: Create keyboard shortcut links
.ai/scripts/kilocode-symbolic-links.sh
```

## Template File Structure

```
Generated Project/
├── .ai/                    # AI agents configuration
│   ├── AGENTS.md          # Agent definitions
│   ├── opencode.json      # Code generation config
│   ├── copilot/           # VS Code Copilot settings
│   ├── mcp/               # MCP server configs
│   └── scripts/           # Setup automation
├── .serena/               # Code analysis
│   ├── project.yml        # Serena configuration
│   └── memories/          # Chat history storage
├── .vscode/               # VS Code workspace
│   ├── mcp.json          # MCP server registration
│   └── settings.json     # Editor settings
└── [project files]        # User's actual project
```

## Key Technical Features

### 1. Conditional Logic
Variables can have `only_if` clauses:
```toml
[[variables]]
name = "remembrances_db"
only_if = {name = "include_remembrances", value = true}
# Only appears if user chose to include Remembrances
```

### 2. Case Conversion Filters
```
{{ project_name | snake_case }}      → my_project_name
{{ project_name | kebab_case }}      → my-project-name
{{ project_name | upper_camel_case }} → MyProjectName
```

### 3. File Handling
- **Ignored**: template.toml, README.md (template-specific)
- **No rendering**: *.sh files (preserves script syntax)
- **Rendered**: All other files with {{ variables }}

### 4. Cleanup Operations
Remove configuration based on choices:
```toml
cleanup = [
    { name = "include_serena", value = false, 
      paths = [".serena/"] },
    { name = "include_kilocode", value = false, 
      paths = [".ai/scripts/kilocode-symbolic-links.sh"] },
]
```

## Installation Methods

### Binary Installation (Recommended)
```bash
brew install kickstart  # macOS
# or: cargo install kickstart --features=cli

# Run template
kickstart https://github.com/madeindigio/aidd -d kickstart-template -o .
```

### Docker Installation
```bash
docker run -it --rm -v$(pwd):/workspace -w /workspace \
  ghcr.io/sevir/kickstart:latest \
  -o /workspace -d kickstart-template \
  https://github.com/madeindigio/aidd.git
```

## Comparison with Alternatives

| Feature | Kickstart | Cookiecutter | Yeoman |
|---------|-----------|-------------|--------|
| **Binary Size** | ~50MB | N/A | N/A |
| **Installation** | Single binary | Requires Python | Requires Node.js |
| **Template Engine** | Tera (Rust) | Jinja2 (Python) | Custom (JS) |
| **Conditional Logic** | Native | Limited | Full |
| **Pre/Post Hooks** | ✅ | ✅ | ✅ |
| **Performance** | ⚡ Fast | Slower | Medium |
| **Cross-platform** | ✅ | ✅ | ✅ |

## Why Kickstart for DIGIO?

1. **Single Binary**: No dependency hell, no Python/Node requirement
2. **Cross-platform**: Works on Windows, macOS, Linux identically
3. **Tera Engine**: Powerful templating with case conversion
4. **Conditional Workflows**: Ask only relevant questions
5. **Automation Hooks**: Run setup scripts after generation
6. **Performance**: Written in Rust, very fast execution

## Template Workflow Diagram

```
┌─────────────────────────────────────────────────────────┐
│ User runs: kickstart https://github.com/madeindigio/aidd │
│            -d kickstart-template -o .                     │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Kickstart reads template.toml and starts questions:     │
│ 1. Project name, overview                               │
│ 2. Language, framework, database                        │
│ 3. Include Remembrances? (no → skip next)              │
│ 4. Include Serena? Include Kilocode?                    │
│ 5. Build/test commands                                  │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Render files with Tera template engine                  │
│ - Process {{ variable }} substitutions                  │
│ - Apply case conversion filters                         │
│ - Copy .sh files without rendering                      │
│ - Exclude ignored/conditional files                     │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Copy rendered files to output directory                 │
│ - .ai/ (agents, MCP configs)                           │
│ - .serena/ (code analysis)                             │
│ - .vscode/ (editor settings)                           │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Execute post-gen hooks:                                 │
│ - If !use_docker: Run index-serena.sh                  │
│ - If include_kilocode: Run kilocode-symbolic-links.sh   │
│                                                         │
│ Result: Fully configured project ready to use!         │
└─────────────────────────────────────────────────────────┘
```

## Configuration Artifacts Generated

### For Each Generated Project:

1. **`.ai/AGENTS.md`**: AI agent roles and capabilities
2. **`.ai/opencode.json`**: Code generation parameters
3. **`.ai/copilot/chatmodes/`**: Custom Copilot chat modes
4. **`.ai/mcp/hyper-mcp.yaml`**: Search engine config (requires API keys)
5. **`.ai/mcp/mycommand-mcp.yaml`**: Command execution rules
6. **`.ai/scripts/`**: 5 setup automation scripts
7. **`.serena/project.yml`**: Code analysis configuration
8. **`.vscode/mcp.json`**: MCP server registration
9. **`.vscode/settings.json`**: VS Code workspace settings

## Integration Points

```
Kickstart Template
    │
    ├─ Generates → VS Code Configuration (.vscode/mcp.json)
    │
    ├─ Generates → Copilot Settings (.ai/copilot/)
    │
    ├─ Generates → Serena Config (.serena/project.yml)
    │
    ├─ Generates → OpenCode Config (.ai/opencode.json)
    │
    ├─ Generates → MCP Server Configs (.ai/mcp/*)
    │
    └─ Runs Hooks → Setup Scripts (symlinks, indexing)
```

## Environment Variables

Used by MCP servers after generation:

- `SERPER_API_KEY`: Google search via Serper
- `BRAVE_API_KEY`: Brave search integration
- `PERPLEXITY_API_KEY`: Perplexity research assistant
- `YOUTRACK_TOKEN`: Project management integration
- `LOGSEQ_GRAPH_DIR`: Note-taking integration
- `REMEMBRANCES_DB`: Knowledge base storage path
- `OLLAMA_BASE_URL`: Local embedding model (alternative: OPENAI_API_KEY)

## Future Extensibility

The template system supports:
1. Adding new MCP server integrations
2. Language-specific templates
3. Framework-specific configurations
4. Organization-specific variables
5. Custom validation logic in pre-gen hooks
6. Additional post-gen setup steps

## Documentation Created

Comprehensive knowledge base articles stored:
1. **kickstart-system-documentation.md** - Complete Kickstart system details
2. **digio-kickstart-implementation-guide.md** - DIGIO-specific implementation
3. **mcp-servers-configuration.md** - MCP servers setup and requirements
4. **kickstart-template-file-structure.md** - File-by-file reference

## Key Takeaway

Kickstart templates eliminate manual AI agent configuration by automating setup of complex environments. The DIGIO template transforms **hours of manual configuration** into a **5-minute questionnaire**, ensuring consistency and best practices across all projects using DIGIO AI tools.

**Status**: ✅ Fully documented and ready for reference
