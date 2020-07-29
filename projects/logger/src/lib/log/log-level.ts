export enum LogLevel {
    Info,
    Debug,
    Warn,
    Error,
    Off
}

export const LogLevelHierarchy = Object.keys(LogLevel)
    .filter((key) => !isNaN(Number(key)))
    .map(key => Number(key))
    .reduce((acc, key: number) => {
        acc[key] = LogLevel[key];
        return acc;
    }, Array(Object.keys(LogLevel).length/2).fill(null));
