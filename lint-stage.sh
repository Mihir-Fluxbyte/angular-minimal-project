#!/bin/bash

# Get the list of modified files using git ls-files --modified
# MODIFIED_FILES=$(git ls-files --modified) # changes files
MODIFIED_FILES=$(git diff --name-only --cached) # stages files

# Check if MODIFIED_FILES is empty
if [ -z "$MODIFIED_FILES" ]; then
  echo "No modified files found."
  exit 1
fi

# Build a pattern for ng lint
PATTERN=""

# Loop through the modified files and add them to the pattern
IFS=$'\n'
for FILE in $MODIFIED_FILES; do
  # Escape special characters in file paths
  ESCAPED_FILE=$(echo "$FILE" | sed 's/\//\\\//g')
  PATTERN="$PATTERN$ESCAPED_FILE,"
done

# Remove the trailing comma from the pattern
PATTERN=${PATTERN%,}

# Add curly braces if there's more than one modified file
if [ $(echo "$MODIFIED_FILES" | wc -l) -gt 1 ]; then
  # Add curly braces if there's more than one modified file
  PATTERN="{${PATTERN}}"
fi
echo Running ng lint --lint-file-patterns="$PATTERN"
# Run ng lint with the generated pattern
ng lint --lint-file-patterns="$PATTERN"
