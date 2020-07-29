import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { Logger, EmptyLogger, LOGGER_DEFAULTS } from './logger.service';
import { LoggerConfig } from "./core/logger-config.class";
import { log } from './log/log.class';


@NgModule({})
export class LoggerModule {
    static forRoot(config?: LoggerConfig): ModuleWithProviders<LoggerModule>{
        return {
            ngModule: LoggerModule,
            providers: [
                {
                    provide: LOGGER_DEFAULTS,
                    useValue: config || new LoggerConfig({})
                },
                {
                    provide: Logger,
                    useFactory: LoggerFactory,
                    deps: [LOGGER_DEFAULTS]
                }
            ]
        }
    }
 }

export function LoggerFactory(loggerDefaults: LoggerConfig){
    // console.log("config: ", config);
    log.setVisibility(!loggerDefaults.hide);
    console.log(`
        show: ${log.show},
    `)
    return log.show ? new Logger(loggerDefaults) : new EmptyLogger();
}
