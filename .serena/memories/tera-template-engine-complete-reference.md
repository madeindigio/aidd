# Tera Template Engine: Complete Reference Guide

**Engine**: Tera v1  
**Based On**: Jinja2 and Django templates  
**Documentation**: https://keats.github.io/tera/docs/  
**Repository**: https://github.com/Keats/tera

## Quick Start

### Installation
```rust
// Cargo.toml
tera = "1"

// With specific features
tera = { version = "1", default-features = false }
```

### Basic Usage
```rust
use tera::Tera;
use tera::Context;

let tera = Tera::new("templates/**/*.html")?;
let mut context = Context::new();
context.insert("name", &"World");
let result = tera.render("hello.html", &context)?;
```

---

## Template Basics

### Delimiters (Cannot be Changed)
- `{{ }}` - **Expressions**: Variables and filters
- `{% %}` - **Statements**: Logic, loops, assignments
- `{# #}` - **Comments**: Ignored during rendering

### Example
```jinja2
{# This is a comment #}
{{ name }}            {# Expression #}
{% set x = 5 %}       {# Statement #}
```

### Whitespace Control
Remove whitespace before/after statements with `-`:
```jinja2
{% set my_var = 2 -%}    {# Remove whitespace after #}
{{ my_var }}

{%- set x = 1 %}         {# Remove whitespace before #}

Works with: {{- expr -}}, {%- stmt -%}, {#- comment -#}
```

### Raw Blocks
Prevent rendering of Tera syntax:
```jinja2
{% raw %}
  This {{ variable }} won't be rendered
{% endraw %}
```

---

## Data Structures

### Literals
```jinja2
{{ true }}               {# Boolean #}
{{ false }}              {# or False #}
{{ 42 }}                 {# Integer #}
{{ 3.14 }}               {# Float #}
{{ "hello" }}            {# String #}
{{ 'world' }}            {# Single quotes #}
{{ `backticks` }}        {# Backticks #}
{{ [1, 2, 3] }}          {# Array #}
{{ [1, 2, 3,] }}         {# Trailing comma OK #}
```

### Variables & Access

#### Dot Notation
```jinja2
{{ product }}            {# Direct variable #}
{{ product.name }}       {# Attribute access #}
{{ items.0 }}            {# Array index (zero-based) #}
{{ items.1 }}
```

#### Square Bracket Notation
```jinja2
{{ product["name"] }}    {# String key #}
{{ product['description'] }}
{{ product[my_var] }}    {# Variable as key #}
{{ array[0] }}           {# Works for arrays too #}
```

---

## Expressions

### Mathematical Operations
```jinja2
{{ 1 + 1 }}              {# Addition: 2 #}
{{ 5 - 3 }}              {# Subtraction: 2 #}
{{ 10 / 2 }}             {# Division: 5 #}
{{ 3 * 4 }}              {# Multiplication: 12 #}
{{ 7 % 3 }}              {# Modulo: 1 #}
```

**Priority** (low to high): `+/-`, then `*/%`

### Comparisons
```jinja2
{{ x == y }}             {# Equal #}
{{ x != y }}             {# Not equal #}
{{ x >= y }}             {# Greater or equal #}
{{ x <= y }}             {# Less or equal #}
{{ x > y }}              {# Greater #}
{{ x < y }}              {# Less #}
```

### Logic
```jinja2
{{ x and y }}            {# Both true #}
{{ x or y }}             {# At least one true #}
{{ not x }}              {# Negation #}
```

### String Concatenation
```jinja2
{{ "hello " ~ 'world' }} {# hello world #}
{{ name ~ " is here" }}
{{ x ~ y ~ z }}         {# Multiple concatenations #}
```

### Membership Testing (`in`)
```jinja2
{{ 1 in [1, 2, 3] }}            {# true #}
{{ 'x' in "example" }}          {# true - substring #}
{{ 'key' in obj }}              {# true - object key #}
{{ x not in array }}            {# Negation #}
```

---

## Manipulating Data

### Assignments
```jinja2
{% set my_var = "hello" %}       {# Simple assignment #}
{% set x = 1 + 4 %}              {# Expression #}
{% set arr = [1, true, some_var | round] %}  {# With filters #}
{% set_global global_x = 5 %}    {# Global scope #}
```

**Scope Rules**:
- Regular `set`: scoped to current context (loops, macros)
- `set_global`: affects global context
- In for loops: assignments only valid for current iteration

