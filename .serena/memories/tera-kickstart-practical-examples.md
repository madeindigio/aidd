# Tera in Kickstart: Practical Examples

**Context**: Using Tera template engine for Kickstart project scaffolding  
**Use Cases**: File generation, conditional configuration, dynamic naming

---

## Real-World Kickstart Examples

### 1. Project Configuration Files

#### Generate `package.json` (Node.js/Deno)
```jinja2
{
  "name": "{{ project_name | kebab_case }}",
  "version": "0.1.0",
  "description": "{{ project_overview }}",
  "type": "module",
  "scripts": {
    {% if has_build_system %}
    "build": "{{ has_build_system }}",
    {% endif %}
    {% if has_tests %}
    "test": "{{ has_tests }}",
    {% endif %}
    "dev": "deno run --watch src/main.ts"
  },
  "keywords": ["{{ programming_language | lower }}", "{{ programming_framework | lower }}"],
  "license": "MIT"
}
```

#### Generate `pyproject.toml` (Python)
```toml
[project]
name = "{{ project_name | kebab_case }}"
version = "0.1.0"
description = "{{ project_overview }}"

[build-system]
requires = ["setuptools", "wheel"]
build-backend = "setuptools.build_meta"

[tool.pytest.ini_options]
{% if has_tests %}
testpaths = ["tests"]
python_files = ["test_*.py"]
{% endif %}
```

#### Generate `Cargo.toml` (Rust)
```toml
[package]
name = "{{ project_name | snake_case }}"
version = "0.1.0"
edition = "2021"
description = "{{ project_overview }}"

[dependencies]
{% if database == "postgres" %}
tokio-postgres = "0.7"
{% elif database == "mysql" %}
mysql = "24.1"
{% elif database == "mongodb" %}
mongodb = "2.0"
{% endif %}

{% if include_remembrances %}
serde_json = "1.0"
{% endif %}
```

### 2. Environment Configuration

#### Generate `.env.template`
```bash
# Project: {{ project_name }}
# Language: {{ programming_language }}
# Framework: {{ programming_framework }}

{% if use_docker %}
# Docker mode enabled
DOCKER_ENABLED=true
{% else %}
# Local binary mode
DOCKER_ENABLED=false
{% endif %}

{% if database != "none" %}
# Database configuration
DB_TYPE={{ database }}
DB_HOST=localhost
DB_PORT={% if database == "postgres" %}5432{% elif database == "mysql" %}3306{% elif database == "mongodb" %}27017{% endif %}

DB_NAME={{ project_name | snake_case }}
DB_USER=admin
DB_PASSWORD=changeme
{% endif %}

{% if include_remembrances %}
# Remembrances knowledge base
REMEMBRANCES_DB={{ remembrances_db }}
OLLAMA_BASE_URL=http://localhost:11434
{% endif %}

{% if include_serena %}
# Serena code analysis
SERENA_PROJECT_ROOT=.
{% endif %}
```

### 3. Documentation

#### Generate `README.md`
```markdown
# {{ project_name | title_case }}

{{ project_overview }}

## Tech Stack

- **Language**: {{ programming_language }}
- **Framework**: {{ programming_framework }}
- **Database**: {% if database != "none" %}{{ database | title_case }}{% else %}None{% endif %}

## Quick Start

{% if use_docker %}
### Docker

\`\`\`bash
docker-compose up
\`\`\`
{% else %}
### Local Setup

1. Install dependencies
2. Configure `.env` from `.env.template`
3. Run the project:

\`\`\`bash
{% if has_build_system %}{{ has_build_system }}{% else %}npm start{% endif %}
\`\`\`
{% endif %}

## Testing

{% if has_tests %}
\`\`\`bash
{{ has_tests }}
\`\`\`
{% else %}
No tests configured yet.
{% endif %}

## Project Structure

{% if programming_language == "Typescript" or programming_language == "JavaScript" %}
\`\`\`
{{ project_name }}/
├── src/
│   ├── main.ts
│   └── utils/
├── tests/
├── package.json
└── README.md
\`\`\`
{% elif programming_language == "Python" %}
\`\`\`
{{ project_name }}/
├── {{ project_name | snake_case }}/
│   ├── __init__.py
│   └── main.py
├── tests/
├── pyproject.toml
└── README.md
\`\`\`
{% elif programming_language == "Rust" %}
\`\`\`
{{ project_name }}/
├── src/
│   └── main.rs
├── tests/
├── Cargo.toml
└── README.md
\`\`\`
{% endif %}

## AI Tools Integration

{% if include_serena %}
### Serena Code Analysis
Semantic code search and indexing enabled.
{% endif %}

{% if include_remembrances %}
### Remembrances Knowledge Base
Project memory and documentation storage enabled.
{% endif %}
```

