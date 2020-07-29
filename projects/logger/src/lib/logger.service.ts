import { Injectable, Inject, InjectionToken } from '@angular/core';
import { log, PGLLog } from './log/log.class';
import { LogLevel, LogLevelHierarchy } from "./log/log-level";
import { EmptyFunction } from './core/empty-function';
import { AbstractLogger } from './log/loggable';
import { LoggerConfig } from './core/logger-config.class';
import { tap } from 'rxjs/operators';

export const LOGGER_DEFAULTS = new InjectionToken<LoggerConfig>(
    'default-logger-config'
);

@Injectable()
export class Logger extends PGLLog {

    private static _cache = new Map<LogLevel, Logger>();
    private _instances = new Map<string, {}>();
    constructor(
        @Inject(LOGGER_DEFAULTS) private _config: LoggerConfig
    ) {
        super()
        console.log("logger config: ", this._config);
    }

}

@Injectable()
export class EmptyLogger extends AbstractLogger{
    constructor(){
        super({}, true)
    }
    setClassLevel = EmptyFunction
    setLevel = EmptyFunction
    fromLevel = EmptyFunction
    Tap(){
        return tap()
    }
}