---

## Filters

### Filter Syntax
```jinja2
{{ value | filter_name }}                    {# Single filter #}
{{ value | filter1 | filter2 }}              {# Chained filters #}
{{ name | lower | replace(from="a", to="b") }} {# With arguments #}
```

### Filter Sections
Apply filters to entire blocks:
```jinja2
{% filter upper %}
    Hello {{ name }}
{% endfilter %}

{% filter upper %}
  {% block content %}Text{% endblock %}
{% endfilter %}
```

### String Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `lower` | Lowercase | `{{ "HELLO" \| lower }}` → `hello` |
| `upper` | Uppercase | `{{ "hello" \| upper }}` → `HELLO` |
| `capitalize` | First char uppercase, rest lower | `{{ "hELLO" \| capitalize }}` → `Hello` |
| `title` | Capitalize each word | `{{ "hello world" \| title }}` → `Hello World` |
| `trim` | Remove leading/trailing whitespace | `{{ "  hi  " \| trim }}` → `hi` |
| `trim_start` | Remove leading whitespace | - |
| `trim_end` | Remove trailing whitespace | - |
| `trim_start_matches(pat)` | Remove leading pattern | `{{ "//a/b" \| trim_start_matches(pat="//") }}` → `a/b` |
| `trim_end_matches(pat)` | Remove trailing pattern | - |
| `replace(from, to)` | Replace substring | `{{ "doctor" \| replace(from="doctor", to="Dr.") }}` → `Dr.` |
| `addslashes` | Add backslashes before quotes | `{{ "I'm" \| addslashes }}` → `I\'m` |
| `slugify` | Convert to URL slug | `{{ "Hello World!" \| slugify }}` → `hello-world` |
| `wordcount` | Count words | `{{ "hello world" \| wordcount }}` → `2` |
| `split(pat)` | Split into array | `{{ "/a/b/c" \| split(pat="/") }}` → `["", "a", "b", "c"]` |

### Array Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `first` | First element | `{{ array \| first }}` |
| `last` | Last element | `{{ array \| last }}` |
| `nth(n)` | Element at index n | `{{ array \| nth(n=2) }}` |
| `length` | Array/string/object length | `{{ "hello" \| length }}` → `5` |
| `reverse` | Reverse array/string | `{{ "hello" \| reverse }}` → `olleh` |
| `sort` | Sort ascending | `{{ [3,1,2] \| sort }}` → `[1,2,3]` |
| `sort(attribute)` | Sort by field | `{{ people \| sort(attribute="age") }}` |
| `unique` | Remove duplicates | `{{ [1,1,2] \| unique }}` → `[1,2]` |
| `unique(attribute)` | Unique by field | `{{ people \| unique(attribute="age") }}` |
| `slice(start, end)` | Array slice | `{{ array \| slice(start=1, end=3) }}` |
| `join(sep)` | Join with separator | `{{ ["a", "b"] \| join(sep=" // ") }}` → `a // b` |
| `concat(with)` | Append values | `{{ arr1 \| concat(with=arr2) }}` |
| `group_by(attribute)` | Group by field | `{{ posts \| group_by(attribute="year") }}` |
| `filter(attribute, value)` | Filter by value | `{{ posts \| filter(attribute="draft", value=false) }}` |
| `map(attribute)` | Extract field | `{{ people \| map(attribute="age") }}` |

### HTML/XML Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `escape` | Escape HTML | `{{ "<div>" \| escape }}` → `&lt;div&gt;` |
| `escape_xml` | Escape XML | - |
| `safe` | Mark as safe (no escape) | `{{ html \| safe }}` |
| `striptags` | Remove HTML tags | `{{ "<b>text</b>" \| striptags }}` → `text` |
| `spaceless` | Remove space between tags | `{{ "<p>\n<a></a></p>" \| spaceless }}` → `<p><a></a></p>` |
| `linebreaksbr` | Convert newlines to `<br>` | `{{ "line1\nline2" \| linebreaksbr }}` → `line1<br>line2` |
| `indent(prefix, first, blank)` | Indent lines | `{{ text \| indent(prefix="  ") }}` |

