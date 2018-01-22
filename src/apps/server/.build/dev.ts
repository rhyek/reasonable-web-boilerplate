// tslint:disable:no-implicit-dependencies
// tslint:disable:no-console
import { ChildProcess } from 'child_process'
import * as chokidar from 'chokidar'
import * as spawn from 'cross-spawn'
import * as fs from 'fs'
import * as glob from 'glob'
import * as lodash from 'lodash'
import * as path from 'path'
import * as slash from 'slash'
import * as kill from 'tree-kill'
import { Configuration, Linter } from 'tslint'

let process: ChildProcess = null

function resolvePath(filePath: string) {
  return path.join(__dirname, filePath)
}

const run = lodash.debounce((firstTime = false) => {
  if (!firstTime) {
    console.log('Detected change. Restarting server.')
  }
  if (process) {
    kill(process.pid)
  }
  process = spawn('ts-node', ['--inspect=3001', resolvePath('../main.ts')], {
    stdio: 'inherit'
  })
}, 500)

const lintQueue: string[] = []
const executeLint = lodash.debounce(() => {
  const tsProgram = Linter.createProgram(
    resolvePath('../tsconfig.json'),
    resolvePath('..')
  )
  const linter = new Linter({ fix: false }, tsProgram)
  for (const filePath of lintQueue) {
    const config = Configuration.findConfiguration(
      resolvePath('../../../../tslint.json'),
      filePath
    ).results
    const fileContent = tsProgram.getSourceFile(filePath).getFullText()
    linter.lint(filePath, fileContent, config)
  }
  if (linter.getResult().failures.length) {
    console.log(linter.getResult().output)
  }
  for (const filePath of lintQueue.slice()) {
    if (
      linter
        .getResult()
        .failures.every(failure => failure.getFileName() !== slash(filePath))
    ) {
      lintQueue.splice(lintQueue.indexOf(filePath), 1)
    }
  }
}, 500)

function lint(filePath: string) {
  if (lintQueue.indexOf(filePath) < 0) {
    lintQueue.push(filePath)
  }
  executeLint()
}

const paths = [resolvePath('..'), resolvePath('../../../shared')]

chokidar
  .watch(paths, {
    ignored: __dirname,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500
    }
  })
  .on('ready', async () => {
    for (const dirPath of paths) {
      for (const fileName of glob.sync(path.join(dirPath, '**/*.ts'))) {
        lint(fileName)
      }
    }
    run(true)
  })
  .on('all', (event, fileName) => {
    if (['change'].indexOf(event) > -1) {
      lint(fileName)
      run()
    }
  })
