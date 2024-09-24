# Search Bookmarks in Firefox

Search and open Firefox bookmarks directly from Raycast.

TODO:

- [x] Move from Apple Script to shell command
- [x] Do not show bookmarklets **(WIP)**
- [x] Get favicons from Firefox directly **(WIP)**
- [x] Remove unnecessary code of removed features
- [x] Read Bookmarks from SQLite as an option **(WIP)**
- [ ] Add sorting options of results
- [ ] Limit to bookmarks of specific folder
- [ ] Design a new icon
- [ ] Publish the extension

## How does it compare to similar extensions?

### Mozilla Firefox by @crisboarna and @serhii_kravchenko

This extension is a stripped down fork of it.

- This extension does bookmarks only while original supports searching through browser's history, opened tabs etc.
- This extension is way faster in opening links because it uses shell command to open them instead of Apple Script to type the address in.
- This extension filteres out bookmarklets which wouldn't really work anyway
- Gets favicons from Firefox first and then reverts to Googled ones which is faster and works better with self-hosted services
- Optionally gets bookmarks from Firefox's SQLite file instead of JSON which gets updates immediately as opposedd to the JSON file which is rarely updated

### Mozeidon by @egovelox

- This extension does bookmarks only while Mozeidon supports searching through browser's history, opened tabs etc.
- This extension is equally fast as Mozeidon, both are using shell to open links
- This extension filteres out bookmarklets which wouldn't really work anyway
