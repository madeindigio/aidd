# MCP Servers for DIGIO-AI Kickstart Template

## Overview
MCP (Model Context Protocol) servers extend the capabilities of AI agents with specialized tools. The DIGIO Kickstart template configures several MCP servers to provide comprehensive development assistance.

## 1. hyper-mcp: Multi-Purpose Integration Server

**Repository**: https://github.com/tuananh/hyper-mcp (extended by Digio)

### Installation
```bash
brew install hyper-mcp  # macOS
# Or download from https://github.com/tuananh/hyper-mcp/releases/latest
```

### Built-in Tools
- **Google Search (Serper)**: Fast web search via Serper API
- **Google Search API**: Official Google Custom Search
- **Brave Search**: Privacy-focused search engine
- **Perplexity Search**: AI-powered research with citations
- **Bing Search**: Microsoft's search engine
- **YouTrack Integration**: Project management tasks
- **Logseq Integration**: Note-taking and knowledge base
- **Time Operations**: Get current time, parse RFC2822, offset calculations
- **Hash Functions**: SHA256, SHA512, MD5, base64 encoding

### Digio Custom Extensions
- **Serper Google Search**: Enhanced search with caching
- **Multiple Search Engines**: Brave, Perplexity for diverse results
- **Context7 Library Docs**: Fetch documentation for libraries
- **Fetch Webpage**: Download and parse web content

### Configuration
Located in `.ai/mcp/hyper-mcp.yaml`
Requires authentication tokens for:
- Serper API key
- Google Custom Search API key
- Brave Search API key
- Perplexity API key
- YouTrack instance and API token
- Logseq graph directory

## 2. mycommand-mcp: System Command Execution

**Repository**: https://github.com/sevir/mycommandmcp

### Installation
```bash
# Download from https://github.com/sevir/mycommandmcp/releases/latest
# Add to PATH
```

### Capabilities
- Execute bash/shell commands as MCP tools
- Highly configurable for security (command whitelisting)
- Terminal operations for automation
- CI/CD task execution
- File system operations
- Build and test commands

### Configuration
Located in `.ai/mcp/mycommand-mcp.yaml`
Defines:
- Allowed command patterns
- Environment variable access
- Output formatting
- Timeout settings

## 3. Serena: Code Analysis & Semantic Search MCP

**Repository**: https://github.com/sevir/serena-mcp (from Digio)

### Capabilities
- **Symbol Indexing**: Indexes classes, methods, functions, variables
- **Semantic Search**: Find code by meaning, not just keywords
- **Cross-language Support**: Python, JavaScript, TypeScript, Rust, Go, etc.
- **Memory & Chat**: Persistent conversation context

### Installation
Requires Python environment:
```bash
# Option 1: Using uvx (recommended)
brew install uv
uvx serena-mcp

# Option 2: Using pkgx
brew install pkgx
pkgx uvx serena-mcp
```

### Configuration
Located in `.serena/project.yml`
Defines:
- Project root directory
- Symbolic links for code navigation
- Indexing patterns
- Memory storage location

### Benefits
- AI agents understand codebase structure
- Can navigate and explain code
- Faster than reading raw files
- Support for refactoring suggestions

### Requirements
- Rust projects need `rust-analyzer` installed:
  https://github.com/rust-lang/rust-analyzer/releases

## 4. Remembrances: Knowledge Base & Project Memory

**Repository**: https://github.com/madeindigio/remembrances-mcp

### Installation
```bash
# Download from https://github.com/madeindigio/remembrances-mcp/releases/latest
# Add to PATH
```

### Capabilities
- **Facts**: Simple key-value storage for quick lookup
- **Vectors**: Semantic embeddings for similarity search
- **Entities & Relationships**: Knowledge graph for complex data
- **Documents**: Store and search project documentation
- **Hybrid Search**: Combined search across all layers

