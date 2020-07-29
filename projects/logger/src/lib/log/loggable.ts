import { LogLevel } from './log-level';
import { EmptyFunction } from '../core/empty-function';

import { MonoTypeOperatorFunction } from 'rxjs';

export abstract class AbstractLogger {
    protected _info = EmptyFunction;
    protected _debug = EmptyFunction;
    protected _warn = EmptyFunction;
    protected _error = EmptyFunction;
    protected _assert = EmptyFunction;
    protected _group = EmptyFunction;
    protected _groupEnd = EmptyFunction;
    get Info(): typeof EmptyFunction{
        return this._info
    }
    get Debug(): typeof EmptyFunction{
        return this._debug
    }
    get Error(): typeof EmptyFunction{
        return this._error
    }
    get Warn(): typeof EmptyFunction{
        return this._warn
    }
    get Assert(): typeof EmptyFunction{
        return this._assert
    }
    get Group(): typeof EmptyFunction{
        return this._group
    }
    get GroupEnd(): typeof EmptyFunction{
        return this._groupEnd
    }

    constructor({
        Info = console.info,
        Debug = console.log,
        Warn = console.warn,
        Error = console.error,
        Assert = console.assert,
        Group = console.group,
        GroupEnd = console.groupEnd
    } = {}, skip = false){
        if(skip){
            return;
        }
        this._info = Info;
        this._debug = Debug;
        this._warn = Warn;
        this._error = Error;
        this._assert = Assert;
        this._group = Group;
        this._groupEnd = GroupEnd;
    }

    abstract Tap(message: string, thisArg?: any): MonoTypeOperatorFunction<any>;
    abstract setClassLevel(level: LogLevel, name: string): void;
    abstract setLevel(level: LogLevel, type: 'property' | 'method', name: string): void;
    abstract fromLevel(level: LogLevel): AbstractLogger | void;
}

export interface Loggable {
    log: AbstractLogger;
}
