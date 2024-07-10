import { useBookmarkSearchSql } from "./useBookmarkSearchSql";
import { useBookmarkSearch } from "./useBookmarkSearch";

import { USE_DB } from "../constants";

export const searchBookmarks = (query: string | undefined) => {
	if (USE_DB === "sql") return useBookmarkSearchSql(query);
	return useBookmarkSearch(query);
};
