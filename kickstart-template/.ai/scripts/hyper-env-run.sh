#!/bin/bash

export SERPER_API_KEY="$(kvage get serper_key)"
export PERPLEXITY_API_KEY="$(kvage get perplexity_apikey)"
export GOOGLE_API_KEY="$(kvage get google_search_apikey)"
export GOOGLE_SEARCH_ENGINE_ID="$(kvage get google_custom_search_id)"
export BRAVE_API_KEY="$(kvage get brave_apikey)"

hyper-mcp --config-file .ai/mcp/hyper-mcp.yaml