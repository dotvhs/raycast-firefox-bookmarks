import { closeMainWindow, getPreferenceValues, popToRoot } from "@raycast/api";
import { runAppleScript } from "run-applescript";
import { execSync } from "child_process";
import { Preferences, Tab } from "../interfaces";
import { OPEN_COMMAND, NOT_INSTALLED_MESSAGE, SEARCH_ENGINE } from "../constants";

export async function openNewTab(queryText: string | null | undefined) {
  popToRoot();
  closeMainWindow({ clearRootSearch: true });

  const script = `${OPEN_COMMAND} ${queryText ? queryText : ""}`;
  await checkAppInstalled();

  return execSync(script);
}

export function openHistoryTab(url: string) {
  popToRoot();
  closeMainWindow({ clearRootSearch: true });

  const script = `${OPEN_COMMAND} ${url}`;
  // await checkAppInstalled();

  return execSync(script);
}

export async function setActiveTab(tab: Tab): Promise<void> {
  await runAppleScript(`
    tell application "Firefox"
      activate
      repeat with w from 1 to count of windows
        set startTab to name of window 1
        repeat
            if name of window 1 contains "${tab.title}" then 
              exit repeat
            else
              tell application "System Events" to key code 48 using control down
            end if
            if name of window 1 is startTab then exit repeat
        end repeat
      end repeat
    end tell
  `);
}

const checkAppInstalled = async () => {
  const appInstalled = await runAppleScript(`
set isInstalled to false
try
    do shell script "osascript -e 'exists application \\"Firefox\\"'"
    set isInstalled to true
end try

return isInstalled`);
  if (appInstalled === "false") {
    throw new Error(NOT_INSTALLED_MESSAGE);
  }
};
