import { List } from "@raycast/api";
import { useState, ReactElement } from "react";
import { FirefoxListEntries } from "./components";
import { searchBookmarks } from "./hooks";

export default function Command(): ReactElement {
  const [searchText, setSearchText] = useState<string>();
  const { isLoading, errorView, data } = searchBookmarks(searchText);
  console.log(data);

  if (errorView) {
    return errorView;
  }

  return (
    <List onSearchTextChange={setSearchText} isLoading={isLoading} throttle={false}>
      {data?.map((e) => (
        <FirefoxListEntries.HistoryEntry entry={e} key={e.id} />
      ))}
    </List>
  );
}
