#!/bin/bash

echo "If you want to use Serena and your project is not empty, and you have some code, you can use Serena to index your project and use it as a knowledge base"
echo ""
echo "Execute Serena with the following command:"
echo ""
echo "docker run --rm -i --network host -v $PWD:/workspaces/projects ghcr.io/oraios/serena:latest serena project index"