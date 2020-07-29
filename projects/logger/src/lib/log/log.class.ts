/* eslint-disable no-fallthrough */
import { tap } from 'rxjs/operators';
import { LogLevel, LogLevelHierarchy } from './log-level';
import { EmptyFunction } from '../core/empty-function';
import { Collection } from '../core/collection.class';
import { AbstractLogger } from './loggable';
//@dynamic
// eslint-disable-next-line @typescript-eslint/class-name-casing
export class PGLLog extends AbstractLogger {
    protected static Cache = new Map<LogLevel, typeof log>();
    static hide = false;
    static level = LogLevel.Info;

    get show(): boolean {
        return !PGLLog.hide;
    }
    get Info(): typeof EmptyFunction {
        return this.show ? this._info : EmptyFunction;
    }
    get Debug(): typeof EmptyFunction {
        return this.show ? this._debug : EmptyFunction;
    }
    get Warn(): typeof EmptyFunction {
        return this.show ? this._warn : EmptyFunction;
    }
    get Error(): typeof EmptyFunction {
        return this.show ? this._error : EmptyFunction;
    }
    get Assert(): typeof EmptyFunction {
        return this.show ? this._assert : EmptyFunction;
    }
    get Group(): typeof EmptyFunction {
        return this.show ? this._group : EmptyFunction;
    }
    get GroupEnd(): typeof EmptyFunction {
        return this.show ? this._groupEnd : EmptyFunction;
    }

    Tap(message: string, thisArg?: any) {
        return tap({
            next: (val) =>
                log.Debug(`NEXT: ${message}`, val, thisArg ? thisArg : ''),
            error: (err) =>
                log.Error(`ERROR: ${message}`, err, thisArg ? thisArg : ''),
            complete: () =>
                log.Debug(`COMPLETE: ${message}`, thisArg ? thisArg : ''),
        });
    }

    InTemplate(val: any): any {
        let cache: Collection | null = new Collection();
        const striped = JSON.parse(JSON.stringify(val, log.replacerFn(cache)));
        cache = null;
        return striped;
    }
    jsonSafeObj<T extends Object>(obj: T, depth = 0) {
        let visited = new Collection();
        return log._getValues(obj, visited, depth);
    }
    setVisibility(visible: boolean) {
        PGLLog.hide = !visible;
    }

    protected _getValues<T, K extends keyof T>(
        source: T,
        visited: Collection,
        depth: number
    ): T | null {
        if (source != null && typeof source == 'object') {
            if (depth < 0 || visited.indexOf(source) > -1) return null;

            visited.push(source);
            if (Array.isArray(source)) {
                return (source.map((item: T[K]) =>
                    this._getValues(item, visited, depth - 1)
                ) as unknown) as T;
            }

            return (Object.keys(source) as K[]).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: this._getValues(source[key], visited, depth - 1),
                }),
                {} as T
            );
        }

        return source;
    }

    replacerFn(cache: Collection) {
        return <T>(_: any, value: T) => {
            if (typeof value === 'object') {
                if (cache.indexOf(value) === -1) {
                    cache.push(value);
                    return value;
                }
                return null;
            }
            return value;
        };
    }

    fromLevel(level: LogLevel): AbstractLogger {
        if (PGLLog.Cache.has(level)) {
            return PGLLog.Cache.get(level) as typeof log;
        }

        const rt = new PGLLog(
            LogLevelHierarchy.reduce(
                (acc, key: keyof typeof LogLevel, index) =>
                    index < level ?  { ...acc, [key]: EmptyFunction }: acc,
                {}
            )
        );
        console.log("new logger: ", rt);

        PGLLog.Cache.set(level, rt);
        return rt;
    }
    setClassLevel(level: LogLevel, name: string): void {
        throw new Error('Method not implemented.');
    }
    setLevel(level: LogLevel, type: 'property' | 'method', name: string): void {
        throw new Error('Method not implemented.');
    }
}

export const log = new PGLLog();
// export class Logger extends log {}
