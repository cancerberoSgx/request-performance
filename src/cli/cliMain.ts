// just for testing 

import { mainCli } from "./cli"

try {
  (async () => mainCli())()
} catch (error) {
  console.trace(error)
  process.exit(1)
}
