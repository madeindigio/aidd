# {{ project_name }}

## Project Overview

{{ project_overview }}

## Technology Stack

- **Language**: {{ programming_language }}
- **Framework**: {{ programming_framework }}
- **Database**: {{ database }}

## Development Guidelines

### Code Style

- Use {{ programming_language }} for all code
- Follow {{ programming_framework }} conventions for server/client component separation
- Ensure consistent use of {{ programming_language }} features and idioms
- Search in Google (Serper) if it is necessary for more information about general concepts.
- Check with Context7 the documentation for any specific guidelines.
- Ask for help if you are stuck.
- Use Serena tools for search symbols, edit code or refactor.
- Use Remembrances tools always at the beginning of a task for searching any useful information and at the end for summarizing what you have learned.
- Saves into knowledge base or memories all relevant information about the project changes of interest for the future tasks.
- If you have a complex task, break it down into smaller steps, use Sequential thinking and steps list for the process
- Fetch any relevant information from urls of the context task for updated context
- If you need build or running tests use Terminal.
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

## Contributing

When making changes:

1. Follow existing code patterns
2. Update documentation as needed
3. Test thoroughly before committing
4. Consider performance and accessibility implications
