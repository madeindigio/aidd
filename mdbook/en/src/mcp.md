# Best Utilities in MCP

In this section, we help you configure the most common MCP utilities so you can maximize their potential.

MCP servers allow AI to use tools to gather more contextual information or perform actions in the real world. These servers can be configured to interact with external APIs, execute commands, or even connect to databases.

There are two types of MCP servers: those that run on the client (on your computer) and therefore need to be installed, and those that run in the cloud and are accessible via a URL. The latter can use SSE or HTTPS protocols. It is important to know that if the server runs on the client, you need to install and configure it on your computer, whereas if it is a remote server, you need to configure the server's URL in your agent.

Client-installed MCP servers can interact with your computer, execute commands within it, or read parts of your system. They are useful for reading files, connecting to local databases, or systems accessed via a VPN from your computer.

Remote MCP servers are useful for interacting with external APIs, such as the Figma API or the YouTrack API, and do not require local installation.

Here we highlight a few particularly useful tools as they allow you to implement multiple tools in a single MCP process:

* **Serena**: It is a server mainly aimed at indexing our code project through specific parsers for each programming language, generates an index of classes, methods, functions and variables, and allows semantic searches in the code. It is very useful for AI agents to better understand our code and answer questions about it.
  * You can find more information in its [GitHub repository](https://github.com/oraios/serena)

* **Remembrances**: A server designed to help AI agents remember relevant information from previous conversations, it is an open source project created internally at DIGIO and that we will improve with the latest information storage techniques for use in AI Agents. It uses information retrieval techniques to provide context and improve the quality of responses.
  * You can find more information in its [GitHub repository](https://github.com/madeindigio/remembrances-mcp)
  
* **Hyper-MCP**: A fast MCP server built in Rust (uses very little memory) that allows adding WASM plugins to extend its functionality.
  * Especially useful to enable the **Conect7** plugin to connect to the Context7 API, which allows you to use the Context7 platform as a tool in your AI agents. This service provides all versions of documentation of a big amount of libraries and frameworks, such as React, Angular, Node.js, etc. It is a very useful tool to have in your MCP server.

  * Another useful plugin is `serper`, provides access to Google Search results. You can register free and get 2.5k requests. 

* **MCP-Link**: An MCP server that enables connecting any API with an OpenAPI specification to an MCP agent, turning it into an interface compatible with AI agents.

* **MyCommandMCP**: A versatile MCP server written in Rust that allows executing system commands as MCP tools. It is highly configurable and can be adapted to a wide range of use cases.

This is a sample of mcp.json
```json

{
  "mcpServers": {
    "@brave": {
      "url": "http://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fgithub.com%2Fautomation-ai-labs%2Fmcp-link%2Fraw%2Frefs%2Fheads%2Fmain%2Fexamples%2Fbrave.yaml&u=https%3A%2F%2Fapi.search.brave.com%2Fres%2Fv1&h=%7B%22X-Subscription-Token%22%3A%22BSAfPg0fhEKKX5sV-Tc2XCVD-qEfyI-%22%8J&f=%2B%2F**"
    },
    "@hyper-mcp": {
      "command": "hyper-mcp",
      "args": [
        "--config-file",
        "/home/sevir/.config/hyper-mcp/kilo.json"
      ]
    },
    "@mycommandmcp": {
      "command": "mycommandmcp",
      "args": [
        "--config",
        "/home/sevir/.config/mc-mcp/optimized.yaml",
        "--log-file",
        "/www/MCP/MyCommandMCP/mycommandmcp/mcp.log"
      ]
    }
  }
}
```

## MCP Server Catalogs

If you use VSCode with Copilot or any other tool, there are MCP marketplaces that are usually installed locally. You download the project and execute it, but you must be especially careful because you don't know what kind of code it might execute.

There are other marketplaces like [Smithery](https://smithery.ai/) that can deploy the code on their infrastructure instead of yours, making it safer and allowing you to pass configuration parameters as environment variables. For all servers that can run without needing data from your system, it is recommended to execute them on a remote server rather than your local machine. This reduces the risk of a malicious plugin accessing your personal data or executing unwanted commands on your system.

Docker has also released its own MCP catalog, [Docker Hub MCP](https://hub.docker.com/mcp), where you can find plugins that can be executed in containers and are safe to use.