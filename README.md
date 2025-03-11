# Obsidian Sample Plugin

Resolves zettelkasten- or timestamp-style links to a matching note, if there is one. This can allow for greater interoperability between Obsidian and other Zettelkasten tools, such as The Archive. Be aware that this essentially makes ALL links look for partial matches, before falling back to Obsidian's default behavior of creating a new empty note when the link is unresolved. You may or may not want this behavior. This plugin seems pretty innocuous, but I put it together primarily for my own use, so use at your own risk.

## Examples:

- `[[202503102346]] zettelkasten note` WILL RESOLVE TO `202503102346 zettelkasten note.md`
- `[[202503102346 zettelkasten note]]` WILL ALSO RESOLVE TO `202503102346 zettelkasten note.md`
- `[[obsidian-style link]]` WILL (STILL) RESOLVE TO `obsidian-style link.md`
- `[[partial-match]] link` WILL RESOLVE TO `partial-matching might be unexpected.md`
- `[[202503102352]] an unmatched link` WILL CREATE `202503102352.md`

