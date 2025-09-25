# Hyper-MCP

Hyper-MCP is a fast and secure MCP server that extends its functionality through WebAssembly (WASM) plugins. It allows developers to add AI capabilities to their applications by integrating with tools like Claude Desktop and Cursor IDE.

### Key Features

-   **Extensible with WebAssembly:** Write plugins in any language that compiles to WASM.
-   **Secure:** Plugins run in a sandboxed environment with fine-grained access control.
-   **OCI Registry Support:** Distribute and manage plugins using standard OCI registries like Docker Hub.
-   **Lightweight and Portable:** Suitable for various environments, from cloud to edge devices.
-   **Cross-platform:** Compatible with Linux, macOS, and Windows.

### Configuration

To get started with Hyper-MCP, you need to create a `config.json` file in the appropriate directory for your operating system:

-   **Linux:** `$HOME/.config/hyper-mcp/config.json`
-   **macOS:** `$HOME/Library/Application Support/hyper-mcp/config.json`
-   **Windows:** `{FOLDERID_RoamingAppData}\hyper-mcp\config.json`

Below is an example configuration that includes several useful plugins:

```json
{
  "plugins": [
    {
      "name": "time",
      "path": "oci://ghcr.io/tuananh/time-plugin:latest"
    },
    {
      "name": "think",
      "path": "oci://ghcr.io/tuananh/think-plugin:latest"
    },
    {
      "name": "hash",
      "path": "oci://ghcr.io/tuananh/hash-plugin:latest"
    },
    {
      "name": "fetch",
      "path": "oci://ghcr.io/tuananh/fetch-plugin:latest",
      "runtime_config": {
        "allowed_hosts": ["*"],
        "memory_limit": "100 MB"
      }
    },
    {
      "name": "context7",
      "path": "oci://ghcr.io/tuananh/context7-plugin:nightly",
      "runtime_config": {
        "allowed_hosts": ["context7.com"]
      }
    },
    {
      "name": "sequentialthinking",
      "path": "oci://ghcr.io/sevir/sequentialthinking-plugin:latest"
    },
    {
      "name": "serper",
      "path": "oci://ghcr.io/tuananh/serper-plugin:latest",
      "runtime_config": {
        "env_vars": {
          "SERPER_API_KEY": "YOUR_SERPER_API_KEY"
        },
        "allowed_hosts": ["google.serper.dev"]
      }
    }
  ]
}
```

In this configuration:
-   Each object in the `plugins` array defines a new tool for the MCP server.
-   `"name"`: The name of the tool that will be exposed.
-   `"path"`: The OCI path to the plugin image.
-   `"runtime_config"`: (Optional) Allows you to configure the plugin's runtime environment, such as setting environment variables (`env_vars`), restricting network access (`allowed_hosts`), or limiting memory usage. For the `serper` plugin, you should replace `"YOUR_SERPER_API_KEY"` with your actual Serper API key.
