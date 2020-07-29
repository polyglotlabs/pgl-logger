import { Loggable, AbstractLogger } from "../loggable";
import { LogLevel } from "../log-level";
import { EmptyFunction } from '../../core/empty-function';
import { log } from '../log.class';
import { Logger } from '../../logger.service';

export type Constructor<T = {}> = new (...args: any[]) => T;

export function Log(level: LogLevel){
    // console.log(`at start: Log is called...
    //  level: ${LogLevel[level]},
    //  visible: ${log.show}`);
    const self = this;
    return function<T>(...args: any[]){
    //     console.log(`at call: Log is called...
    //  level: ${LogLevel[level]},
    //  visible: ${log.show}`);
        let fn = (...args: any[]): Function => EmptyFunction;
        switch(args.length){
            case 1:
                fn = LogClass;
                break;
            case 2:
                fn = LogProperty;
                break;
            case 3:
                fn = typeof args[2] == 'number' ? LogParameter: LogMethod;
                break;
            default:
                throw new Error(`Unexpected number of params. Expected 1 to 3 got ${args.length}`);

        }
        // console.log(`function found: `, fn);
        return fn(level).apply(this, args);
    };
}

export function LogMethod(level: LogLevel) {
    return function <T> (_: T, name: string, descriptor: PropertyDescriptor) : PropertyDescriptor{
        type params = Parameters<typeof descriptor.value>
        type rtrn = ReturnType<typeof descriptor.value>
        const method: (...args: params[])=> rtrn = descriptor.value;
        descriptor.value = function (...args: params[]): rtrn{
            if(!('log' in this)){
                return method.apply(this, args);
            }
            const self = this as Loggable;
            const current = self.log;
            self.log = self.log.fromLevel(level) as AbstractLogger
            self.log.Info(`${name} method was fire...`)
            const v = method.apply(this, args);
            self.log.Info(`${name} method complete...`)
            self.log = current;
            return v;
        }
        return descriptor
    };
}

export function LogClass(level: LogLevel) {
    console.log('log class is called...')
    return function<T extends Constructor>(target: T){
        const f = class extends target{
            __logLevel: LogLevel;
            constructor(...args: any[]){
                console.log('New: ' + target.name);
                const loggerIndex =  args.findIndex(arg => arg instanceof Logger)
                console.log("logger index: ", loggerIndex)
                if(loggerIndex > -1){
                    args[loggerIndex] = args[loggerIndex].fromLevel(level) as AbstractLogger;
                    // self.log.setClassLevel(level, target.name);
                    console.log("self log: ", args[loggerIndex]);
                }
                super(...args);
                this.__logLevel = level;

            }
        }
        return f;
    }
}

export function LogParameter(level: LogLevel) {
    console.warn('LogParameter is not implemented yet');
    return function<T>(target: T, key: string, index: number){
        throw new Error('LogParameter is not implemented yet')
    }
}
export function LogProperty(level: LogLevel) {
    return function <T>(target: T, key: string){
        let _val = this[key];
        const _getter = function(){
            return _val;
        }
        const _setter = function(next: typeof _val){
            _val = next;
        }
        if(delete this[key]){
            Object.defineProperty(target, key, {
                get: _getter,
                set: _setter,
                enumerable: true,
                configurable: true
            });
        }

    }
}