### Number Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `abs` | Absolute value | `{{ -5 \| abs }}` → `5` |
| `round` | Round to integer | `{{ 3.7 \| round }}` → `4` |
| `round(method, precision)` | Advanced rounding | `{{ 3.14159 \| round(method="floor", precision=2) }}` → `3.14` |
| `filesizeformat` | Human-readable size | `{{ 1048576 \| filesizeformat }}` → `1 MB` |
| `int` | Convert to integer | `{{ "42" \| int }}` → `42` |
| `float` | Convert to float | `{{ "3.14" \| float }}` → `3.14` |
| `pluralize` | Add plural suffix | `{{ 5 \| pluralize }}` → `s` |
| `pluralize(singular, plural)` | Custom suffix | `{{ 2 \| pluralize(singular="y", plural="ies") }}` → `ies` |

### URL & Encoding Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `urlencode` | URL encode | `{{ "/foo?a=b" \| urlencode }}` → `/foo%3Fa%3Db` |
| `urlencode_strict` | Strict URL encode | `{{ "/foo" \| urlencode_strict }}` → `%2Ffoo` |

### Date Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `date` | Format date | `{{ timestamp \| date }}` → `2025-10-16` |
| `date(format)` | Custom format | `{{ ts \| date(format="%Y-%m-%d") }}` |
| `date(timezone)` | With timezone | `{{ ts \| date(timezone="America/New_York") }}` |
| `date(locale)` | With locale | `{{ ts \| date(locale="fr_FR") }}` |

### Data Format Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `json_encode` | Convert to JSON | `{{ data \| json_encode \| safe }}` |
| `json_encode(pretty)` | Pretty JSON | `{{ data \| json_encode(pretty=true) \| safe }}` |
| `as_str` | Convert to string | `{{ 42 \| as_str }}` |
| `get(key, default)` | Get value safely | `{{ obj \| get(key="name", default="N/A") }}` |
| `default(value)` | Provide default | `{{ empty_var \| default(value="fallback") }}` |

### Text Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `truncate(length)` | Truncate string | `{{ "hello world" \| truncate(length=8) }}` → `hello...` |
| `truncate(length, end)` | Custom ending | `{{ text \| truncate(length=10, end="") }}` |

---

## Tests

Tests check conditions within templates using the `is` keyword:

```jinja2
{% if value is test_name %}
    ...
{% endif %}

{% if value is not test_name %}
    ...
{% endif %}
```

### Available Tests

| Test | Purpose | Example |
|------|---------|---------|
| `defined` | Variable exists | `{% if var is defined %}` |
| `undefined` | Variable missing | `{% if var is undefined %}` |
| `odd` | Is odd number | `{% if num is odd %}` |
| `even` | Is even number | `{% if num is even %}` |
| `string` | Is string type | `{% if val is string %}` |
| `number` | Is number type | `{% if val is number %}` |
| `divisibleby(n)` | Divisible by n | `{% if num is divisibleby(5) %}` |
| `iterable` | Can be looped | `{% if val is iterable %}` |
| `object` | Is object/map | `{% if val is object %}` |
| `starting_with(str)` | Starts with string | `{% if path is starting_with("x/") %}` |
| `ending_with(str)` | Ends with string | `{% if filename is ending_with(".html") %}` |
| `containing(str)` | Contains value | `{% if text is containing("hello") %}` |
| `matching(regex)` | Matches regex | `{% if email is matching("^[^@]+@[^@]+$") %}` |

---

## Control Structures

### If / Elif / Else
```jinja2
{% if price < 10 %}
    Cheap
{% elif price < 100 %}
    Moderate
{% else %}
    Expensive
{% endif %}
```

**Falsy Values**:
- Undefined variables
- Empty strings/arrays/objects
- `false`
- `null`

### For Loops

#### Basic Loop
```jinja2
{% for item in items %}
    {{ loop.index }}. {{ item }}
{% endfor %}
```

#### Loop Variables
```jinja2
loop.index      {# 1-indexed current position #}
loop.index0     {# 0-indexed current position #}
loop.first      {# true if first iteration #}
loop.last       {# true if last iteration #}
```

#### Loop Control
```jinja2
{% for item in items %}
    {% if item.id == target %}{% break %}{% endif %}
    {{ item }}
{% endfor %}

{% for item in items %}
    {% if loop.index is even %}{% continue %}{% endif %}
    {{ item }}
{% endfor %}
```

#### Loop Over Maps/Objects
```jinja2
{% for key, value in object %}
    {{ key }}: {{ value }}
{% endfor %}
```

