#!/bin/bash
cd /home/kavia/workspace/code-generation/noteease-100395-100400/main_container_for_noteease
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

