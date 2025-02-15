export function removeObjectKeys(object: Record<string, unknown>, keysToRemove: string[]): Record<string, unknown> {
    const newObj = {...object}; // Create a shallow copy to avoid mutating the original object
    keysToRemove.forEach(key => {
        delete newObj[key];
    });
    return newObj;
}


