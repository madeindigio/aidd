# Guía de desarrollo efectivo dirigido por AI

Muchos habéis experimentado que los asistentes de IA pueden ser increíblemente útiles para acelerar el desarrollo, pero a veces pueden generar código incorrecto o ineficiente. Esta guía te ayudará a aprovechar al máximo los asistentes de IA como GitHub Copilot y Kilo Assistant, asegurando que produzcan código de alta calidad y eficiente.

Aquí indico algunas prácticas recomendadas para trabajar con asistentes de IA en tu flujo de trabajo de desarrollo:

1. Configura tu proyecto con la configuración AI. En este repo dispones de una template para [Kickstart](https://github.com/madeindigio/aidd/tree/main/kickstart-template) que incluye configuraciones recomendadas para Copilot y VSCode utilizando los servidores MCP más importantes para acelerar y optimizar el desarrollo (ver sección de Servidores MCP).
   
2. Una vez usada la plantilla usarás tools de "recuerdos" como Serena o Remembrances para almacenar todo aquello importante en tu desarrollo o tareas que la AI esté realizando, normalmente se habrá configurado con la plantilla instrucciones para que la AI lo use de forma autónoma guardando recuerdos relevantes y consultando antes de cada tarea los recuerdos relacionados que pueden ser relevantes para la tarea. **Si en algún momento ves que al finalizar una tarea, no ha guardado en recuerdos algo que consideras importante, indícaselo en el chat y pídele que lo guarde.**
   
3. Utiliza un fichero plan.md, si usas Serena MCP, puedes usar la carpeta `.serena/memories/plan.md` ya que esta carpeta guardará cualquier información que sirva como base de conocimiento en formato markdown, tanto Serena como  Remembrances usarán estos ficheros como base de conocimiento para responder a tus preguntas y generar código. La diferencia es que Remembrances también dispone de mecanismos para guardar relaciones, entidades con metadatos y otros elementos relacionados en un grafo de conocimiento que pueden ser muy útiles para proyectos complejos. 

El plan.md debe de indicar, que es el archivo de planificación de tareas del proyecto, tendrás tareas ya realizadas y otras no, puedes usar la sintaxis de markdown para organizar las tareas, por ejemplo:

```markdown
# Plan de desarrollo del proyecto X

- [x] Tarea 1: Configurar el entorno de desarrollo
- [x] Tarea 2: Implementar la funcionalidad de autenticación
- [ ] Tarea 3: Desarrollar la API REST para la gestión de usuarios
- [ ] Tarea 4: Crear la interfaz de usuario con React
- [ ] Tarea 5: Integrar la API con la interfaz de usuario
```
4. Si eres suficiéntemente específico en la definición de cada tarea, indicando qué herramientas usar, qué usar para buscar información de una librería, o qué parte de código quieres revisar en cada tarea, la AI podrá realizar las tareas de forma autónoma sin que tengas que indicarle nada más. Si no es así, te pedirá más información o te indicará qué necesita para completar la tarea. Tu prompt podrá ser algo tan sencillo como:
> *"teniendo en cuenta el plan.md continua con las tareas pendientes teniendo en cuenta las tareas realizadas anteriormente por si son relevantes para tu trabajo actual."*

5. Si estás trabajando con un proyecto de código existente, asegúrate de haber generado una base de conocimiento inicial de todo el proyecto, te explico ahora cómo hacerlo:

   - Usa Serena MCP para indexar todo el código del proyecto. Puedes usar el comando `serena index` para crear un índice semántico de todo el código, lo que permitirá a la IA entender mejor la estructura y las relaciones dentro del código.
   - Si el proyecto es muy grande, puedes usar Remembrances MCP para crear recuerdos específicos de partes importantes del proyecto, como módulos clave, funciones críticas o cualquier otra información relevante que pueda ayudar a la IA a comprender mejor el contexto.
   - Asegúrate de que ambos servidores MCP estén configurados correctamente en tu entorno de desarrollo y que la IA pueda acceder a ellos.
   - Empieza a interactuar con la AI en modo agente, pidiéndole que revise el código existente, y documente usando Serena o Remembrances la estructura del proyecto, las funciones principales, todos aquellos detalles que conozcas que existen, y que consideres relevantes para otros programadores o la propia AI en el futuro, por ejemplo:
   - *"Revisa el código del proyecto y crea un resumen de las funciones principales, módulos y cualquier otra información relevante que pueda ayudar a entender la estructura del proyecto. Usa Serena para indexar el código y Remembrances para crear recuerdos específicos de partes importantes del proyecto."*
   - *"Revisa las migraciones de bbdd y los esquemas que generan los modelos y crea un resumen de la estructura de la base de datos, incluyendo tablas, relaciones y cualquier otra información relevante. También genera un diagrama en mermaid de la estructura de la base de datos."*
   - *"Revisa los endpoints de la API y crea un resumen de los mismos, incluyendo rutas, métodos HTTP, parámetros y cualquier otra información relevante. Usa este resumen para generar documentación de la API en formato OpenAPI."*
   - *"Revisa los componentes de la interfaz de usuario y crea un resumen de los mismos, incluyendo su estructura, props y cualquier otra información relevante. Usa este resumen para generar documentación de los componentes en formato Storybook."*
  
6. En ocasiones será interesante que la AI pueda leer los logs de alguna carpeta, logs de compilación o errores en los tests, para ello puedes usar MyCommandMCP para crear comandos que lean los logs y los guarden en recuerdos de Remembrances o en ficheros markdown en la carpeta `.serena/memories/` para que Serena pueda indexarlos y usarlos como base de conocimiento.