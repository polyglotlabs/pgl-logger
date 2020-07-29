import { log } from '../log/log.class';
import { Logger, EmptyLogger } from '../logger.service';
import { LoggerConfig } from "./logger-config.class";
export function factory(loggerDefaults: LoggerConfig) { return log.show ? new Logger(loggerDefaults) : new EmptyLogger(); }
