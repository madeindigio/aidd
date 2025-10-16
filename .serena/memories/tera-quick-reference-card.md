# Tera Template Engine: Quick Reference Card

**Version**: 1.x  
**Used By**: Kickstart templating engine  
**Syntax Base**: Jinja2 / Django templates

---

## Delimiters (Quick Reference)

```
{{ expression }}    Expression (variables, filters, functions)
{% statement %}     Statement (logic, loops, assignments)
{# comment #}       Comment (ignored in output)
```

---

## Variable Access Patterns

| Pattern | Example | Result |
|---------|---------|--------|
| Direct | `{{ name }}` | Value of name |
| Dot notation | `{{ user.name }}` | user object's name property |
| Array index | `{{ items.0 }}` | First item in array |
| Square bracket | `{{ obj["key"] }}` | Value with key "key" |
| Variable key | `{{ obj[var] }}` | Value with key from var |

---

## Operators

### Math
| Op | Use | Example |
|----|-----|---------|
| `+` | Add | `{{ 1 + 2 }}` → 3 |
| `-` | Subtract | `{{ 5 - 3 }}` → 2 |
| `*` | Multiply | `{{ 3 * 4 }}` → 12 |
| `/` | Divide | `{{ 10 / 2 }}` → 5 |
| `%` | Modulo | `{{ 7 % 3 }}` → 1 |

### Comparison
| Op | Use | Example |
|----|-----|---------|
| `==` | Equal | `{{ x == y }}` |
| `!=` | Not equal | `{{ x != y }}` |
| `<` | Less than | `{{ x < y }}` |
| `>` | Greater than | `{{ x > y }}` |
| `<=` | Less/equal | `{{ x <= y }}` |
| `>=` | Greater/equal | `{{ x >= y }}` |

### Logic
| Op | Use | Example |
|----|-----|---------|
| `and` | Both true | `{{ x and y }}` |
| `or` | Either true | `{{ x or y }}` |
| `not` | Negation | `{{ not x }}` |

### Other
| Op | Use | Example |
|----|-----|---------|
| `~` | Concatenate | `{{ "hello" ~ "world" }}` |
| `in` | Contains | `{{ "x" in "example" }}` |

---

## String Filters (Most Common)

| Filter | Purpose | Example |
|--------|---------|---------|
| `lower` | Lowercase | `{{ "HELLO" \| lower }}` |
| `upper` | Uppercase | `{{ "hello" \| upper }}` |
| `title` | Capitalize words | `{{ "hello world" \| title }}` |
| `capitalize` | First char upper | `{{ "hello" \| capitalize }}` |
| `trim` | Remove spaces | `{{ "  hi  " \| trim }}` |
| `truncate` | Limit length | `{{ text \| truncate(length=20) }}` |
| `replace` | Find & replace | `{{ text \| replace(from="a", to="b") }}` |
| `split` | Break into array | `{{ path \| split(pat="/") }}` |

---

## Array Filters (Most Common)

| Filter | Purpose | Example |
|--------|---------|---------|
| `length` | Size | `{{ array \| length }}` |
| `first` | First element | `{{ array \| first }}` |
| `last` | Last element | `{{ array \| last }}` |
| `reverse` | Reverse order | `{{ array \| reverse }}` |
| `sort` | Sort ascending | `{{ [3,1,2] \| sort }}` |
| `join` | Join with string | `{{ ["a","b"] \| join(sep=",") }}` |
| `concat` | Append values | `{{ arr1 \| concat(with=arr2) }}` |
| `slice` | Get portion | `{{ array \| slice(start=1, end=3) }}` |

---

## Case Conversion (Kickstart)

Used in template.toml variables:

```jinja2
{{ name | upper_camel_case }}       # MyProject
{{ name | camel_case }}             # myProject
{{ name | snake_case }}             # my_project
{{ name | kebab_case }}             # my-project
{{ name | shouty_snake_case }}      # MY_PROJECT
{{ name | shouty_kebab_case }}      # MY-PROJECT
{{ name | title_case }}             # My Project
```

---

## Control Flow

### If/Elif/Else
```jinja2
{% if condition %}
  ...
{% elif other %}
  ...
{% else %}
  ...
{% endif %}
```

### For Loop
```jinja2
{% for item in items %}
  {{ loop.index }}: {{ item }}
{% endfor %}

{% for key, value in dict %}
  {{ key }}: {{ value }}
{% endfor %}

{% for item in items %}
  {{ item }}
{% else %}
  No items
{% endfor %}
```

### Loop Variables
```jinja2
loop.index      # 1-based position
loop.index0     # 0-based position
loop.first      # true if first iteration
loop.last       # true if last iteration
{% break %}     # Exit loop
{% continue %}  # Skip to next iteration
```

---

## Tests (Conditions)

```jinja2
{% if var is defined %}           # Variable exists
{% if var is undefined %}         # Variable missing
{% if num is odd %}               # Is odd number
{% if num is even %}              # Is even number
{% if val is string %}            # Is string type
{% if val is number %}            # Is numeric
{% if val is iterable %}          # Can be looped
{% if text is containing("x") %} # Contains substring
{% if text is matching("^a") %}  # Matches regex
```

---

## Assignments

```jinja2
{% set x = 5 %}                    # Local variable
{% set y = x + 1 %}               # Expression
{% set arr = [1, 2, 3] %}         # Array
{% set_global g = "global" %}      # Global scope
```

---

## Template Inheritance

```jinja2
{# base.html #}
{% block name %}default{% endblock %}

{# child.html #}
{% extends "base.html" %}
{% block name %}override{% endblock %}
{{ super() }}  {# Include parent content #}
```

