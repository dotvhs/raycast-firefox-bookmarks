import { ReactElement } from "react";
import { existsSync } from "fs";
import { useSQL } from "@raycast/utils";
import { SearchResult, HistoryEntry } from "../interfaces";
import { getDbPath } from "../util";
import { NotInstalledError } from "../components";

const dbBookmarks = "moz_bookmarks";

const whereClauses = (terms: string[]) => {
  return terms.map((t) => `title LIKE '%${t}%'`).join(" AND ");
};

const getHistoryQuery = (query?: string) => {
  const terms = query ? query.trim().split(" ") : [];
  const whereBase = "type = '1' AND title IS NOT NULL";
  const whereClause = terms.length > 0 ? `WHERE (${whereBase} AND (${whereClauses(terms)}))` : `WHERE ${whereBase}`;
  return `SELECT
            id, fk, title,
            datetime(dateAdded/1000000,'unixepoch') as lastVisited
          FROM ${dbBookmarks}
          ${whereClause}
          ORDER BY dateAdded DESC LIMIT 1000;`;
};

export function useBookmarkSearchSql(query: string | undefined): SearchResult<HistoryEntry> {
  const inQuery = getHistoryQuery(query);
  const dbPath = getDbPath();

  if (!existsSync(dbPath)) {
    return { data: [], isLoading: false, errorView: <NotInstalledError /> };
  }
  const { isLoading, data, permissionView } = useSQL<HistoryEntry>(dbPath, inQuery);
  return { data, isLoading, errorView: permissionView as ReactElement };
}