### 4. GitHub Workflows

#### Generate `.github/workflows/ci.yml`
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup
        run: |
          {% if use_docker %}
          docker-compose up -d
          {% else %}
          # Install dependencies
          {% endif %}
      
      {% if has_tests %}
      - name: Run tests
        run: {{ has_tests }}
      {% endif %}
      
      {% if has_build_system %}
      - name: Build
        run: {{ has_build_system }}
      {% endif %}
```

### 5. Docker Configuration

#### Generate `docker-compose.yml`
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - PROJECT_NAME={{ project_name }}
    {% if database != "none" %}
    depends_on:
      - db
    {% endif %}

  {% if database == "postgres" %}
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: {{ project_name | snake_case }}
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  {% elif database == "mysql" %}
  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: {{ project_name | snake_case }}
      MYSQL_ROOT_PASSWORD: mysql
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  {% elif database == "mongodb" %}
  db:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
  {% endif %}

{% if database != "none" %}
volumes:
  {% if database == "postgres" %}
  postgres_data:
  {% elif database == "mysql" %}
  mysql_data:
  {% elif database == "mongodb" %}
  mongo_data:
  {% endif %}
{% endif %}
```

### 6. Makefile Generation

#### Generate `Makefile`
```makefile
.PHONY: help build test run clean

PROJECT_NAME := {{ project_name }}
LANGUAGE := {{ programming_language }}

help:
	@echo "{{ project_name | title_case }} - Available commands"
	@echo "make build    - Build the project"
	@echo "make test     - Run tests"
	@echo "make run      - Run the project"
	@echo "make clean    - Clean build artifacts"

build:
{% if has_build_system %}
	{{ has_build_system }}
{% else %}
	@echo "No build system configured"
{% endif %}

test:
{% if has_tests %}
	{{ has_tests }}
{% else %}
	@echo "No tests configured"
{% endif %}

run:
{% if use_docker %}
	docker-compose up
{% else %}
	{% if programming_language == "Typescript" or programming_language == "JavaScript" %}
	npm start
	{% elif programming_language == "Python" %}
	python -m {{ project_name | snake_case }}
	{% elif programming_language == "Rust" %}
	cargo run
	{% endif %}
{% endif %}

clean:
	@find . -type d -name __pycache__ -exec rm -rf {} +
	@find . -type f -name "*.pyc" -delete
	@rm -rf build dist
```

### 7. VSCode Settings

#### Generate `.vscode/settings.json`
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": null,
  "[{{ programming_language | lower }}]": {
    {% if programming_language == "Python" %}
    "editor.defaultFormatter": "ms-python.python",
    "editor.rulers": [88, 120]
    {% elif programming_language == "Typescript" or programming_language == "JavaScript" %}
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
    {% elif programming_language == "Rust" %}
    "editor.defaultFormatter": "rust-lang.rust-analyzer",
    "editor.formatOnSave": true
    {% endif %}
  },
  "files.exclude": {
    "**/__pycache__": true,
    "**/node_modules": true,
    "**/target": true
  },
  "search.exclude": {
    "**/.git": true,
    "{% if include_remembrances %}.remembrances_data{% endif %}": true
  }
}
```

### 8. AI Agents Configuration

#### Generate `.ai/AGENTS.md`
```markdown
# AI Agents for {{ project_name }}

## Overview
Project: **{{ project_name }}**  
Language: **{{ programming_language }}**  
Framework: **{{ programming_framework }}**

## Available Agents

### 1. Development Assistant
- **Role**: General-purpose development support
- **Tools**: Copilot, {% if include_serena %}Serena{% endif %}, {% if include_remembrances %}Remembrances{% endif %}
- **Capabilities**:
  - Code generation and completion
  - Bug fixing and debugging
  - Documentation assistance
  - {% if include_serena %}Code navigation and understanding{% endif %}

### 2. Build & Testing Agent
- **Role**: CI/CD and quality assurance
- **Tools**: mycommand-mcp
- **Capabilities**:
  {% if has_build_system %}
  - Run builds: `{{ has_build_system }}`
  {% endif %}
  {% if has_tests %}
  - Execute tests: `{{ has_tests }}`
  {% endif %}
  - Deploy and release management

### 3. Research Agent
- **Role**: Information gathering and exploration
- **Tools**: hyper-mcp (search engines, integrations)
- **Capabilities**:
  - Web search for solutions
  - Documentation lookup
  - Technology comparison

{% if include_remembrances %}
### 4. Knowledge Management Agent
- **Role**: Project memory and learning
- **Tools**: Remembrances knowledge base
- **Capabilities**:
  - Store project decisions
  - Track patterns and solutions
  - Build institutional knowledge
{% endif %}

