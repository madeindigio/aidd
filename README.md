# Public reference of DIGIO AI Driven Development flow and best practices

This public book contains the best practices and guidelines for using DIGIO AI Driven Development flow. It is designed to help developers and teams effectively utilize AI tools in their development processes.

## Tasks

### build

Build the mdbook from the source files.

interactive: true

```bash
cd mdbook/index
mdbook build
cd ../../mdbook/en
mdbook build
cd ../../mdbook/es
mdbook build
```

### set-main

Move git to main from jj change. Push the changes to the main branch.

interactive: true

```bash
jj b s main --revision=@
# check if push with git, prompt to the user
if jj git push; then
  echo "Push successful"
else
  echo "Push failed"
fi
```

### jj:desc

Add description to the current change

Inputs: TEXT

```bash
jj desc -m "$TEXT"
```