#### Loop Over Literals
```jinja2
{% for num in [1, 2, 3] %}
    {{ num }}
{% endfor %}
```

#### Reverse Loop
```jinja2
{% for item in items | reverse %}
    {{ item }}
{% endfor %}
```

#### Empty Loop Block
```jinja2
{% for item in items %}
    {{ item }}
{% else %}
    No items found
{% endfor %}
```

---

## Template Inheritance

### Base Template (`base.html`)
```jinja2
<!DOCTYPE html>
<html>
<head>
    {% block head %}
        <title>{% block title %}Default Title{% endblock title %}</title>
    {% endblock head %}
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
```

### Child Template (`page.html`)
```jinja2
{% extends "base.html" %}

{% block title %}My Page{% endblock %}

{% block content %}
    {{ super() }}    {# Include parent content #}
    <p>My content</p>
{% endblock %}
```

### Multiple Levels
```jinja2
// grandparent.html
{% block hey %}hello{% endblock %}

// parent.html
{% extends "grandparent" %}
{% block hey %}hi and {{ super() }} {% block nested %}end{% endblock %}{% endblock %}

// child.html
{% extends "parent" %}
{% block hey %}dad says {{ super() }}{% endblock %}
{% block nested %}with love{% endblock %}
```

Result: "dad says hi and hello with love"

---

## Include & Macros

### Include
```jinja2
{% include "header.html" %}              {# Include with current context #}
{% include "nav.html" ignore missing %}  {# Don't error if missing #}
{% include ["custom.html", "default.html"] %}  {# Try first, fallback to second #}
```

**Limitations**:
- Variables set in included template don't persist to parent
- Cannot mix inheritance with includes
- Template path must be static string

### Macros
```jinja2
{# Define macro #}
{% macro input(label, type="text") %}
    <label>
        {{ label }}
        <input type="{{type}}" />
    </label>
{% endmacro input %}

{# Call macro #}
{{ input(label="Name", type="text") }}
{{ self::input(label="Email") }}    {# Same file #}
```

### Import Macros
```jinja2
{% import "macros.html" as m %}
{{ m::my_macro(arg="value") }}
```

### Recursive Macros
```jinja2
{% macro factorial(n) %}
    {% if n > 1 %}
        {{ n }} - {{ self::factorial(n=n-1) }}
    {% else %}
        1
    {% endif %}
{% endmacro %}
```

---

## Built-in Functions

### Global Functions
Functions that can be called in expressions and for loops:

#### `range(start, end, step_by)`
```jinja2
{% for i in range(end=5) %}        {# [0, 1, 2, 3, 4] #}
{% for i in range(start=1, end=5) %} {# [1, 2, 3, 4] #}
{% for i in range(start=0, end=10, step_by=2) %} {# [0, 2, 4, 6, 8] #}
```

#### `now(timestamp, utc)`
```jinja2
{{ now() }}                         {# Current datetime string #}
{{ now(timestamp=true) }}           {# Unix timestamp #}
{{ now(utc=true) }}                 {# UTC instead of local #}
{{ now() | date(format="%Y") }}     {# Current year #}
```

#### `get_env(name, default)`
```jinja2
{{ get_env(name="HOME") }}          {# Environment variable #}
{{ get_env(name="DEBUG", default="false") }}  {# With fallback #}
```

#### `get_random(start, end)`
```jinja2
{{ get_random(start=0, end=10) }}   {# Random 0-9 #}
{{ get_random(end=100) }}           {# Random 0-99 #}
```

#### `throw(message)`
```jinja2
{% if not valid %}
    {{ throw(message="Invalid value") }}
{% endif %}
```

---

## Advanced Features

### Auto-Escaping
Automatic HTML escaping for security:

```rust
// Enable for specific extensions
tera.autoescape_on(vec![".html", ".htm", ".xml"]);

// Disable completely
tera.autoescape_on(vec![]);
```

Escaped characters:
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#x27;`
- `/` → `&#x2F;`

Use `safe` filter to prevent escaping:
```jinja2
{{ html | replace(from="<", to="&lt;") | safe }}
```

### Loading from Strings
```rust
let mut tera = Tera::default();
tera.add_raw_template("hello.html", "the body")?;

// Multiple related templates
tera.add_raw_templates(vec![
    ("parent", "{% block x %}hello{% endblock x %}"),
    ("child", "{% extends \"parent\" %}{% block x %}hi{% endblock x %}"),
])?;
```

