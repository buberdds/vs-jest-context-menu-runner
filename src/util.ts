export function isWindows(): boolean {
    return process.platform.includes('win32');
}

export function normalizePath(path: string): string {
    return isWindows() ? path.replace(/\\/g, '/') : path;
}

export function escapeRegExpForPath(s: string): string {
    return s.replace(/[*+?^${}<>()|[\]]/g, '\\$&'); // $& means the whole matched string
}

export function findFullTestName(selectedLine: number, children: any[]): string | undefined {
    if (!children) {
        return;
    }
    for (const element of children) {
        if (element.type === 'describe' && selectedLine === element.start.line) {
            return resolveTestNameStringInterpolation(element.name);
        }
        if (element.type !== 'describe' && selectedLine >= element.start.line && selectedLine <= element.end.line) {
            return resolveTestNameStringInterpolation(element.name);
        }
    }
    for (const element of children) {
        const result = findFullTestName(selectedLine, element.children);
        if (result) {
            return resolveTestNameStringInterpolation(element.name) + ' ' + result;
        }
    }
}

export function resolveTestNameStringInterpolation(s: string): string {
    const variableRegex = /(\${?[A-Za-z0-9_]+}?|%[psdifjo#%])/gi;
    const matchAny = '(.*?)';
    return s.replace(variableRegex, matchAny);
}

export function escapeSingleQuotes(s: string): string {
    return isWindows() ? s : s.replace(/'/g, "'\\''");
}

export const quote = (s: string) => `"${s}"`;
