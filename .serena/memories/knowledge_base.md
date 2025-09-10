# Knowledge Base for Kickstart Template

## Overview
Kickstart is a project template generator tool developed by Keats, available at https://github.com/Keats/kickstart. It allows users to create project templates using a configuration file called template.toml.

## Template Configuration
The template.toml file defines the structure of the template, including variables, hooks, and other settings. Variables can have conditional logic using the `only_if` field, which prompts the user only if a specified condition is met.

### Example Variable with Condition
Variables like `remembrances_db` can be set to prompt only if another variable (e.g., `include_remembrances`) is true, using:
```
only_if = {name = "include_remembrances", value = true}
```

This ensures dependencies are handled correctly in the template generation process.

## Future References
- Refer to the GitHub repo for the latest documentation and examples.
- Use this knowledge to configure similar conditional variables in other templates.