# Mejores prácticas para Github Copilot

## Personalizando GitHub Copilot

Las instrucciones personalizadas te permiten proporcionar directrices específicas a GitHub Copilot para adaptar sus respuestas a tus prácticas de codificación y requisitos del proyecto. En lugar de proporcionar repetidamente las mismas instrucciones, puedes almacenarlas en archivos que se incluyen automáticamente en cada solicitud de chat.

Hay tres formas principales de personalizar las respuestas de IA:

- **Instrucciones personalizadas**: Define directrices comunes para tareas como generar código, revisiones de código o mensajes de commit.
- **Archivos de prompt**: Crea prompts reutilizables para tareas comunes.
- **Modos de chat personalizados**: Define cómo opera el chat, qué herramientas puede usar y cómo interactúa con el código base.

### Instrucciones personalizadas

Puedes definir instrucciones personalizadas de varias maneras:

- **`.github/copilot-instructions.md`**: Un archivo único en tu espacio de trabajo que contiene prácticas de codificación generales y requisitos del proyecto. Estas instrucciones se incluyen automáticamente en cada solicitud de chat.
- **Archivos `.instructions.md`**: Múltiples archivos que se pueden almacenar en tu espacio de trabajo o perfil de usuario. Puedes usar patrones glob para aplicarlos a archivos específicos o incluirlos en todas las solicitudes.
- **Configuraciones de VS Code**: Define instrucciones directamente en tus configuraciones de usuario o espacio de trabajo para tareas como generación de código, generación de pruebas y mensajes de commit.

### Archivos de prompt

Los archivos de prompt son prompts reutilizables para tareas comunes, como generar código o realizar una revisión de código. Son prompts independientes que puedes ejecutar directamente en el chat.

Las características clave de los archivos de prompt incluyen:

- **Reutilización**: Define un prompt una vez y reutilízalo en tus proyectos.
- **Estructura**: Los archivos de prompt son archivos Markdown con extensión `.prompt.md` y pueden incluir un encabezado con metadatos (por ejemplo, `mode`, `model`, `tools`) y un cuerpo con el contenido del prompt.
- **Variables**: Usa variables como `${workspaceFolder}` y `${selection}` para hacer tus prompts más dinámicos.

Para más detalles, visita la documentación oficial de [GitHub Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization).

### Modos de chat

Los modos de chat en VS Code te permiten adaptar el comportamiento del chat de IA para tareas específicas. Puedes cambiar entre diferentes modos dependiendo de tus necesidades.

#### Modos de chat integrados

VS Code viene con tres modos de chat integrados:

- **Modo Ask**: Optimizado para responder preguntas sobre tu código base y conceptos tecnológicos generales.
- **Modo Edit**: Optimizado para hacer ediciones de código en múltiples archivos.
- **Modo Agent**: Optimizado para hacer ediciones autónomas en múltiples archivos, especialmente para tareas complejas que pueden requerir ejecutar comandos de terminal y herramientas.

#### Modo Agent

El modo Agent es particularmente útil para tareas complejas que requieren razonamiento y planificación autónomos. Puede:

- Refactorizar partes de tu código base.
- Planar e implementar nuevas características.
- Migrar tu código base a un nuevo framework.
- Generar planes de implementación para tareas complejas.

Para más detalles, visita la documentación oficial sobre [Chat Modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes) y [Agent Mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode).

## Configurando servidores MCP

Para configurar servidores MCP para GitHub Copilot, sigue las directrices proporcionadas en la [documentación de Visual Studio Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers). El proceso implica:

1. **Configuración del servidor**: Asegúrate de que tu servidor MCP esté configurado correctamente para manejar solicitudes de GitHub Copilot.
2. **Autenticación**: Implementa mecanismos de autenticación seguros para validar el acceso de usuarios.
3. **Integración**: Conecta el servidor MCP con tu entorno de desarrollo para habilitar una comunicación fluida.
4. **Pruebas**: Verifica la funcionalidad del servidor ejecutando pruebas para asegurar compatibilidad y rendimiento.

Para instrucciones detalladas, visita la [documentación oficial](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).