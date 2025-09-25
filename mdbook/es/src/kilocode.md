# Mejores prácticas para Kilo Assistant

Este documento proporciona un resumen de las mejores prácticas para usar Kilo Assistant, con enlaces a la documentación oficial para información más detallada.

## Usando modos

Los modos en Kilo Code son personas especializadas que adaptan el comportamiento del asistente a tu tarea actual. Cada modo ofrece diferentes capacidades, expertise y niveles de acceso para ayudarte a lograr objetivos específicos.

- **Modo Code:** Para escribir código, implementar características, depurar y desarrollo general.
- **Modo Ask:** Para explicación de código, exploración de conceptos y aprendizaje técnico.
- **Modo Architect:** Para diseño de sistemas, planificación de alto nivel y discusiones de arquitectura.
- **Modo Debug:** Para rastrear bugs, diagnosticar errores y resolver problemas complejos.
- **Modo Orchestrator:** Para desglosar proyectos complejos en subtareas manejables.

Para más detalles, consulta la [documentación de Using Modes](https://kilocode.ai/docs/basic-usage/using-modes).

## Menciones de contexto

Las menciones de contexto son una forma poderosa de proporcionar a Kilo Code información específica sobre tu proyecto. Usa el símbolo `@` para referirte a archivos, carpetas, problemas y commits de Git.

- **Archivo:** `@/path/to/file.ts`
- **Carpeta:** `@/path/to/folder/`
- **Problemas:** `@problems`
- **Terminal:** `@terminal`
- **Commit de Git:** `@a1b2c3d`
- **Cambios de Git:** `@git-changes`
- **URL:** `@https://example.com`

Para más detalles, consulta la [documentación de Context Mentions](https://kilocode.ai/docs/basic-usage/context-mentions).

## Aprobación automática de acciones

Las configuraciones de aprobación automática aceleran tu flujo de trabajo eliminando prompts de confirmación repetitivos, pero aumentan significativamente los riesgos de seguridad. Solo habilita la aprobación automática para acciones en las que confíes completamente.

Para más detalles, consulta la [documentación de Auto-Approving Actions](https://kilocode.ai/docs/features/auto-approving-actions).

## Cómo funcionan las herramientas

Kilo Code usa herramientas para interactuar con tu código y entorno. Estos ayudantes especializados realizan acciones específicas como leer archivos, hacer ediciones, ejecutar comandos o buscar en tu base de código.

Para más detalles, consulta la [documentación de How Tools Work](https://kilocode.ai/docs/basic-usage/how-tools-work).

## Mejorar prompt

La característica "Enhance Prompt" te ayuda a mejorar la calidad y efectividad de tus prompts antes de enviarlos al modelo de IA.

Para más detalles, consulta la [documentación de Enhance Prompt](https://kilocode.ai/docs/features/enhance-prompt).

## Ingeniería de prompts

La ingeniería de prompts es el arte de elaborar instrucciones efectivas para modelos de IA. Los prompts bien escritos llevan a mejores resultados, menos errores y un flujo de trabajo más eficiente.

Para más detalles, consulta la [documentación de Prompt Engineering Tips](https://kilocode.ai/docs/advanced-usage/prompt-engineering).

## Reglas personalizadas

Las reglas personalizadas proporcionan una forma poderosa de definir comportamientos y restricciones específicos del proyecto y globales para el agente de IA de Kilo Code.

Para más detalles, consulta la [documentación de Custom Rules](https://kilocode.ai/docs/advanced-usage/custom-rules).

## Instrucciones personalizadas

Las instrucciones personalizadas te permiten personalizar cómo se comporta Kilo Code, proporcionando guía específica que moldea respuestas, estilo de codificación y procesos de toma de decisiones.

Para más detalles, consulta la [documentación de Custom Instructions](https://kilocode.ai/docs/advanced-usage/custom-instructions).

## Banco de memoria

El Banco de Memoria es un sistema de documentación estructurada que permite a Kilo Code entender mejor tu proyecto y mantener el contexto a través de sesiones de codificación.

Para más detalles, consulta la [documentación de Memory Bank](https://kilocode.ai/docs/advanced-usage/memory-bank).

## Trabajando con proyectos grandes

Los proyectos grandes requieren algo de cuidado extra para gestionar el contexto efectivamente. Usa rutas de archivo específicas, desglosa tareas y resume grandes cantidades de código.

Para más detalles, consulta la [documentación de Working with Large Projects](https://kilocode.ai/docs/advanced-usage/large-projects).

## Temperatura del modelo

La temperatura controla la aleatoriedad de las salidas del modelo de IA. Ajustar esta configuración optimiza los resultados para diferentes tareas.

Para más detalles, consulta la [documentación de Model Temperature](https://kilocode.ai/docs/features/model-temperature).