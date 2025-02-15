export function removeObjectKeys<T>(object: T, keysToRemove: string[]): Partial<T> {
    const newObj = {...object};
    keysToRemove.forEach(key => {
        delete newObj[key];
    });
    return newObj as Partial<T>;
}
