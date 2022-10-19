export function isWindows(): boolean {
    return process.platform.includes('win32');
}

export function normalizePath(path: string): string {
    return isWindows() ? path.replace(/\\/g, '/') : path;
}

export function escapeRegExpForPath(s: string): string {
    return s.replace(/[*+?^${}<>()|[\]]/g, '\\$&'); // $& means the whole matched string
}

export const quote = (s: string) => `"${s}"`;