### One-Off Templates
```rust
let context = Context::new();
let result = Tera::one_off(user_template, &context, true)?;
```

### Template Reloading
```rust
tera.full_reload()?;  {# Reload all templates on change #}
```

### Extending Instances
```rust
tera.extend(&other_tera_instance)?;
```

---

## Case Conversion Filters

These filters transform text casing (from Kickstart's perspective):

```jinja2
{{ name | upper_camel_case }}       {# UpperCamelCase #}
{{ name | camel_case }}             {# lowerCamelCase #}
{{ name | snake_case }}             {# snake_case #}
{{ name | kebab_case }}             {# kebab-case #}
{{ name | shouty_snake_case }}      {# SHOUTY_SNAKE_CASE #}
{{ name | title_case }}             {# Title Case #}
{{ name | shouty_kebab_case }}      {# SHOUTY-KEBAB-CASE #}
```

### Example in Kickstart
```toml
# template.toml
[[variables]]
name = "project_name"
default = "my-awesome-project"

# In templates
{{ project_name | snake_case }}     # my_awesome_project
{{ project_name | upper_camel_case }} # MyAwesomeProject
```

---

## Kickstart-Specific Patterns

### Template Variables
All answers from Kickstart template questions become available as context variables:

```jinja2
{{ project_name }}
{{ programming_language }}
{{ database }}
{{ include_remembrances }}
```

### File/Directory Templating
```
{{ project_name }}/README.md
  → my-project/README.md

config/{{ programming_language }}.json
  → config/typescript.json

templates/{{ project_name | snake_case }}/
  → templates/my_project/
```

### Conditional File Generation
Using `only_if` in template.toml creates conditional behavior in files:

```
# If include_remembrances = true, this file exists
.env.remembrances

# If include_serena = true, this file exists
.serena/project.yml
```

### Post-Generation Variables
In shell scripts after generation, variables are available as environment or in context:

```bash
#!/bin/bash
# Post-gen hook can use template variables
PROJECT_NAME="{{ project_name }}"
LANGUAGE="{{ programming_language }}"
```

---

## Common Patterns

### Dynamic Configuration
```jinja2
{
  "projectName": "{{ project_name }}",
  "language": "[{{ programming_language }}]",
  "database": "{{ database }}",
  "debug": {{ debug | default(value=false) | as_str | lower }}
}
```

### Conditional Blocks
```jinja2
{% if include_serena %}
  [serena]
  path = ".serena"
  enabled = true
{% endif %}
```

### Repeated Elements
```jinja2
{% for feature in features %}
  [{{ feature | lower }}]
  enabled = true
{% endfor %}
```

### Safe HTML Output
```jinja2
{{ markdown_content | safe }}     {# Don't escape HTML #}
```

### Array Operations
```jinja2
{% set languages = ["Python", "Rust", "Go"] %}
{% for lang in languages | sort %}
  - {{ lang }}
{% endfor %}
```

---

## Filter Priority & Execution Order

Filters in math expressions have **lowest priority**:

```jinja2
{{ 1 + a | length }}     {# Evaluated as: (1 + a) | length - ERROR #}
{{ a | length + 1 }}     {# Evaluated as: (a | length) + 1 - CORRECT #}
```

---

## Error Handling

### Undefined Variables
By default, undefined variables cause errors. Use tests to check:

```jinja2
{% if var is defined %}
    {{ var }}
{% else %}
    Variable not found
{% endif %}
```

### Default Values
```jinja2
{{ optional_var | default(value="fallback") }}
```

### Try/Catch Equivalent
```jinja2
{% if my_value is defined and my_value is not empty %}
    {{ my_value }}
{% endif %}
```

---

## Performance Tips

1. **Compile once**: Use `lazy_static` for production
2. **Use glob patterns**: Load all templates at startup
3. **Enable reloading cautiously**: Only in dev
4. **Avoid complex logic**: Keep templates simple
5. **Pre-filter data**: Process arrays before passing to template
6. **Use inheritance**: For DRY template organization

---

## Reference URLs

- **Main Site**: https://keats.github.io/tera/
- **Documentation**: https://keats.github.io/tera/docs/
- **API Docs**: https://docs.rs/tera
- **GitHub**: https://github.com/Keats/tera
- **Regex Patterns**: https://docs.rs/regex/

