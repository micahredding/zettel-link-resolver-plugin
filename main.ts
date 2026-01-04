import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';

class LinkChooserModal extends Modal {
    private resolve: (value: TFile | null) => void;
    private matches: TFile[];
    private linktext: string;

    constructor(app: App, linktext: string, matches: TFile[], resolve: (value: TFile | null) => void) {
        super(app);
        this.matches = matches;
        this.resolve = resolve;
        this.linktext = linktext;
    }

    onOpen() {
        const {contentEl} = this;
        contentEl.empty();
        
        contentEl.createEl('h2', {text: 'Multiple matches found'});
        contentEl.createEl('p', {text: `Choose the correct note for "${this.linktext}":`});

        const list = contentEl.createEl('div', {
            cls: 'link-chooser-list'
        });

        this.matches.forEach((file) => {
            const item = list.createEl('div', {
                cls: 'link-chooser-item',
                text: file.basename
            });
            
            item.onClickEvent(() => {
                this.resolve(file);
                this.close();
            });
        });

        const cancelButton = contentEl.createEl('button', {
            text: 'Cancel',
            cls: 'link-chooser-cancel'
        });
        
        cancelButton.onClickEvent(() => {
            this.resolve(null);
            this.close();
        });
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }
}

export default class ZettelLinkResolverPlugin extends Plugin {
    private chooserOpen = false;
    private lastChosenFile: TFile | null = null;

    async onload() {
        console.log("ZettelLinkResolverPlugin loaded.");

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

            // 3. If multiple matches and not already choosing, show modal
            if (matches.length > 1 && !this.chooserOpen) {
                this.chooserOpen = true;
                new Promise<TFile | null>((resolve) => {
                    new LinkChooserModal(this.app, linktext, matches, (file) => {
                        this.lastChosenFile = file;
                        this.chooserOpen = false;
                        resolve(file);
                    }).open();
                });
                return this.lastChosenFile;
            } else if (matches.length === 1) {
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
        console.log("ZettelLinkResolverPlugin unloaded.");
    }
}