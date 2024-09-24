import { closeMainWindow, popToRoot } from "@raycast/api";
// import { runAppleScript } from "run-applescript";
import { execSync } from "child_process";
// import { Tab } from "../interfaces";
import { APP_NAME, NOT_INSTALLED_MESSAGE } from "../constants";

export function openInFirefox(url: string, newWindow: boolean = false) {
  popToRoot();
  closeMainWindow({ clearRootSearch: true });

  const param = newWindow ? "-na" : "-a";
  const args = newWindow ? "--args --new-window" : "";

  const script = `open ${param} "${APP_NAME}" ${args} "${url}"`;
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
