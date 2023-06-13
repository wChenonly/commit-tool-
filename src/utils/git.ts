import { execa, execaSync } from 'execa'
import ora from 'ora'
import chalk from 'chalk'
import { Log } from './utils'

export async function add() {
  const spinner = ora('git add 进行中').start()
  await execa('git', ['add', 'package.json'])
  spinner.succeed(`${chalk.green('git add 到暂存区成功 🤥🤥🤥')}`)
}
export async function commit(message: string) {
  const spinner = ora('git commit 进行中').start()
  await execa('git', ['commit', '-m', message])
  spinner.succeed(`${chalk.green('git commit 到本地成功 🍺🍺🍺')}`)
}

export async function push(currentBranch: string) {
  const spinner = ora('git push 进行中').start()
  try {
    await execa('git', ['push', 'origin', `${currentBranch}`])
    spinner.succeed(`${chalk.green('git push 到仓库成功 💯💯💯')}`)
    return true
  }
  catch (error) {
    spinner.fail(`${chalk.green('代码推送失败,请手动git push 🫵')}`)
    return false
  }
}

export function gitBranchName() {
  const currentBranch = execaSync('git', ['branch', '--show-current']).stdout
  if (!currentBranch) {
    Log.error('获取当前分支失败, 请检查git是否安装 🫵🫵🫵')
    process.exit(1)
  }
  return currentBranch
}
