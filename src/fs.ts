const instances: Map<string, FSClass> = new Map();

export function FS(root: string): FSClass {
    if (!instances.has(root)) {
        const fs = new FSClass();

        instances.set(root, fs);
        return fs;
    } else {
        return instances.get(root)!;
    }
}

class FSClass {
    private _contents: Map<string, FileContent> = new Map();
    private _store: Map<string, FileContent> = new Map();

    get(filename: string): string {
        const content = this._store.get(filename);

        if (content) {
            return content.content;
        } else {
            throw Error(`${filename} is not a valid file name.`);
        }
    }

    store(filename: string, content: string) {
        let fc = this._contents.get(content);

        if (!fc) {
            fc = new FileContent(content);
            this._contents.set(content, fc);
        }

        this._store.set(filename, fc!);
    }
}

class FileContent {
    constructor(public content: string) {}
}
