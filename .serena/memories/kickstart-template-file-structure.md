# DIGIO Kickstart Template: File Structure & Configuration

## Directory Tree

```
kickstart-template/
├── template.toml                 # Main template configuration
├── README.md                     # Installation and usage guide
├── .ai/                          # AI configuration root
│   ├── AGENTS.md                # AI agent definitions
│   ├── opencode.json            # OpenCode AI generation config
│   ├── copilot/                 # VS Code Copilot settings
│   │   └── chatmodes/
│   │       └── compilation-and-log-fixer.chatmode.md  # Custom chat mode
│   ├── mcp/                     # MCP server configurations
│   │   ├── hyper-mcp.yaml      # Search & integration tools
│   │   └── mycommand-mcp.yaml  # System command execution
│   └── scripts/                 # Setup automation scripts
│       ├── hyper-env-run.sh    # hyper-mcp initialization
│       ├── index-serena.sh     # Serena indexing setup
│       ├── kilocode-symbolic-links.sh  # Kilocode linking
│       ├── opencode.sh         # OpenCode configuration
│       └── show-docker-instructions.sh # Docker help
├── .serena/                     # Serena MCP configuration
│   ├── project.yml             # Serena project settings
│   └── memories/               # Chat memory storage
└── .vscode/                     # VS Code configuration
    ├── mcp.json               # MCP server declarations
    └── settings.json          # VS Code settings
```

## File Descriptions

### template.toml
**Purpose**: Core Kickstart template configuration
**Contains**:
- Template metadata (name: "AI", version: 1)
- 12 interactive variables with prompts
- File handling rules (ignore, copy_without_render)
- Post-generation hooks

**Key Sections**:
```toml
name = "AI"
description = "An AI-powered configuration for any project"
ignore = ["README.md", "template.toml"]
copy_without_render = ["*.sh"]
post_gen_hooks = [
  {name = "setting up Serena", path = ".ai/scripts/index-serena.sh", 
   only_if = {name = "use_docker", value = false}},
  {name = "setting up Kilocode", path = ".ai/scripts/kilocode-symbolic-links.sh", 
   only_if = {name = "include_kilocode", value = true}},
]
```

### .ai/AGENTS.md
**Purpose**: Define AI agents for the project
**Contains**:
- Agent role definitions
- Capabilities and constraints
- Integration instructions
- Examples and use cases

**Typical Content**:
```markdown
# Agents Configuration

## Assistant Agent
- Role: General-purpose development assistant
- Uses: Copilot, Serena, hyper-mcp
- Capabilities: Code generation, documentation, debugging

## Research Agent
- Role: Information gathering and analysis
- Uses: hyper-mcp for web search
- Capabilities: Compare solutions, fetch documentation
```

### .ai/opencode.json
**Purpose**: Configure OpenCode AI code generator
**Contains**:
- Enabled features
- Code quality rules
- Generation constraints
- Language-specific settings

**Example Structure**:
```json
{
  "enabled": true,
  "maxTokens": 2048,
  "language": "{{ programming_language }}",
  "framework": "{{ programming_framework }}"
}
```

### .ai/copilot/chatmodes/compilation-and-log-fixer.chatmode.md
**Purpose**: Define custom Copilot chat mode
**Contains**:
- Chat mode name and description
- System prompt for the AI
- Input/output specifications
- Error handling rules

**Example**:
```markdown
# Compilation and Log Fixer

## Purpose
Analyze build errors and provide fixes

## System Prompt
You are an expert at reading compiler errors...

## Input Format
```error_log
[compilation error output]
```

## Output Format
- Error explanation
- Root cause
- Suggested fix
```

### .ai/mcp/hyper-mcp.yaml
**Purpose**: Configure hyper-mcp (search and integration server)
**Contains**:
- API keys and authentication
- Enabled tools/plugins
- Search engine preferences
- Integration URLs

**Required Configuration**:
```yaml
search:
  engines:
    - type: serper
      apiKey: ${SERPER_API_KEY}
    - type: brave
      apiKey: ${BRAVE_API_KEY}
    - type: perplexity
      apiKey: ${PERPLEXITY_API_KEY}
integrations:
  youtrack:
    baseUrl: https://your-youtrack-instance.com
    apiToken: ${YOUTRACK_TOKEN}
  logseq:
    graphDirectory: ${LOGSEQ_GRAPH_DIR}
```

### .ai/mcp/mycommand-mcp.yaml
**Purpose**: Configure command execution MCP server
**Contains**:
- Allowed command patterns
- Environment variables
- Output handling
- Security constraints

**Example Configuration**:
```yaml
commands:
  build:
    pattern: "{{ has_build_system }}"
    description: "Build the project"
    timeout: 300
  test:
    pattern: "{{ has_tests }}"
    description: "Run tests"
    timeout: 600
  lint:
    pattern: "npm run lint"
    allowedEnvVars:
      - NODE_ENV
      - PATH
```

### .ai/scripts/

#### hyper-env-run.sh
Sets up environment variables for hyper-mcp:
```bash
export SERPER_API_KEY="..."
export BRAVE_API_KEY="..."
export PERPLEXITY_API_KEY="..."
exec hyper-mcp
```

#### index-serena.sh
Initializes Serena code indexing:
```bash
# Create symbolic links to source code
# Run Serena indexer
# Generate code analysis database
```
**Runs if**: `use_docker = false`

#### kilocode-symbolic-links.sh
Sets up Kilocode keyboard shortcuts:
```bash
# Create symbolic links to keybindings
# Register Kilocode with VS Code
# Load default shortcuts
```
**Runs if**: `include_kilocode = true`

