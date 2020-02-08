import path from 'path';
import { Utils } from '@technote-space/github-action-helper';
import { MainArguments } from '@technote-space/github-action-pr-helper/dist/types';
import { getInput } from '@actions/core' ;
import { ACTION_NAME, ACTION_OWNER, ACTION_REPO } from '../constant';

const {getArrayInput, getBoolValue} = Utils;

// ^npx npm-check-updates
// ^npm-check-updates
// ^ncu
const replaceNcuCommand = (command: string): string => command
	.replace(Utils.getPrefixRegExp('npx npm-check-updates '), 'yarn ncu ')
	.replace(Utils.getPrefixRegExp('npm-check-updates  '), 'yarn ncu ')
	.replace(Utils.getPrefixRegExp('ncu '), 'yarn ncu ');

export const replaceNcuCommands = (commands: Array<string>): Array<string> => commands.map(replaceNcuCommand);

export const getRunnerArguments = (): MainArguments => ({
	rootDir: path.resolve(__dirname, '../..'),
	actionName: ACTION_NAME,
	actionOwner: ACTION_OWNER,
	actionRepo: ACTION_REPO,
	installPackages: getArrayInput('INSTALL_PACKAGES'),
	devInstallPackages: getArrayInput('DEV_INSTALL_PACKAGES'),
	globalInstallPackages: getArrayInput('GLOBAL_INSTALL_PACKAGES').filter(item => 'npm-check-updates' !== item),
	executeCommands: replaceNcuCommands(getArrayInput('EXECUTE_COMMANDS', false, '&&', false)),
	commitMessage: getInput('COMMIT_MESSAGE'),
	commitName: getInput('COMMIT_NAME'),
	commitEmail: getInput('COMMIT_EMAIL'),
	prBranchPrefix: getInput('PR_BRANCH_PREFIX'),
	prBranchName: getInput('PR_BRANCH_NAME'),
	prTitle: getInput('PR_TITLE'),
	prBody: getInput('PR_BODY'),
	prBranchPrefixForDefaultBranch: getInput('PR_DEFAULT_BRANCH_PREFIX'),
	prBranchNameForDefaultBranch: getInput('PR_DEFAULT_BRANCH_NAME'),
	prTitleForDefaultBranch: getInput('PR_DEFAULT_BRANCH_TITLE'),
	prBodyForDefaultBranch: getInput('PR_DEFAULT_BRANCH_BODY'),
	prBodyForComment: getInput('PR_COMMENT_BODY'),
	prDateFormats: [getInput('PR_DATE_FORMAT1'), getInput('PR_DATE_FORMAT2')],
	prCloseMessage: getInput('PR_CLOSE_MESSAGE'),
	filterGitStatus: getInput('FILTER_GIT_STATUS'),
	filterExtensions: getArrayInput('FILTER_EXTENSIONS'),
	targetBranchPrefix: getArrayInput('TARGET_BRANCH_PREFIX'),
	deletePackage: getBoolValue(getInput('DELETE_PACKAGE')),
	includeLabels: getArrayInput('INCLUDE_LABELS'),
	checkDefaultBranch: getBoolValue(getInput('CHECK_DEFAULT_BRANCH')),
	checkOnlyDefaultBranch: getBoolValue(getInput('ONLY_DEFAULT_BRANCH')),
});