---

## Include & Macros

### Include
```jinja2
{% include "file.html" %}                    # Include file
{% include "file.html" ignore missing %}    # Don't error if missing
{% include ["custom.html", "default.html"] %} # Try first, fallback
```

### Macros
```jinja2
{# Define #}
{% macro input(label, type="text") %}
  <input type="{{type}}" />
{% endmacro %}

{# Call #}
{{ input(label="Name", type="email") }}
{{ self::input(label="Age") }}  {# Same file #}

{# Import #}
{% import "macros.html" as m %}
{{ m::my_macro() }}
```

---

## Functions

```jinja2
{{ range(end=5) }}                 # [0,1,2,3,4]
{{ range(start=1, end=5) }}        # [1,2,3,4]
{{ range(start=0, end=10, step_by=2) }} # [0,2,4,6,8]

{{ now() }}                        # Current datetime
{{ now(timestamp=true) }}          # Unix timestamp
{{ now() | date(format="%Y") }}    # Current year

{{ get_env(name="HOME") }}         # Environment var
{{ get_env(name="DEBUG", default="false") }}

{{ get_random(start=1, end=10) }}  # Random number

{{ throw(message="Error text") }}  # Raise error
```

---

## Advanced Features

### Whitespace Control
```jinja2
{%- expr -%}    Remove whitespace before & after
{{- expr -}}    Remove whitespace before & after
{#- expr -#}    Remove whitespace before & after
```

### Raw Blocks
```jinja2
{% raw %}
  This {{ won't }} be rendered
{% endraw %}
```

### Filter Sections
```jinja2
{% filter upper %}
  hello world
{% endfilter %}
```

### Safe HTML (No Escaping)
```jinja2
{{ html | safe }}                  # Don't escape HTML
{{ data | json_encode | safe }}    # JSON safe
```

### Default Values
```jinja2
{{ optional | default(value="fallback") }}
```

---

## Commonly Used Filter Chains

```jinja2
{# Clean text #}
{{ text | trim | lower }}

{# Format name #}
{{ project_name | kebab_case | lower }}

{# Safe JSON #}
{{ data | json_encode(pretty=true) | safe }}

{# URL-safe string #}
{{ title | slugify | urlencode }}

{# Comma-separated list #}
{{ items | map(attribute="name") | join(sep=", ") }}

{# Count items #}
{{ items | length }} item{{ items | length | pluralize }}
```

---

## Kickstart Template Variables

These are available in templates from user answers:

```jinja2
{{ project_name }}              # From: project_name variable
{{ project_overview }}          # From: project_overview variable
{{ programming_language }}      # From: programming_language variable
{{ programming_framework }}     # From: programming_framework variable
{{ database }}                  # From: database variable
{{ include_remembrances }}      # From: include_remembrances variable
{{ include_serena }}            # From: include_serena variable
{{ include_kilocode }}          # From: include_kilocode variable
{{ has_build_system }}          # From: has_build_system variable
{{ has_tests }}                 # From: has_tests variable
{{ use_docker }}                # From: use_docker variable
{{ remembrances_db }}           # From: remembrances_db variable (if enabled)
```

---

## File & Directory Naming

```
{{ project_name }}/README.md      → my-project/README.md
config/{{ database }}.toml         → config/postgres.toml
{{ project_name | snake_case }}/   → my_awesome_project/
```

### Windows Notes
On Windows, use `$$` instead of `|` for filters in paths:
```
config\{{ app_name $$upper }}.yaml
```

---

## Escape Sequences

HTML escaping (auto, can be disabled):

```jinja2
&       → &amp;
<       → &lt;
>       → &gt;
"       → &quot;
'       → &#x27;
/       → &#x2F;
```

Use `safe` filter to prevent escaping.

---

## Error Prevention

| Problem | Solution |
|---------|----------|
| Undefined variable | Use `is defined` test or `default` filter |
| Wrong type | Test type with `is string`, `is number`, etc. |
| Filter on wrong type | Check type before applying filter |
| Math priority | Put filter first: `{{ array \| length + 1 }}` |
| Path traversal | Use absolute paths in file templates |

---

## Performance Tips

1. ✅ Use `is defined` before accessing optional vars
2. ✅ Pre-sort/filter data when possible
3. ✅ Chain filters instead of nested loops
4. ✅ Avoid complex logic in templates
5. ✅ Use inheritance for code reuse

---

## Quick Debugging

```jinja2
{# Print all variables #}
{{ __tera_context }}

{# Print specific variable #}
{# {{ project_name }} #}

{# Conditional debug block #}
{% if false %}
  Debug content here (won't render)
{% endif %}
```

---

## Cheat Sheet Quick Links

| Need | Syntax |
|------|--------|
| Variable | `{{ name }}` |
| Filter | `{{ val \| filter_name }}` |
| Condition | `{% if test %} ... {% endif %}` |
| Loop | `{% for item in items %} ... {% endfor %}` |
| Assignment | `{% set x = 5 %}` |
| Inheritance | `{% extends "base" %} {% block name %} ... {% endblock %}` |
| Include | `{% include "file.html" %}` |
| Macro | `{% macro name(args) %} ... {% endmacro %}` |
| Comment | `{# text #}` |
| Test | `{% if x is odd %} ... {% endif %}` |

---

## Official Resources

- **Tera Home**: https://keats.github.io/tera/
- **Documentation**: https://keats.github.io/tera/docs/
- **API Docs**: https://docs.rs/tera/
- **GitHub**: https://github.com/Keats/tera
- **Examples**: https://github.com/Keats/tera/tree/master/examples

