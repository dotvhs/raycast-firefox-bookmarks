import { Action, ActionPanel, closeMainWindow, Icon } from "@raycast/api";
import { openInFirefox } from "../actions";
import { HistoryEntry } from "../interfaces";

export class FirefoxActions {
  public static HistoryItem = HistoryItemAction;
}

function HistoryItemAction({ entry: { title, url } }: { entry: HistoryEntry }) {
  return (
    <ActionPanel title={title}>
      <OpenInFirefox url={url} />
      <OpenInFirefoxNewWindow url={url} />
      <Action.OpenInBrowser title="Open in Default Browser" url={url} shortcut={{ modifiers: ["opt"], key: "enter" }} />
      <Action.CopyToClipboard title="Copy URL" content={url} shortcut={{ modifiers: ["cmd", "shift"], key: "c" }} />
    </ActionPanel>
  );
}

function OpenInFirefox({ url }: { url: string }) {
  async function handleAction() {
    openInFirefox(url);
    await closeMainWindow();
  }
  return <Action title="Open in Firefox" icon={{ source: Icon.Link }} onAction={handleAction} />;
}

function OpenInFirefoxNewWindow({ url }: { url: string }) {
  async function handleAction() {
    openInFirefox(url, true);
    await closeMainWindow();
  }
  return <Action title="Open in New Window" icon={{ source: Icon.Window }} onAction={handleAction} />;
}
