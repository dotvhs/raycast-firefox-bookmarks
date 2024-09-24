import { ReactElement } from "react";
import { existsSync } from "fs";
import { useSQL } from "@raycast/utils";
import { SearchResult, HistoryEntry } from "../interfaces";
import { getDbPath } from "../util";
import { NotInstalledError } from "../components";
import { SORT_RESULTS } from "../constants";

const whereClauses = (terms: string[]) => {
  return terms.map((t) => `mb.title LIKE '%${t}%'`).join(" AND ");
};

const sortOrder = {
  ascending: "ASC",
  descending: "DESC",
};

const orderBy = {
  "last-visited": "lastVisited",
  "date-added": "mb.dateAdded",
};

const getBookmarksQuery = (query?: string) => {
  const terms = query ? query.trim().split(" ") : [];
  const whereBase = "mb.type = '1' AND mb.title IS NOT NULL AND mp.url NOT LIKE 'javascript:%'";
  const whereClause = terms.length > 0 ? `(${whereBase} AND (${whereClauses(terms)}))` : whereBase;
  return `
    SELECT
      mp.id AS id,
      mb.title AS title,
      mp.url AS url,
      mp.url_hash AS url_hash,
      datetime(mp.last_visit_date/1000000, 'unixepoch') AS lastVisited
    FROM 
      moz_bookmarks AS mb
    JOIN
      moz_places AS mp
    ON
      mb.fk = mp.id
    WHERE
      ${whereClause}
    ORDER BY 
      ${orderBy["last-visited"]} ${sortOrder[SORT_RESULTS]} LIMIT 1000;
`;
};

export function useBookmarkSearchSql(query: string | undefined): SearchResult<HistoryEntry> {
  const inQuery = getBookmarksQuery(query);
  const dbPath = getDbPath();

  if (!existsSync(dbPath)) {
    return { data: [], isLoading: false, errorView: <NotInstalledError /> };
  }
  const { isLoading, data, permissionView } = useSQL<HistoryEntry>(dbPath, inQuery);
  return { data, isLoading, errorView: permissionView as ReactElement };
}
