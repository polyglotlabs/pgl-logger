export class LoggerConfig {
    hide?: boolean;
    constructor({ hide = false }: Partial<LoggerConfig>) {
        this.hide = hide;
    }
}
;
