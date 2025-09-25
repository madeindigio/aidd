# Mejores utilidades en MCP

En esta sección, te ayudamos a configurar las utilidades MCP más comunes para que puedas maximizar su potencial.

Los servidores MCP permiten a la IA usar herramientas para recopilar más información contextual o realizar acciones en el mundo real. Estos servidores pueden configurarse para interactuar con APIs externas, ejecutar comandos o incluso conectarse a bases de datos.

Hay dos tipos de servidores MCP: aquellos que se ejecutan en el cliente (en tu computadora) y por lo tanto necesitan instalarse, y aquellos que se ejecutan en la nube y son accesibles vía URL. Estos últimos pueden usar protocolos SSE o HTTPS. Es importante saber que si el servidor se ejecuta en el cliente, necesitas instalarlo y configurarlo en tu computadora, mientras que si es un servidor remoto, necesitas configurar la URL del servidor en tu agente.

Los servidores MCP instalados en el cliente pueden interactuar con tu computadora, ejecutar comandos dentro de ella o leer partes de tu sistema. Son útiles para leer archivos, conectarse a bases de datos locales o sistemas accedidos vía VPN desde tu computadora.

Los servidores MCP remotos son útiles para interactuar con APIs externas, como la API de Figma o la API de YouTrack, y no requieren instalación local.

Aquí destacamos tres herramientas particularmente útiles ya que permiten implementar múltiples herramientas en un solo proceso MCP:

* **Hyper-MCP**: Un servidor MCP rápido construido en Rust (usa muy poca memoria) que permite agregar plugins WASM para extender su funcionalidad.
  * Especialmente útil habilitar el plugin **Conect7** para conectarse a la API de Context7, lo que permite usar la plataforma Context7 como herramienta en tus agentes de IA. Este servicio proporciona todas las versiones de documentación de una gran cantidad de librerías y frameworks, como React, Angular, Node.js, etc. Es una herramienta muy útil para tener en tu servidor MCP.

  * Otro plugin útil es `serper`, proporciona acceso a resultados de búsqueda de Google. Puedes registrarte gratis y obtener 2.5k solicitudes.

* **MCP-Link**: Un servidor MCP que permite conectar cualquier API con una especificación OpenAPI a un agente MCP, convirtiéndola en una interfaz compatible con agentes de IA.

* **MyCommandMCP**: Un servidor MCP versátil escrito en Rust que permite ejecutar comandos del sistema como herramientas MCP. Es altamente configurable y puede adaptarse a una amplia gama de casos de uso.

Este es un ejemplo de mcp.json

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

## Catálogos de Servidores MCP

Si usas VSCode con Copilot o cualquier otra herramienta, hay mercados MCP que usualmente se instalan localmente. Descargas el proyecto y lo ejecutas, pero debes ser especialmente cuidadoso porque no sabes qué tipo de código podría ejecutar.

Hay otros mercados como [Smithery](https://smithery.ai/) que pueden desplegar el código en su infraestructura en lugar de la tuya, haciéndolo más seguro y permitiéndote pasar parámetros de configuración como variables de entorno. Para todos los servidores que puedan ejecutarse sin needing datos de tu sistema, se recomienda ejecutarlos en un servidor remoto en lugar de tu máquina local. Esto reduce el riesgo de que un plugin malicioso acceda a tus datos personales o ejecute comandos no deseados en tu sistema.

Docker también ha lanzado su propio catálogo MCP, [Docker Hub MCP](https://hub.docker.com/mcp), donde puedes encontrar plugins que pueden ejecutarse en contenedores y son seguros de usar.