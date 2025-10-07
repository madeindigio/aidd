# AI Kickstart Template

You have two options to install this template, either using the kickstart binary or using docker.

When you install the template, you will be requested to use docker for MCP server or not. If you don't want to use the binaries or use windows, use docker is recommended, for more performance, use the binaries version of MCP servers (respond "no" to the question "Do you want to use docker for MCP servers?").

## 1. Using kickstart binary
Download the last release of kickstart [here](https://github.com/Keats/kickstart/releases/latest).

Install the template into any project by running the following command:

```bash
kickstart https://github.com/madeindigio/aidd -d kickstart-template -o .
```
## 2. Using Docker
If you don't want to use the binary of kickstart, you can also use docker:

```bash
docker run -it --rm -v$(pwd):/workspace -w /workspace ghcr.io/sevir/kickstart:latest -o /workspace -d kickstart-template https://github.com/madeindigio/aidd.git
```

## Download binaries of MCP servers

Download the last release of the binaries and add them to your PATH.

### hyper-mcp:

This MCP server use many tools for search, fetch and other processes automatized for AI Agents. Digio has developed some tools for different purposes like search with google, bing, perplexity or brave, and take note from logseq, youtrack and others...

  * Download the last release of hyper-mcp [here](https://github.com/tuananh/hyper-mcp/releases/latest).

This template add the following tools plugins, please refer to each readme for more information about the authentication tokens and mcp configuration:

* serper (google search) https://github.com/tuananh/hyper-mcp/tree/main/examples/plugins/serper
* google search API (google search) https://github.com/sevir/hyper-mcp/tree/dev/examples/plugins/google-search
* brave (brave search) https://github.com/sevir/hyper-mcp/tree/dev/examples/plugins/brave-search
* perplexity (perplexity search) https://github.com/sevir/hyper-mcp/tree/dev/examples/plugins/perplexity-search
* bing (bing search) https://github.com/sevir/hyper-mcp/tree/dev/examples/plugins/bing-search
* youtrack (youtrack project management) https://github.com/sevir/hyper-mcp/tree/dev/examples/plugins/youtrack
* logseq (logseq note taking) https://github.com/sevir/hyper-mcp/tree/dev/examples/plugins/logseq

Other available plugins in:

* https://github.com/tuananh/hyper-mcp/?tab=readme-ov-file#available-plugins

### mycommandmcp:

This MCP server allow you to execute system commands as MCP tools. It's highly configurable and can be adapted to a wide range of use cases.

  * Download the last release of mycommand-mcp [here](https://github.com/sevir/mycommandmcp/releases/latest).

### serena:

This MCP server is a chat server with memory and file operations, generates an index of classes, methods, functions and variables, and allows semantic searches in the code. It is very useful for AI agents to better understand our code and answer questions about it.

  * Download uv for running Serena python code using "uvx" [here](https://docs.astral.sh/uv/getting-started/installation/).
  * *Alternatively*, you can use uvx using pkgx, download pkgx [here](https://github.com/pkgxdev/pkgx/releases/latests). And run with `pkgx uvx ...`, this template uses pkgx by default. Edit mcp.json if you want to use uvx directly.

### remembrances:

This MCP server is a knowledge base for storing and retrieving relevant information about the project. It allows you to save facts, entities, relationships, and documents that can be useful for future tasks. This is a "beta" project of Digio I+D+i.

  * Download the last release of remembrances-mcp [here](https://github.com/madeindigio/remembrances-mcp/releases/latest).

You will need also a nvidia gpu if you want to use ollama as embedding model. Or license of openai api key for use text-embedding-3-small. The template is configured to use ollama by default.

1. check if you have nvidia gpu:
2. install ollama from https://ollama.com/download
3. install the model nomic-embed-text:latest

```bash
ollama pull nomic-embed-text:latest
```

4. download surrealdb from [Github Releases](https://github.com/surrealdb/surrealdb/releases) and add surrealdb to your PATH.

## Troubleshooting

For rust, install rust-analyzer for working symbols in Serena https://github.com/rust-lang/rust-analyzer/releases