import fs from 'fs'

console.log(process.env.FILENAME, "GARY ASCUY")

fs.writeFileSync(process.env.FILENAME as any, 'gary', { encoding: 'utf-8' })