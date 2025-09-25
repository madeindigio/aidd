# Best practices for Github Copilot

## Customizing GitHub Copilot

Custom instructions allow you to provide specific guidelines to GitHub Copilot to tailor its responses to your coding practices and project requirements. Instead of repeatedly providing the same instructions, you can store them in files that are automatically included in each chat request.

There are three main ways to customize AI responses:

- **Custom instructions**: Define common guidelines for tasks like generating code, code reviews, or commit messages.
- **Prompt files**: Create reusable prompts for common tasks.
- **Custom chat modes**: Define how chat operates, which tools it can use, and how it interacts with the codebase.

### Custom Instructions

You can define custom instructions in several ways:

- **`.github/copilot-instructions.md`**: A single file in your workspace that contains general coding practices and project requirements. These instructions are automatically included in every chat request.
- **`.instructions.md` files**: Multiple files that can be stored in your workspace or user profile. You can use glob patterns to apply them to specific files or include them in all requests.
- **VS Code settings**: Define instructions directly in your user or workspace settings for tasks like code generation, test generation, and commit messages.

### Prompt Files

Prompt files are reusable prompts for common tasks, such as generating code or performing a code review. They are standalone prompts that you can run directly in chat.

Key features of prompt files include:

- **Reusability**: Define a prompt once and reuse it across your projects.
- **Structure**: Prompt files are Markdown files with a `.prompt.md` extension and can include a header with metadata (e.g., `mode`, `model`, `tools`) and a body with the prompt content.
- **Variables**: Use variables like `${workspaceFolder}` and `${selection}` to make your prompts more dynamic.

For more details, visit the official [GitHub Copilot Customization documentation](https://code.visualstudio.com/docs/copilot/copilot-customization).

### Chat Modes

Chat modes in VS Code allow you to tailor the AI chat behavior for specific tasks. You can switch between different modes depending on your needs.

#### Built-in chat modes

VS Code comes with three built-in chat modes:

- **Ask mode**: Optimized for answering questions about your codebase and general technology concepts.
- **Edit mode**: Optimized for making code edits across multiple files.
- **Agent mode**: Optimized for making autonomous edits across multiple files, especially for complex tasks that may require running terminal commands and tools.

#### Agent Mode

Agent mode is particularly useful for complex tasks that require autonomous reasoning and planning. It can:

- Refactor parts of your codebase.
- Plan and implement new features.
- Migrate your codebase to a new framework.
- Generate implementation plans for complex tasks.

For more details, visit the official documentation on [Chat Modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes) and [Agent Mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode).

## Configuring MCP Servers

To set up MCP servers for GitHub Copilot, follow the guidelines provided in the [Visual Studio Code documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers). The process involves:

1. **Server Setup**: Ensure your MCP server is properly configured to handle requests from GitHub Copilot.
2. **Authentication**: Implement secure authentication mechanisms to validate user access.
3. **Integration**: Connect the MCP server with your development environment to enable seamless communication.
4. **Testing**: Verify the server's functionality by running tests to ensure compatibility and performance.

For detailed instructions, visit the official [documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).