{% if include_serena %}
### 5. Code Analysis Agent
- **Role**: Code understanding and navigation
- **Tools**: Serena semantic search
- **Capabilities**:
  - Find similar code patterns
  - Understand class/function relationships
  - Navigate large codebases
{% endif %}

## Database Information
{% if database != "none" %}
- **Type**: {{ database | title_case }}
- **Connection**: Configured in `.env`
{% else %}
- **Type**: None (stateless)
{% endif %}

## Deployment
{% if use_docker %}
- **Mode**: Docker containers
- **Configuration**: `docker-compose.yml`
{% else %}
- **Mode**: Local binaries
- **Requirements**: See README.md
{% endif %}
```

### 9. Conditional Script Generation

#### Generate `.ai/scripts/setup.sh`
```bash
#!/bin/bash
set -e

echo "Setting up {{ project_name }}..."

{% if use_docker %}
echo "Docker mode: Building containers..."
docker-compose build
docker-compose up -d
{% else %}
echo "Local mode: Installing dependencies..."

{% if programming_language == "Python" %}
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
{% elif programming_language == "Typescript" or programming_language == "JavaScript" %}
npm install
{% elif programming_language == "Rust" %}
cargo build
{% endif %}

{% endif %}

{% if include_serena %}
echo "Indexing code with Serena..."
{% if use_docker %}
docker exec -it serena serena-index
{% else %}
serena-index .
{% endif %}
{% endif %}

{% if include_remembrances %}
echo "Initializing Remembrances knowledge base..."
mkdir -p {{ remembrances_db }}
{% endif %}

{% if has_tests %}
echo "Running tests..."
{{ has_tests }}
{% endif %}

echo "✅ Setup complete!"
```

---

## Advanced Patterns

### Nested Conditionals for Complex Logic
```jinja2
{% if include_serena %}
  {% if programming_language == "Rust" %}
    # Rust-specific Serena config
  {% elif programming_language == "Python" %}
    # Python-specific Serena config
  {% endif %}
{% endif %}
```

### Array Operations for Multiple Configs
```jinja2
{% set features = [] %}
{% if include_remembrances %}
  {% set features = features | concat(with="remembrances") %}
{% endif %}
{% if include_serena %}
  {% set features = features | concat(with="serena") %}
{% endif %}

Enabled features: {{ features | join(sep=", ") }}
```

### Loop Over Lists for DRY Templates
```jinja2
{% set mcp_servers = ["hyper-mcp", "mycommand-mcp"] %}
{% if include_serena %}
  {% set mcp_servers = mcp_servers | concat(with="serena") %}
{% endif %}

{% for server in mcp_servers | sort %}
  - {{ server }}
{% endfor %}
```

### Safe Defaults
```jinja2
{{ project_overview | default(value="No description provided") }}
{{ database | default(value="none") | title_case }}
```

---

## Template Debugging Tips

### Print Variables
```jinja2
{# Debug: Show all variables #}
{# Variables: {{ __tera_context }} #}

{# Print specific variables #}
{# Project: {{ project_name }} #}
{# Language: {{ programming_language }} #}
```

### Conditional Rendering for Testing
```jinja2
{% if false %}
  {# This block won't render - useful for disabling sections #}
{% endif %}
```

### Empty Checks
```jinja2
{% if project_name %}
  Name provided: {{ project_name }}
{% else %}
  No project name
{% endif %}
```

---

## Common Gotchas & Solutions

### 1. Undefined Variables
```jinja2
❌ {{ undefined_var }}           {# Error! #}
✅ {{ undefined_var | default(value="fallback") }}
```

### 2. String Case Sensitivity
```jinja2
❌ {% if database == "PostgreSQL" %} {# Fails if input is "postgres" #}
✅ {% if database | lower == "postgres" %}
```

### 3. Filter Priority in Math
```jinja2
❌ {{ 1 + array | length }}     {# Evaluated as: (1 + array) | length #}
✅ {{ array | length + 1 }}     {# Evaluated correctly #}
```

### 4. Whitespace in Files
```jinja2
{%- set var = "value" -%}       {# Remove whitespace before/after #}
```

### 5. Raw JSON Output
```jinja2
{{ data | json_encode | safe }} {# Safe filter prevents escaping #}
```

---

## Testing Templates

### Manual Testing
```bash
# Test template rendering locally
kickstart --no-input -d kickstart-template -o test_output
```

### Validate Syntax
```bash
# Use kickstart validate command
kickstart validate template.toml
```

### Test Specific Variables
```toml
# In template.toml for testing
[[variables]]
name = "test_var"
default = "test_value"
prompt = "Test variable"
```

