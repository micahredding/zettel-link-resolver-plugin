import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';

export default class FuzzyLinkPlugin extends Plugin {
  async onload() {
    console.log("FuzzyLinkPlugin loaded.");

    // Store the original method
    const originalGetFirstLinkpathDest = this.app.metadataCache.getFirstLinkpathDest;

    // Override the method with our custom logic, binding the original context
    this.app.metadataCache.getFirstLinkpathDest = (linktext: string, sourcePath: string): TFile | null => {
      // 1. Try the default resolution
      let file = originalGetFirstLinkpathDest.call(this.app.metadataCache, linktext, sourcePath);
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

    // Store the modified method for cleanup
    this.register(() => {
      this.app.metadataCache.getFirstLinkpathDest = originalGetFirstLinkpathDest;
    });
  }

  onunload() {
    console.log("FuzzyLinkPlugin unloaded.");
  }
}