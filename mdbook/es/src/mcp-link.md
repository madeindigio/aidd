# MCP-Link

En **digio**, hemos desplegado una instancia de MCP-Link en [mcplink.madeindigio.com](https://mcplink.madeindigio.com) para que la uses.

MCP-Link es una herramienta que automáticamente convierte cualquier API con una especificación OpenAPI v3 en un servidor MCP completo. Esto permite a los agentes de IA interactuar con APIs RESTful existentes sin necesidad de modificar el código de la API original.

### ¿Cómo funciona?

MCP-Link genera una interfaz compatible con MCP desde una URL de especificación OpenAPI. Puedes configurar la conversión usando los siguientes parámetros en la URL:

-   `s=`: La URL del archivo de especificación OpenAPI.
-   `u=`: La URL base de la API objetivo.
-   `h=`: El formato del encabezado de autenticación (por ejemplo, `Authorization:Bearer`).
-   `f=`: Expresiones para filtrar las rutas de la API a incluir o excluir.

### Usar el Configurador de MCP-Link

El [Configurador de MCP-Link digio](./mcplink-assistant/index.html) es una interfaz web que te permite configurar fácilmente los parámetros de MCP-Link. Proporciona una forma amigable de configurar la URL de especificación OpenAPI, URL base, encabezados de autenticación y filtros de rutas.

### Ejemplo de uso en un Agente de IA

Para conectar un agente a una API vía MCP-Link, configúralo de la siguiente manera en el archivo de configuración del servidor MCP:

```json
{
  "mcpServers": {
    "@service-name": {
      "url": "https://mcplink.madeindigio.com/sse?s=[OpenAPI-specification-URL]&u=[API-base-URL]"
    }
  }
}
```

Esto permite que cualquier API con una especificación OpenAPI se convierta inmediatamente en una interfaz compatible con MCP accesible para agentes de IA.

### Ejemplo con Figma

Para ilustrar un caso de uso real, veamos cómo configurar MCP-Link para la API de Figma. La URL para conectar con Figma a través de nuestra instancia de MCP-Link sería:

`https://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fraw.githubusercontent.com%2Ffigma%2Frest-api-spec%2Frefs%2Fheads%2Fmain%2Fopenapi%2Fopenapi.yaml&u=https%3A%2F%2Fapi.figma.com&h=%7B%22X-Figma-Token%22%3A%22YOUR_FIGMA_TOKEN%22%7D&f=%2B%2F**`

Desglosando los parámetros:

-   **s**: `https://raw.githubusercontent.com/figma/rest-api-spec/refs/heads/main/openapi/openapi.yaml` - La especificación OpenAPI de la API de Figma.
-   **u**: `https://api.figma.com` - La URL base de la API de Figma.
-   **h**: `{"X-Figma-Token":"YOUR_FIGMA_TOKEN"}` - El encabezado de autenticación. Un objeto JSON (codificado en URL) especifica que el encabezado `X-Figma-Token` debe enviarse con tu token personal de Figma. Reemplaza `YOUR_FIGMA_TOKEN` con tu token real.
-   **f**: `+/**` - Incluye todas las rutas de la API.

La configuración en tu agente se vería así:

```json
{
  "mcpServers": {
    "@figma": {
      "url": "https://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fraw.githubusercontent.com%2Ffigma%2Frest-api-spec%2Frefs%2Fheads%2Fmain%2Fopenapi%2Fopenapi.yaml&u=https%3A%2F%2Fapi.figma.com&h=%7B%22X-Figma-Token%22%3A%22YOUR_FIGMA_TOKEN%22%7D&f=%2B%2F**"
    }
  }
}
```

### Ejemplo con YouTrack

De manera similar, para conectar con YouTrack, la URL de MCP-Link sería:

`http://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fdigio.youtrack.cloud%2Fapi%2Fopenapi.json&u=https%3A%2F%2Fdigio.youtrack.cloud%2Fapi&h=%7B%22Authorization%22%3A%22Bearer%20TOKEN_YOUTRACK%22%7D&f=%2B%2F**`

Desglosando los parámetros:

-   **s**: `https://digio.youtrack.cloud/api/openapi.json` - La especificación OpenAPI de la API de YouTrack.
-   **u**: `https://digio.youtrack.cloud/api` - La URL base de la API de YouTrack.
-   **h**: `{"Authorization":"Bearer TOKEN_YOUTRACK"}` - El encabezado de autenticación. Se usa un token de autorización Bearer. Reemplaza `TOKEN_YOUTRACK` con tu token permanente de YouTrack.
-   **f**: `+/**` - Incluye todas las rutas de la API.

La configuración en tu agente se vería así:

```json
{
  "mcpServers": {
    "@youtrack": {
      "url": "http://mcplink.madeindigio.com/sse?s=https%3A%2F%2Fdigio.youtrack.cloud%2Fapi%2Fopenapi.json&u=https%3A%2F%2Fdigio.youtrack.cloud%2Fapi&h=%7B%22Authorization%22%3A%22Bearer%20TOKEN_YOUTRACK%22%7D&f=%2B%2F**"
    }
  }
}
```