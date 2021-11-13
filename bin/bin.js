#!/usr/bin/env node
const { mainCli } = require('../dist/cli/cli')

try {
  (async () => mainCli())()
} catch (error) {
  console.trace(error)
  process.exit(1)
}
