# Mycommandmcp

MyCommandMCP es un servidor MCP versátil escrito en Rust que te permite ejecutar comandos del sistema como herramientas MCP. Es altamente configurable y puede adaptarse a una amplia gama de casos de uso.

### Instalación

Puedes instalar MyCommandMCP descargando el binario desde la [página de releases](https://github.com/sevir/mycommandmcp/releases) o construyéndolo desde el código fuente.

Para instalar el binario, descarga la versión apropiada para tu sistema, descomprímela y coloca el ejecutable en un directorio incluido en el `PATH` de tu sistema.

### Configuración

MyCommandMCP se configura usando un archivo YAML. Por defecto, busca un archivo llamado `mycommand-tools.yaml` en el directorio actual. También puedes especificar un archivo de configuración personalizado usando la bandera `--config`.

El archivo de configuración tiene tres secciones principales: `prompts`, `tools`, y `resources`.

Aquí hay un ejemplo de configuración de `tools`:

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

Esta configuración define dos herramientas: `list_files`, que ejecuta el comando `ls -l`, y `get_date`, que ejecuta el comando `date`.

Puedes encontrar información más detallada sobre las opciones de configuración en la [documentación oficial](https://github.com/sevir/mycommandmcp/blob/main/README.md).

Este es un ejemplo completo de un `mycommand-tools.yaml` de **desarrollo real**:

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
    description: "Resume un texto dado"
    content: |
      Por favor resume el siguiente texto en 3 oraciones o menos.
      Considera los puntos principales y detalles clave.
      Mantén un estilo claro y conciso.

  - name: "translate"
    description: "Traduce texto a español"
    content: |
      Traduce el siguiente texto a español.
      Preserva el significado y tono original.
      Usa lenguaje español natural y fluido.

  - name: "code_review"
    description: "🔍 Revisión de código completa con análisis de seguridad y rendimiento"
    content: |
      🔍 **Solicitud de Revisión de Código**

      Por favor realiza una revisión completa de código de: `{file_path}`

      **Áreas de Enfoque:** {focus_areas}

      **Criterios de Revisión:**
      - 🛡️ Vulnerabilidades de seguridad y mejores prácticas
      - ⚡ Implicaciones de rendimiento y optimizaciones
      - 📝 Claridad del código y mantenibilidad
      - 🦀 Idiomas y patrones específicos del lenguaje
      - 🧪 Capacidad de prueba y manejo de errores
      - 📚 Documentación y comentarios

      **Entregables:**
      1. Evaluación resumida con niveles de severidad
      2. Problemas específicos con referencias de línea
      3. Sugerencias de mejora accionables
      4. Aspectos positivos y patrones bien implementados

      Por favor usa operaciones de archivo para leer el código y proporcionar retroalimentación detallada.

  - name: "rust_optimization"
    description: "🦀 Sugerencias de optimización específicas de Rust y patrones idiomáticos"
    content: |
      🦀 **Análisis de Optimización de Rust**

      **Objetivo:** {optimization_goal}

      **Código a Optimizar:**
      ```rust
      {code_snippet}
      ```

      **Marco de Análisis:**
      - 🚀 Rendimiento: Abstracciones de costo cero, patrones de asignación
      - 💾 Memoria: Propiedad, préstamo, optimizaciones de vida útil
      - 📖 Legibilidad: Patrones idiomáticos de Rust, claridad
      - 🛡️ Seguridad: Seguridad de memoria, seguridad de hilos, manejo de errores

      **Entregables:**
      1. Código optimizado con explicaciones
      2. Análisis de impacto en rendimiento
      3. Compensaciones y alternativas
      4. Sugerencias de benchmark si aplicable

      Enfócate en idiomas modernos de Rust y abstracciones de costo cero.

  - name: "debug_assistance"
    description: "🐛 Análisis de debug con investigación de errores y sugerencias de corrección"
    content: |
      🐛 **Solicitud de Asistencia de Debug**

      **Mensaje de Error:**
      ```
      {error_message}
      ```

      **Contexto:**
      {context}

      **Estrategia de Debug:**
      1. 🔍 Análisis de Error: Identificación de causa raíz
      2. 🛠️ Sugerencias de Corrección: Resolución paso a paso
      3. 🧪 Verificación: Enfoque de prueba para la corrección
      4. 🚀 Prevención: Cómo evitar problemas similares

      **Herramientas de Investigación:**
      - Usa operaciones de archivo para examinar código relacionado
      - Busca patrones similares en el código base
      - Verifica dependencias y configuraciones

      Por favor proporciona pasos de debug accionables y recomendaciones de corrección.

  - name: "architecture_design"
    description: "🏗️ Análisis de arquitectura de software y recomendaciones de diseño"
    content: |
      🏗️ **Consulta de Diseño de Arquitectura**

      **Proyecto:** {project_description}

      **Restricciones:** {constraints}

      **Marco de Diseño:**
      - 🎯 Análisis de Requisitos: Funcionales y no funcionales
      - 🏛️ Patrones Arquitectónicos: Patrones de diseño adecuados
      - 🔧 Pila Tecnológica: Lenguaje, frameworks, bases de datos
      - 📊 Escalabilidad: Consideraciones de crecimiento y rendimiento
      - 🛡️ Seguridad: Arquitectura de seguridad y modelo de amenazas
      - 🧪 Pruebas: Estrategia de pruebas y aseguramiento de calidad

      **Entregables:**
      1. Diagrama de arquitectura de alto nivel (basado en texto)
      2. Desglose de componentes con responsabilidades
      3. Flujo de datos y definiciones de interfaz
      4. Recomendaciones tecnológicas con justificación
      5. Hoja de ruta de implementación con prioridades

      Enfócate en principios de diseño mantenibles, escalables y robustos.

  - name: "rag_query_optimization"
    description: "🧠 Optimiza consultas RAG para mejores resultados de búsqueda semántica"
    content: |
      🧠 **Optimización de Consulta RAG**

      **Consulta Actual:** {query}
      **Dominio:** {domain}

      **Estrategia de Optimización:**
      - 🎯 Mejora Semántica: Mejora la semántica de la consulta
      - 🔍 Expansión de Palabras Clave: Agrega sinónimos y términos relevantes
      - 📊 Estructuración de Consulta: Optimiza para similitud vectorial
      - 🎛️ Ajuste de Parámetros: Sugiere parámetros de búsqueda

      **Áreas de Análisis:**
      1. Intención de consulta y necesidad de información
      2. Terminología específica del dominio
      3. Patrones de similitud semántica
      4. Efectividad de recuperación de fragmentos

      **Entregables:**
      - Variaciones de consulta optimizadas
      - Recomendaciones de estrategia de búsqueda
      - Sugerencias de parámetros RAG
      - Mejoras esperadas en recuperación

      Usa herramientas RAG para probar la efectividad de la consulta si es útil.

  - name: "documentation_generator"
    description: "📚 Genera documentación completa desde código"
    content: |
      📚 **Generación de Documentación**

      **Archivo Objetivo:** {code_file}
      **Tipo de Documentación:** {doc_type}

      **Marco de Documentación:**
      - 📋 Documentación de API: Firmas de función y uso
      - 💡 Ejemplos: Ejemplos de uso prácticos
      - 🏗️ Arquitectura: Estructura de módulos y relaciones
      - 🚀 Guías de Inicio Rápido: Guías de inicio rápido
      - ⚠️ Casos Límite: Manejo de errores y limitaciones

      **Requisitos de Salida:**
      1. Descripciones claras y concisas
      2. Ejemplos de código con explicaciones
      3. Formato markdown apropiado
      4. Referencias cruzadas y enlaces
      5. Estructura de documentación mantenible

      Por favor lee el archivo de código y genera documentación apropiada.
      Incluye comentarios de documentación en línea y documentación externa según sea necesario.

  - name: "test_strategy"
    description: "🧪 Planificación de pruebas y recomendaciones de estrategia"
    content: |
      🧪 **Desarrollo de Estrategia de Pruebas**

      **Componente:** {component}
      **Tipos de Prueba:** {test_types}

      **Marco de Pruebas:**
      - 🔬 Pruebas Unitarias: Pruebas de función individual
      - 🔗 Pruebas de Integración: Pruebas de interacción de componentes
      - ⚡ Pruebas de Rendimiento: Pruebas de carga y estrés
      - 🛡️ Pruebas de Seguridad: Pruebas de vulnerabilidades y penetración
      - 👤 Aceptación de Usuario: Pruebas de flujo de trabajo de extremo a extremo

      **Entregables:**
      1. Plan de pruebas con objetivos de cobertura
      2. Especificaciones de casos de prueba
      3. Requisitos de infraestructura de pruebas
      4. Estrategia de automatización
      5. Puertas de calidad y criterios de éxito

      **Guía de Implementación:**
      - Patrones de pruebas específicos de Rust
      - Mocking y dobles de prueba
      - Configuración de integración continua

      Analiza el componente y proporciona una estrategia de pruebas completa.

  - name: "refactoring_plan"
    description: "♻️ Estrategia de refactorización sistemática con evaluación de riesgos"
    content: |
      ♻️ **Estrategia de Refactorización**

      **Código Objetivo:** {target_code}
      **Objetivos:** {goals}

      **Proceso de Refactorización:**
      - 🔍 Análisis: Evaluación del estado actual
      - 🎯 Objetivos: Objetivos claros de refactorización
      - 📋 Plan: Plan paso a paso de refactorización
      - ⚠️ Evaluación de Riesgos: Cambios potencialmente disruptivos
      - 🧪 Validación: Estrategia de pruebas para cambios

      **Consideraciones Clave:**
      1. Requisitos de compatibilidad hacia atrás
      2. Análisis de impacto en rendimiento
      3. Coordinación y comunicación del equipo
      4. Enfoque de entrega incremental
      5. Estrategias de rollback

      **Entregables:**
      - Hoja de ruta detallada de refactorización
      - Estrategias de mitigación de riesgos
      - Comparaciones antes/después del código
      - Plan de pruebas y validación

      Proporciona un enfoque seguro y sistemático para la mejora del código.

  - name: "security_audit"
    description: "🛡️ Evaluación de vulnerabilidades de seguridad y estrategias de mitigación"
    content: |
      🛡️ **Solicitud de Auditoría de Seguridad**

      **Alcance de Auditoría:** {scope}
      **Modelo de Amenazas:** {threat_model}

      **Marco de Evaluación de Seguridad:**
      - 🔒 Autenticación: Verificación de identidad
      - 🚪 Autorización: Mecanismos de control de acceso
      - 🛡️ Validación de Entrada: Saneamiento y validación de datos
      - 🔐 Criptografía: Encriptación y gestión de claves
      - 📊 Protección de Datos: Privacidad y manejo de datos
      - 🌐 Seguridad de Red: Seguridad de comunicaciones

      **Categorías de Vulnerabilidades:**
      1. Cumplimiento con OWASP Top 10
      2. Problemas de seguridad de memoria (específicos de Rust)
      3. Vulnerabilidades de dependencias
      4. Seguridad de configuración
      5. Fallos en lógica de negocio

      **Entregables:**
      - Informe de vulnerabilidades de seguridad
      - Evaluación de riesgos con niveles de severidad
      - Recomendaciones de remediación
      - Guía de mejores prácticas de seguridad

      Realiza un análisis de seguridad exhaustivo usando operaciones de archivo y herramientas de búsqueda.



resources:
  - name: "mcp_server_prompts"
    description: "Especificación de Prompts para Servidores MCP"
    path: "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/refs/heads/main/docs/specification/2024-11-05/server/prompts.mdx"

  - name: "mcp_server_tools"
    description: "Especificación de Herramientas para Servidores MCP"
    path: "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/refs/heads/main/docs/specification/2024-11-05/server/tools.mdx"

  - name: "mcp_server_resources"
    description: "Especificación de Recursos para Servidores MCP"
    path: "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/refs/heads/main/docs/specification/2024-11-05/server/resources.mdx"

```