import { closeMainWindow, popToRoot } from "@raycast/api";
// import { runAppleScript } from "run-applescript";
import { execSync } from "child_process";
// import { Tab } from "../interfaces";
import { OPEN_COMMAND, NOT_INSTALLED_MESSAGE } from "../constants";

export function openHistoryTab(url: string) {
  popToRoot();
  closeMainWindow({ clearRootSearch: true });

  const script = `${OPEN_COMMAND} "${url}"`;
  // await checkAppInstalled();

  return execSync(script);
}

// const checkAppInstalled = async () => {
//   const appInstalled = await runAppleScript(`
// set isInstalled to false
// try
//     do shell script "osascript -e 'exists application \\"Firefox\\"'"
//     set isInstalled to true
// end try

// return isInstalled`);
//   if (appInstalled === "false") {
//     throw new Error(NOT_INSTALLED_MESSAGE);
//   }
// };