### Configuration
Located in `.vscode/mcp.json`
Requires:
- **Embedding Model**: Ollama (recommended) or OpenAI API key
- **Vector Database**: SurrealDB for persistence
- **Storage Path**: Directory for data files

### Embedding Options

#### Option 1: Ollama (Local, GPU recommended)
```bash
brew install ollama
ollama pull nomic-embed-text:latest
```
- Free and private
- Fast with GPU support
- No API costs

#### Option 2: OpenAI API
- Cloud-based
- No GPU requirement
- Requires API key and credits

### Database: SurrealDB
```bash
# Download from https://github.com/surrealdb/surrealdb/releases
# Add surrealdb to PATH
surrealdb start --auth
```

### Features
- **Memory Persistence**: Store task context and decisions
- **Project Learning**: Build knowledge over time
- **Pattern Recognition**: Find similar past solutions
- **Documentation**: Index and search project docs
- **Decision Tracking**: Log architectural decisions

### Use Cases
- Finding relevant code from past projects
- Tracking technical decisions and rationale
- Building project-specific knowledge
- Semantic search across documentation

## Integration Matrix

| Feature | hyper-mcp | mycommand-mcp | Serena | Remembrances |
|---------|-----------|---------------|--------|--------------|
| Web Search | ✅ | ❌ | ❌ | ❌ |
| Code Indexing | ❌ | ❌ | ✅ | ❌ |
| Semantic Search | ❌ | ❌ | ✅ | ✅ |
| Command Execution | ❌ | ✅ | ❌ | ❌ |
| Memory Storage | ❌ | ❌ | Partial | ✅ |
| Project Management | ✅ | ❌ | ❌ | Partial |
| Note Integration | ✅ | ❌ | ❌ | ❌ |

## Template Configuration Decisions

When user runs the template, they can choose:
```toml
include_remembrances = false/true  # Enable knowledge base
include_serena = false/true        # Enable code analysis
use_docker = false/true            # Use Docker vs local binaries
```

## Docker Alternative

For users without binary tools installed:
```bash
docker run -it --rm -v$(pwd):/workspace -w /workspace \
  ghcr.io/sevir/kickstart:latest \
  -o /workspace -d kickstart-template \
  https://github.com/madeindigio/aidd.git
```

Docker provides pre-built MCP servers:
- All tools available without system configuration
- Easier for cross-platform development
- Requires Docker Desktop installed
- Slight performance overhead

## Setup Complexity

### Minimal Setup (binary installation)
- Kickstart binary: ~50 MB
- MCP servers: ~100-200 MB total
- Total time: 10-15 minutes

### Full Setup (all features)
- All binaries
- Ollama with nomic-embed-text: ~2 GB
- SurrealDB: ~50 MB
- Serena indexing: 5-10 minutes
- Total time: 30-45 minutes

### Docker Setup
- Single docker command
- All tools included
- Setup time: 5 minutes
- Requires: Docker Desktop (~2 GB)

## Best Practices

1. **For quick prototyping**: Use Docker setup
2. **For production**: Use binary installation for better performance
3. **For CI/CD**: Use Docker for consistency
4. **For resource constraints**: Skip Remembrances/Serena, use only hyper-mcp
5. **For code-heavy projects**: Prioritize Serena for navigation
6. **For research projects**: Prioritize hyper-mcp for web search

## Troubleshooting

### Serena Issues
- Missing rust-analyzer: Install from releases page
- Slow indexing: Large projects may take time, be patient

### Remembrances Issues
- No GPU: Use OpenAI API embedding instead of Ollama
- Database connection: Ensure SurrealDB is running on correct port

### hyper-mcp Issues
- API key errors: Check token expiration and permissions
- Network issues: Verify internet connection and firewalls

## Future Additions

The template system allows easy addition of:
- Custom MCP servers
- Organization-specific tools
- Language-specific analyzers
- Specialized domain tools

Refer to MCP specification: https://modelcontextprotocol.io/
