#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-e-commerce-platform-7192-7202/frontend_client
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