#### opencode.sh
Configures OpenCode AI generator:
```bash
# Set up code generation templates
# Configure language-specific rules
# Link to project structure
```

#### show-docker-instructions.sh
Displays Docker setup instructions:
```bash
# Print docker run commands
# Show port bindings
# Document volume mounts
```

### .serena/project.yml
**Purpose**: Configure Serena code analysis
**Contains**:
- Project root path
- Code source directories
- Symbolic links for navigation
- Indexing patterns
- Language-specific analyzers

**Structure**:
```yaml
name: "{{ project_name }}"
root: "."
sourceDirectories:
  - "src"
  - "lib"
symbolicLinks:
  - name: "source"
    path: "src"
  - name: "tests"
    path: "tests"
indexing:
  includePatterns:
    - "**/*.{{ file_extension }}"
  excludePatterns:
    - "node_modules/**"
    - ".git/**"
analyzers:
  - language: "{{ programming_language }}"
    enabled: true
```

### .serena/memories/
**Purpose**: Store Serena conversation history and context
**Location**: Directory for persistent chat memory
**Automatically managed** by Serena MCP

### .vscode/mcp.json
**Purpose**: Register MCP servers with VS Code
**Contains**:
- MCP server declarations
- Startup commands
- Configuration references
- Tool descriptions

**Format**:
```json
{
  "mcpServers": {
    "hyper-mcp": {
      "command": "hyper-mcp",
      "args": ["--config", ".ai/mcp/hyper-mcp.yaml"]
    },
    "mycommand-mcp": {
      "command": "mycommand-mcp",
      "args": ["--config", ".ai/mcp/mycommand-mcp.yaml"]
    },
    "serena": {
      "command": "uvx",
      "args": ["serena-mcp", "--project", ".serena/project.yml"]
    },
    "remembrances": {
      "command": "remembrances-mcp",
      "args": ["--db", "./remembrances_data"]
    }
  }
}
```

### .vscode/settings.json
**Purpose**: VS Code workspace settings
**Contains**:
- Editor configuration
- Extension settings
- Debug configurations
- Language-specific settings

**Template Variables Substituted**:
```json
{
  "projectName": "{{ project_name }}",
  "projectDescription": "{{ project_overview }}",
  "[{{ programming_language }}]": {
    "editor.defaultFormatter": "...",
    "editor.formatOnSave": true
  }
}
```

## Variable Templating Examples

### In .serena/project.yml
```yaml
name: "{{ project_name }}"  # Rendered: "my-api"
```

### In .ai/mcp/mycommand-mcp.yaml
```yaml
build_command: "{{ has_build_system }}"  # Rendered: "npm run build"
test_command: "{{ has_tests }}"          # Rendered: "npm test"
```

### In .vscode/settings.json
```json
"[{{ programming_language }}]": {}  # Rendered: "[typescript]"
```

### Case Conversion in Filenames (if used)
```
Example: {{ project_name | kebab_case }}/README.md
Renders: my-project/README.md
```

## Conditional File Inclusion

Files can be conditionally included based on template variables:

### Example: Database Setup
```
If database == "postgres":
  - Include: .db/postgres/docker-compose.yml
  - Include: .db/postgres/init.sql

If database == "none":
  - Skip database configuration
```

### Example: Docker Configuration
```
If use_docker == true:
  - Include: docker-compose.yml
  - Include: Dockerfile

If use_docker == false:
  - Include: .env.local.example
  - Include: local-setup.md
```

## Cleanup Operations

After generation, these files/directories are removed based on conditions:

```toml
cleanup = [
  # Remove Serena config if not selected
  { name = "include_serena", value = false, 
    paths = [".serena/", ".ai/scripts/index-serena.sh"] },
  
  # Remove Kilocode setup if not selected
  { name = "include_kilocode", value = false, 
    paths = [".ai/scripts/kilocode-symbolic-links.sh"] },
]
```

## Environment Variables Used

During template generation and execution:

| Variable | Used By | Purpose |
|----------|---------|---------|
| `SERPER_API_KEY` | hyper-mcp | Google search |
| `BRAVE_API_KEY` | hyper-mcp | Brave search |
| `PERPLEXITY_API_KEY` | hyper-mcp | Perplexity search |
| `YOUTRACK_TOKEN` | hyper-mcp | YouTrack API access |
| `LOGSEQ_GRAPH_DIR` | hyper-mcp | Logseq integration |
| `REMEMBRANCES_DB` | Remembrances | Database path |
| `OLLAMA_BASE_URL` | Remembrances | Ollama endpoint |
| `OPENAI_API_KEY` | Remembrances | Alternative embeddings |

## Post-Generation File Structure

After running the template, the generated project contains:

```
my-project/
├── .ai/                    # Configured AI agents
│   ├── AGENTS.md
│   ├── opencode.json
│   ├── copilot/
│   ├── mcp/
│   └── scripts/
├── .serena/                # Code analysis configuration
│   ├── project.yml
│   └── memories/
├── .vscode/                # VS Code configuration
│   ├── mcp.json
│   └── settings.json
├── src/                    # Project source code
├── package.json            # or pyproject.toml, go.mod, etc.
└── [other project files]   # Project-specific structure
```

## Key Insights

1. **Template Variables**: Replace `{{ variable }}` in all files except scripts
2. **Script Preservation**: `.sh` files copied as-is to preserve script syntax
3. **Post-Generation Automation**: Hooks run after file generation for additional setup
4. **Conditional Complexity**: Only relevant configuration appears based on choices
5. **Cross-platform**: Template works on Windows, macOS, Linux
6. **Modularity**: Each MCP server can be enabled/disabled independently
