import { Action, ActionPanel, closeMainWindow, Icon } from "@raycast/api";
import { openHistoryTab } from "../actions";
import { HistoryEntry } from "../interfaces";

export class FirefoxActions {
  public static HistoryItem = HistoryItemAction;
}

function HistoryItemAction({ entry: { title, url } }: { entry: HistoryEntry }) {
  return (
    <ActionPanel title={title}>
      <MozillaFirefoxHistoryTab url={url} />
      <Action.OpenInBrowser title="Open in Default Browser" url={url} shortcut={{ modifiers: ["opt"], key: "enter" }} />
      <Action.CopyToClipboard title="Copy URL" content={url} shortcut={{ modifiers: ["cmd", "shift"], key: "c" }} />
    </ActionPanel>
  );
}

function MozillaFirefoxHistoryTab({ url }: { url: string }) {
  async function handleAction() {
    openHistoryTab(url);
    await closeMainWindow();
  }
  return <ActionPanel.Item title="Open in Firefox" icon={{ source: Icon.Eye }} onAction={handleAction} />;
}
