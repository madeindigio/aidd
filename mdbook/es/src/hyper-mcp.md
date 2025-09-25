# Hyper-MCP

Hyper-MCP es un servidor MCP rápido y seguro que extiende su funcionalidad a través de plugins de WebAssembly (WASM). Permite a los desarrolladores agregar capacidades de IA a sus aplicaciones integrándose con herramientas como Claude Desktop y Cursor IDE.

### Características clave

-   **Extensible con WebAssembly:** Escribe plugins en cualquier lenguaje que compile a WASM.
-   **Seguro:** Los plugins se ejecutan en un entorno sandboxed con control de acceso granular.
-   **Soporte de registro OCI:** Distribuye y gestiona plugins usando registros OCI estándar como Docker Hub.
-   **Ligero y portable:** Adecuado para varios entornos, desde la nube hasta dispositivos edge.
-   **Multiplataforma:** Compatible con Linux, macOS y Windows.

### Configuración

Para comenzar con Hyper-MCP, necesitas crear un archivo `config.json` en el directorio apropiado para tu sistema operativo:

-   **Linux:** `$HOME/.config/hyper-mcp/config.json`
-   **macOS:** `$HOME/Library/Application Support/hyper-mcp/config.json`
-   **Windows:** `{FOLDERID_RoamingAppData}\hyper-mcp\config.json`

A continuación se muestra un ejemplo de configuración que incluye varios plugins útiles:

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

En esta configuración:
-   Cada objeto en el array `plugins` define una nueva herramienta para el servidor MCP.
-   `"name"`: El nombre de la herramienta que se expondrá.
-   `"path"`: La ruta OCI a la imagen del plugin.
-   `"runtime_config"`: (Opcional) Te permite configurar el entorno de ejecución del plugin, como establecer variables de entorno (`env_vars`), restringir el acceso a la red (`allowed_hosts`), o limitar el uso de memoria. Para el plugin `serper`, deberías reemplazar `"YOUR_SERPER_API_KEY"` con tu clave API real de Serper.
