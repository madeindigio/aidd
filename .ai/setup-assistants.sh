#!/bin/bash

# create a symbolic link from `main-prompt.sh` to github custom-instructions.md`
mkdir -p $(pwd)/.github
rm -f $(pwd)/.github/custom-instructions.md
ln -s $(pwd)/.ai/custom-instructions.md $(pwd)/.github/custom-instructions.md
# create the same for kilo assistant
mkdir -p $(pwd)/.kilocode/rules
rm -f $(pwd)/.kilocode/rules/custom-instructions.md
ln -s $(pwd)/.ai/custom-instructions.md $(pwd)/.kilocode/rules/custom-instructions.md