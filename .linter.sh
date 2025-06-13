#!/bin/bash
cd /home/kavia/workspace/code-generation/simplecalc-48966-342e0b0a/calculatorui
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

