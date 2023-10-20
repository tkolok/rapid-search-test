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
    private _contents: Map<number, string> = new Map();
    private _store: Map<string, number> = new Map();

    get(filename: string): string {
        const hashCode = this._store.get(filename);

        if (hashCode) {
            return this._contents.get(hashCode)!;
        } else {
            throw Error(`"${filename}" is not a valid file name.`);
        }
    }

    store(filename: string, content: string) {
        const hashCode = hash(content);

        if (!this._contents.has(hashCode)) {
            this._contents.set(hashCode, content);
        }

        this._store.set(filename, hashCode);
    }
}

// https://stackoverflow.com/a/7616484
function hash(str: string): number {
    let hashCode = 0;

    for (let index = 0; index < str.length; index++) {
        hashCode = ((hashCode << 5) - hashCode) + str.charCodeAt(index);
        hashCode |= 0;
    }

    return hashCode;
}
