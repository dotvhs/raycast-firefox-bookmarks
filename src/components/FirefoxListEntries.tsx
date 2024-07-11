import { Icon, Image, List } from "@raycast/api";
import { FirefoxActions } from "./index";
import { HistoryEntry, Tab } from "../interfaces";
import { getFavicon } from "@raycast/utils";

export class FirefoxListEntries {
  public static HistoryEntry = HistoryListEntry;
}

function HistoryListEntry({ entry: { url, title, id, lastVisited, favIcon } }: { entry: HistoryEntry }) {
  return (
    <List.Item
      id={id.toString()}
      title={title || ""}
      subtitle={url}
      icon={favIcon ? { source: favIcon, mask: Image.Mask.RoundedRectangle, fallback: Icon.Link } : getFavicon(url)}
      actions={<FirefoxActions.HistoryItem entry={{ url, title, id, lastVisited }} />}
    />
  );
}
