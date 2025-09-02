#!/bin/bash

# check if exists uvx in path then use it, check if exists pkgx then use `pkgx uvx`

if command -v uvx &> /dev/null
then
    uvx --from git+https://github.com/oraios/serena serena project generate-yml
    uvx --from git+https://github.com/oraios/serena serena project index
elif command -v pkgx &> /dev/null
then
    pkgx uvx --from git+https://github.com/oraios/serena serena project generate-yml
    pkgx uvx --from git+https://github.com/oraios/serena serena project index
else
    echo "Error: Neither 'uvx' or 'pkgx' command found in PATH." >&2
    echo "Please install [pkgx](https://github.com/pkgxdev/pkgx/releases/latest) preferably"
    exit 1
fi