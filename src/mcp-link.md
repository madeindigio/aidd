# MCP-Link

At **digio**, we have deployed an instance of MCP-Link at [mcplink.madeindigio.com](https://mcplink.madeindigio.com) for you to use.

MCP-Link is a tool that automatically converts any API with an OpenAPI v3 specification into a complete MCP server. This allows AI agents to interact with existing RESTful APIs without needing to modify the original API code.

### How does it work?

MCP-Link generates an MCP-compatible interface from an OpenAPI specification URL. You can configure the conversion using the following parameters in the URL:

-   `s=`: The URL of the OpenAPI specification file.
-   `u=`: The base URL of the target API.
-   `h=`: The format of the authentication header (e.g., `Authorization:Bearer`).
-   `f=`: Expressions to filter the API routes to include or exclude.

### Example usage in an AI Agent

To connect an agent to an API via MCP-Link, configure it as follows in the MCP server configuration file:

```json
{
  "mcpServers": {
    "@service-name": {
      "url": "https://mcplink.madeindigio.com/sse?s=[OpenAPI-specification-URL]&u=[API-base-URL]"
    }
  }
}
```

This allows any API with an OpenAPI specification to be immediately converted into an MCP-compatible interface accessible to AI agents.

### Example with Figma

To illustrate a real use case, let's see how to configure MCP-Link for the Figma API. The URL to connect with Figma through our MCP-Link instance would be:

`https://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fraw.githubusercontent.com%2Ffigma%2Frest-api-spec%2Frefs%2Fheads%2Fmain%2Fopenapi%2Fopenapi.yaml&u=https%3A%2F%2Fapi.figma.com&h=%7B%22X-Figma-Token%22%3A%22YOUR_FIGMA_TOKEN%22%7D&f=%2B%2F**`

Breaking down the parameters:

-   **s**: `https://raw.githubusercontent.com/figma/rest-api-spec/refs/heads/main/openapi/openapi.yaml` - The OpenAPI specification of the Figma API.
-   **u**: `https://api.figma.com` - The base URL of the Figma API.
-   **h**: `{"X-Figma-Token":"YOUR_FIGMA_TOKEN"}` - The authentication header. A JSON object (URL-encoded) specifies that the `X-Figma-Token` header should be sent with your personal Figma token. Replace `YOUR_FIGMA_TOKEN` with your actual token.
-   **f**: `+/**` - Includes all API routes.

The configuration in your agent would look like this:

```json
{
  "mcpServers": {
    "@figma": {
      "url": "https://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fraw.githubusercontent.com%2Ffigma%2Frest-api-spec%2Frefs%2Fheads%2Fmain%2Fopenapi%2Fopenapi.yaml&u=https%3A%2F%2Fapi.figma.com&h=%7B%22X-Figma-Token%22%3A%22YOUR_FIGMA_TOKEN%22%7D&f=%2B%2F**"
    }
  }
}
```

### Example with YouTrack

Similarly, to connect with YouTrack, the MCP-Link URL would be:

`http://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fdigio.youtrack.cloud%2Fapi%2Fopenapi.json&u=https%3A%2F%2Fdigio.youtrack.cloud%2Fapi&h=%7B%22Authorization%22%3A%22Bearer%20TOKEN_YOUTRACK%22%7D&f=%2B%2F**`

Breaking down the parameters:

-   **s**: `https://digio.youtrack.cloud/api/openapi.json` - The OpenAPI specification of the YouTrack API.
-   **u**: `https://digio.youtrack.cloud/api` - The base URL of the YouTrack API.
-   **h**: `{"Authorization":"Bearer TOKEN_YOUTRACK"}` - The authentication header. A Bearer authorization token is used. Replace `TOKEN_YOUTRACK` with your permanent YouTrack token.
-   **f**: `+/**` - Includes all API routes.

The configuration in your agent would look like this:

```json
{
  "mcpServers": {
    "@youtrack": {
      "url": "http://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fdigio.youtrack.cloud%2Fapi%2Fopenapi.json&u=https%3A%2F%2Fdigio.youtrack.cloud%2Fapi&h=%7B%22Authorization%22%3A%22Bearer%20TOKEN_YOUTRACK%22%7D&f=%2B%2F**"
    }
  }
}
```