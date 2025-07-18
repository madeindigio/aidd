# Mycommandmcp

MyCommandMCP is a versatile MCP server written in Rust that allows you to execute system commands as MCP tools. It's highly configurable and can be adapted to a wide range of use cases.

### Installation

You can install MyCommandMCP by downloading the binary from the [releases page](https://github.com/sevir/mycommandmcp/releases) or by building it from source.

To install the binary, download the appropriate version for your system, uncompress it, and place the executable in a directory included in your system's `PATH`.


### Configuration

MyCommandMCP is configured using a YAML file. By default, it looks for a file named `mycommand-tools.yaml` in the current directory. You can also specify a custom configuration file using the `--config` flag.

The configuration file has three main sections: `prompts`, `tools`, and `resources`.

Here is an example of a `tools` configuration:

```yaml
tools:
  - name: "list_files"
    description: "Lists files in a specific directory"
    command: "ls"
    path: "/"
    accepts_args: true
    accept_input: false
    default_args: "-l"
  - name: "get_date"
    description: "Gets the current system date and time"
    command: "date"
    path: "/"
    accepts_args: false
    accept_input: false
```

This configuration defines two tools: `list_files`, which executes the `ls -l` command, and `get_date`, which executes the `date` command.

You can find more detailed information about the configuration options in the [official documentation](https://github.com/sevir/mycommandmcp/blob/main/README.md).

This is a full example of a **real dev** `mycommand-tools.yaml`:

```yaml
tools:
  - name: "get_date"
    description: "Displays the current system date and time in various formats. Can show UTC time, format output, or display specific timezones, the tool accepts the same arguments of the `date` linux command"
    command: "date"
    path: "/"
    accepts_args: true
    accept_input: false

  - name: "process_list"
    description: "Displays information about running processes"
    command: "ps"
    path: "/"
    accepts_args: true
    accept_input: false
    default_args: "auxef"

  - name: "network_info"
    description: "Shows the network interfaces, routing, devices, and tunnels. This tools accepts the same arguments of the `ip` linux command"
    command: "ip"
    path: "/"
    accepts_args: true
    accept_input: false
    default_args: "addr"

  - name: "curl"
    description: "Downloads any resource from a URL using `curl` command. Use this tool for run any `curl` command what you want"
    command: "curl"
    path: "/tmp"
    accepts_args: true
    accept_input: false

  - name: "vscode"
    description: "Call always to open VSCode in the path specified in the argument. Use this tool when you write or edit code"
    command: "vscode"
    path: "/www"
    accepts_args: true
    accept_input: false


prompts:
  - name: "summarize"
    description: "Summarize a given text"
    content: |
      Please summarize the following text in 3 sentences or less.
      Consider the main points and key details.
      Maintain a clear and concise style.

  - name: "translate"
    description: "Translate text to Spanish"
    content: |
      Translate the following text to Spanish.
      Preserve the original meaning and tone.
      Use natural and fluent Spanish language.

  - name: "code_review"
    description: "🔍 Comprehensive code review with security and performance analysis"
    content: |
      🔍 **Code Review Request**

      Please perform a comprehensive code review of: `{file_path}`

      **Focus Areas:** {focus_areas}

      **Review Criteria:**
      - 🛡️ Security vulnerabilities and best practices
      - ⚡ Performance implications and optimizations
      - 📝 Code clarity and maintainability
      - 🦀 Language-specific idioms and patterns
      - 🧪 Testability and error handling
      - 📚 Documentation and comments

      **Deliverables:**
      1. Summary assessment with severity levels
      2. Specific issues with line references
      3. Actionable improvement suggestions
      4. Positive highlights and well-implemented patterns

      Please use file operations to read the code and provide detailed feedback.

  - name: "rust_optimization"
    description: "🦀 Rust-specific optimization suggestions and idiomatic patterns"
    content: |
      🦀 **Rust Optimization Analysis**

      **Target:** {optimization_goal}

      **Code to Optimize:**
      ```rust
      {code_snippet}
      ```

      **Analysis Framework:**
      - 🚀 Performance: Zero-cost abstractions, allocation patterns
      - 💾 Memory: Ownership, borrowing, lifetime optimizations
      - 📖 Readability: Idiomatic Rust patterns, clarity
      - 🛡️ Safety: Memory safety, thread safety, error handling

      **Deliverables:**
      1. Optimized code with explanations
      2. Performance impact analysis
      3. Trade-offs and alternatives
      4. Benchmark suggestions if applicable

      Focus on modern Rust idioms and zero-cost abstractions.

  - name: "debug_assistance"
    description: "🐛 Debug analysis with error investigation and fix suggestions"
    content: |
      🐛 **Debug Assistance Request**

      **Error Message:**
      ```
      {error_message}
      ```

      **Context:**
      {context}

      **Debug Strategy:**
      1. 🔍 Error Analysis: Root cause identification
      2. 🛠️ Fix Suggestions: Step-by-step resolution
      3. 🧪 Verification: Testing approach for the fix
      4. 🚀 Prevention: How to avoid similar issues

      **Investigation Tools:**
      - Use file operations to examine related code
      - Search for similar patterns in the codebase
      - Check dependencies and configurations

      Please provide actionable debugging steps and fix recommendations.

  - name: "architecture_design"
    description: "🏗️ Software architecture analysis and design recommendations"
    content: |
      🏗️ **Architecture Design Consultation**

      **Project:** {project_description}

      **Constraints:** {constraints}

      **Design Framework:**
      - 🎯 Requirements Analysis: Functional and non-functional
      - 🏛️ Architectural Patterns: Suitable design patterns
      - 🔧 Technology Stack: Language, frameworks, databases
      - 📊 Scalability: Growth and performance considerations
      - 🛡️ Security: Security architecture and threat model
      - 🧪 Testing: Testing strategy and quality assurance

      **Deliverables:**
      1. High-level architecture diagram (text-based)
      2. Component breakdown with responsibilities
      3. Data flow and interface definitions
      4. Technology recommendations with rationale
      5. Implementation roadmap with priorities

      Focus on maintainable, scalable, and robust design principles.

  - name: "rag_query_optimization"
    description: "🧠 Optimize RAG queries for better semantic search results"
    content: |
      🧠 **RAG Query Optimization**

      **Current Query:** {query}
      **Domain:** {domain}

      **Optimization Strategy:**
      - 🎯 Semantic Enhancement: Improve query semantics
      - 🔍 Keyword Expansion: Add relevant synonyms and terms
      - 📊 Query Structuring: Optimize for vector similarity
      - 🎛️ Parameter Tuning: Suggest search parameters

      **Analysis Areas:**
      1. Query intent and information need
      2. Domain-specific terminology
      3. Semantic similarity patterns
      4. Chunk retrieval effectiveness

      **Deliverables:**
      - Optimized query variations
      - Search strategy recommendations
      - RAG parameter suggestions
      - Expected retrieval improvements

      Use RAG tools to test query effectiveness if helpful.

  - name: "documentation_generator"
    description: "📚 Generate comprehensive documentation from code"
    content: |
      📚 **Documentation Generation**

      **Target File:** {code_file}
      **Documentation Type:** {doc_type}

      **Documentation Framework:**
      - 📋 API Documentation: Function signatures and usage
      - 💡 Examples: Practical usage examples
      - 🏗️ Architecture: Module structure and relationships
      - 🚀 Getting Started: Quick start guides
      - ⚠️ Edge Cases: Error handling and limitations

      **Output Requirements:**
      1. Clear, concise descriptions
      2. Code examples with explanations
      3. Proper markdown formatting
      4. Cross-references and links
      5. Maintainable documentation structure

      Please read the code file and generate appropriate documentation.
      Include inline doc comments and external documentation as needed.

  - name: "test_strategy"
    description: "🧪 Test planning and strategy recommendations"
    content: |
      🧪 **Test Strategy Development**

      **Component:** {component}
      **Test Types:** {test_types}

      **Testing Framework:**
      - 🔬 Unit Tests: Individual function testing
      - 🔗 Integration Tests: Component interaction testing
      - ⚡ Performance Tests: Load and stress testing
      - 🛡️ Security Tests: Vulnerability and penetration testing
      - 👤 User Acceptance: End-to-end workflow testing

      **Deliverables:**
      1. Test plan with coverage targets
      2. Test case specifications
      3. Testing infrastructure requirements
      4. Automation strategy
      5. Quality gates and success criteria

      **Implementation Guidance:**
      - Rust-specific testing patterns
      - Mocking and test doubles
      - Continuous integration setup

      Analyze the component and provide a comprehensive testing strategy.

  - name: "refactoring_plan"
    description: "♻️ Systematic refactoring strategy with risk assessment"
    content: |
      ♻️ **Refactoring Strategy**

      **Target Code:** {target_code}
      **Goals:** {goals}

      **Refactoring Process:**
      - 🔍 Analysis: Current state assessment
      - 🎯 Objectives: Clear refactoring goals
      - 📋 Plan: Step-by-step refactoring plan
      - ⚠️ Risk Assessment: Potential breaking changes
      - 🧪 Validation: Testing strategy for changes

      **Key Considerations:**
      1. Backward compatibility requirements
      2. Performance impact analysis
      3. Team coordination and communication
      4. Incremental delivery approach
      5. Rollback strategies

      **Deliverables:**
      - Detailed refactoring roadmap
      - Risk mitigation strategies
      - Before/after code comparisons
      - Testing and validation plan

      Provide a safe, systematic approach to code improvement.

  - name: "security_audit"
    description: "🛡️ Security vulnerability assessment and mitigation strategies"
    content: |
      🛡️ **Security Audit Request**

      **Audit Scope:** {scope}
      **Threat Model:** {threat_model}

      **Security Assessment Framework:**
      - 🔒 Authentication: Identity verification
      - 🚪 Authorization: Access control mechanisms
      - 🛡️ Input Validation: Data sanitization and validation
      - 🔐 Cryptography: Encryption and key management
      - 📊 Data Protection: Privacy and data handling
      - 🌐 Network Security: Communication security

      **Vulnerability Categories:**
      1. OWASP Top 10 compliance
      2. Memory safety issues (Rust-specific)
      3. Dependency vulnerabilities
      4. Configuration security
      5. Business logic flaws

      **Deliverables:**
      - Security vulnerability report
      - Risk assessment with severity levels
      - Remediation recommendations
      - Security best practices guide

      Perform thorough security analysis using file operations and search tools.



resources:
  - name: "mcp_server_prompts"
    description: "Specification of Prompts for MCP Servers"
    path: "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/refs/heads/main/docs/specification/2024-11-05/server/prompts.mdx"

  - name: "mcp_server_tools"
    description: "Specification of Tools for MCP Servers"
    path: "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/refs/heads/main/docs/specification/2024-11-05/server/tools.mdx"

  - name: "mcp_server_resources"
    description: "Specification of Resources for MCP Servers"
    path: "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/refs/heads/main/docs/specification/2024-11-05/server/resources.mdx"

```