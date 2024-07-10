import { Icon, List } from "@raycast/api";
import { FirefoxActions } from "./index";
import { HistoryEntry, Tab } from "../interfaces";
import { getFavicon } from "@raycast/utils";

export class FirefoxListEntries {
  public static HistoryEntry = HistoryListEntry;
}


function HistoryListEntry({ entry: { url, title, id, lastVisited } }: { entry: HistoryEntry }) {
  return (
    <List.Item
      id={id.toString()}
      title={title || ""}
      subtitle={url}
      icon={getFavicon(url)}
      actions={<FirefoxActions.HistoryItem entry={{ url, title, id, lastVisited }} />}
    />
  );
}
