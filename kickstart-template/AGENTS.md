# {{ project_name }}

## Project Overview

{{ project_overview }}

## Technology Stack

- **Language**: {{ programming_language }}
- **Framework**: {{ programming_framework }}
- **Database**: {{ database }}

## Steps for doing tasks

- Use always english language for documenting and coding. Is possible that you have part of the task in other language, but the final result must be in english.
- Check with Context7 the documentation for any specific guidelines.
- Ask for help if you are stuck.
  {% if include_serena %}
- Check always if serena is onboarding performed.
- Use Serena tools for search symbols, edit code or refactor.
  {% endif %}
  {% if include_remembrances %}

- Search in the knowledge base for relevant information, use mcp_remembrances tools for listing facts, entities and relationships, and getting the most relevant ones and search documents and getting the most relevant ones, preferently.
- Use Remembrances tools always at the beginning of a task for searching any useful information and at the end for summarizing what you have learned.
- Saves into knowledge base documents all relevant information about the project changes of interest for the future tasks.
- Finally when the task is completed, use mcp_remembrances tools to save the relevant information for future tasks, in the knowledge base, facts, entities and relationships.
  {% else %}
  - Use serena memories tools for listing memories, reading and writing relevant information about the project changes of interest for the future tasks.
  - Saves into memories all relevant information about the project changes of interest for the future tasks.
    {% endif %}
- If you have a complex task, break it down into smaller steps, use Sequential thinking and steps list for the process
- Fetch any relevant information from urls of the context task for updated context
- If you need build or running tests use Terminal tool or runCommand tool.
- Use the information found to complete the task.
- If you need to know from internet use mcp server web search tool, and fetch the most relevant information.
- Use prefently run_terminal tool to run commands, check code, and get the output.

## Development Guidelines

### Code Style

- Use {{ programming_language }} for all code
- Follow {{ programming_framework }} conventions for server/client component separation
- Ensure consistent use of {{ programming_language }} features and idioms
- Always add tests for any new functionality.

{% if has_tests %}

### Testing

- Run `{{ has_tests }}` for linting and type checking and launching tests
  {% endif %}

{% if has_build_system %}

### Deployment

- Run `{{ has_build_system }}` for building the project and review the output for any errors.
  {% endif %}

## Troubleshooting

### Common Issues

- **Type Errors**: Check readonly props and proper {{ programming_language }} types

### Debug Tips

- Check terminal errors running tests or build
