import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';

export default class FuzzyLinkPlugin extends Plugin {
  private originalGetFirstLinkpathDest:
    | ((linktext: string, sourcePath: string) => TFile | null)
    | undefined;

  async onload() {
    console.log("FuzzyLinkPlugin loaded.");

    // Save a reference to Obsidian’s original getFirstLinkpathDest method
    this.originalGetFirstLinkpathDest =
      this.app.metadataCache.getFirstLinkpathDest;

    // Override the method with our custom logic
    this.app.metadataCache.getFirstLinkpathDest = (
      linktext: string,
      sourcePath: string
    ): TFile | null => {
      // 1. Try the default resolution
      let file = this.originalGetFirstLinkpathDest?.(linktext, sourcePath);
      if (file) {
        return file;
      }

      // 2. If no direct match, do a naive partial match
      const allFiles = this.app.vault.getMarkdownFiles();
      const linktextLower = linktext.toLowerCase();

      // Filter files whose filename includes the link text
      const matches = allFiles.filter((f) =>
        f.basename.toLowerCase().includes(linktextLower)
      );

      // 3. If multiple matches, pick the first. Otherwise null.
      if (matches.length > 0) {
        return matches[0];
      }
      return null;
    };
  }

  onunload() {
    console.log("FuzzyLinkPlugin unloaded.");

    // Restore the original method when unloading
    if (this.originalGetFirstLinkpathDest) {
      this.app.metadataCache.getFirstLinkpathDest =
        this.originalGetFirstLinkpathDest;
    }
  }
}