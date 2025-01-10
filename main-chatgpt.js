import { __awaiter } from "tslib";
import { Plugin } from 'obsidian';
export default class FuzzyLinkPlugin extends Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("FuzzyLinkPlugin loaded.");
            // Save a reference to Obsidian’s original getFirstLinkpathDest method
            this.originalGetFirstLinkpathDest =
                this.app.metadataCache.getFirstLinkpathDest;
            // Override the method with our custom logic
            this.app.metadataCache.getFirstLinkpathDest = (linktext, sourcePath) => {
                var _a;
                // 1. Try the default resolution
                let file = (_a = this.originalGetFirstLinkpathDest) === null || _a === void 0 ? void 0 : _a.call(this, linktext, sourcePath);
                if (file) {
                    return file;
                }
                // 2. If no direct match, do a naive partial match
                const allFiles = this.app.vault.getMarkdownFiles();
                const linktextLower = linktext.toLowerCase();
                // Filter files whose filename includes the link text
                const matches = allFiles.filter((f) => f.basename.toLowerCase().includes(linktextLower));
                // 3. If multiple matches, pick the first. Otherwise null.
                if (matches.length > 0) {
                    return matches[0];
                }
                return null;
            };
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jaGF0Z3B0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1jaGF0Z3B0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQTRDLE1BQU0sRUFBb0MsTUFBTSxVQUFVLENBQUM7QUFFOUcsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLE1BQU07SUFLM0MsTUFBTTs7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFFdkMsc0VBQXNFO1lBQ3RFLElBQUksQ0FBQyw0QkFBNEI7Z0JBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO1lBRTlDLDRDQUE0QztZQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsR0FBRyxDQUM1QyxRQUFnQixFQUNoQixVQUFrQixFQUNKLEVBQUU7O2dCQUNoQixnQ0FBZ0M7Z0JBQ2hDLElBQUksSUFBSSxHQUFHLE1BQUEsSUFBSSxDQUFDLDRCQUE0QixxREFBRyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3JFLElBQUksSUFBSSxFQUFFO29CQUNSLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUVELGtEQUFrRDtnQkFDbEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUU3QyxxREFBcUQ7Z0JBQ3JELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNwQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDakQsQ0FBQztnQkFFRiwwREFBMEQ7Z0JBQzFELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuQjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQztRQUNKLENBQUM7S0FBQTtJQUVELFFBQVE7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFekMsNkNBQTZDO1FBQzdDLElBQUksSUFBSSxDQUFDLDRCQUE0QixFQUFFO1lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLG9CQUFvQjtnQkFDekMsSUFBSSxDQUFDLDRCQUE0QixDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwLCBFZGl0b3IsIE1hcmtkb3duVmlldywgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCBURmlsZSB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnV6enlMaW5rUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgcHJpdmF0ZSBvcmlnaW5hbEdldEZpcnN0TGlua3BhdGhEZXN0OlxuICAgIHwgKChsaW5rdGV4dDogc3RyaW5nLCBzb3VyY2VQYXRoOiBzdHJpbmcpID0+IFRGaWxlIHwgbnVsbClcbiAgICB8IHVuZGVmaW5lZDtcblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJGdXp6eUxpbmtQbHVnaW4gbG9hZGVkLlwiKTtcblxuICAgIC8vIFNhdmUgYSByZWZlcmVuY2UgdG8gT2JzaWRpYW7igJlzIG9yaWdpbmFsIGdldEZpcnN0TGlua3BhdGhEZXN0IG1ldGhvZFxuICAgIHRoaXMub3JpZ2luYWxHZXRGaXJzdExpbmtwYXRoRGVzdCA9XG4gICAgICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0O1xuXG4gICAgLy8gT3ZlcnJpZGUgdGhlIG1ldGhvZCB3aXRoIG91ciBjdXN0b20gbG9naWNcbiAgICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0ID0gKFxuICAgICAgbGlua3RleHQ6IHN0cmluZyxcbiAgICAgIHNvdXJjZVBhdGg6IHN0cmluZ1xuICAgICk6IFRGaWxlIHwgbnVsbCA9PiB7XG4gICAgICAvLyAxLiBUcnkgdGhlIGRlZmF1bHQgcmVzb2x1dGlvblxuICAgICAgbGV0IGZpbGUgPSB0aGlzLm9yaWdpbmFsR2V0Rmlyc3RMaW5rcGF0aERlc3Q/LihsaW5rdGV4dCwgc291cmNlUGF0aCk7XG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICByZXR1cm4gZmlsZTtcbiAgICAgIH1cblxuICAgICAgLy8gMi4gSWYgbm8gZGlyZWN0IG1hdGNoLCBkbyBhIG5haXZlIHBhcnRpYWwgbWF0Y2hcbiAgICAgIGNvbnN0IGFsbEZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xuICAgICAgY29uc3QgbGlua3RleHRMb3dlciA9IGxpbmt0ZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIC8vIEZpbHRlciBmaWxlcyB3aG9zZSBmaWxlbmFtZSBpbmNsdWRlcyB0aGUgbGluayB0ZXh0XG4gICAgICBjb25zdCBtYXRjaGVzID0gYWxsRmlsZXMuZmlsdGVyKChmKSA9PlxuICAgICAgICBmLmJhc2VuYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobGlua3RleHRMb3dlcilcbiAgICAgICk7XG5cbiAgICAgIC8vIDMuIElmIG11bHRpcGxlIG1hdGNoZXMsIHBpY2sgdGhlIGZpcnN0LiBPdGhlcndpc2UgbnVsbC5cbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXNbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgb251bmxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJGdXp6eUxpbmtQbHVnaW4gdW5sb2FkZWQuXCIpO1xuXG4gICAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgbWV0aG9kIHdoZW4gdW5sb2FkaW5nXG4gICAgaWYgKHRoaXMub3JpZ2luYWxHZXRGaXJzdExpbmtwYXRoRGVzdCkge1xuICAgICAgdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdCA9XG4gICAgICAgIHRoaXMub3JpZ2luYWxHZXRGaXJzdExpbmtwYXRoRGVzdDtcbiAgICB9XG4gIH1cbn0iXX0=