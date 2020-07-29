import { Component } from '@angular/core';
import { LogLevel, Log, Logger, log } from 'logger';

@Log(LogLevel.Debug)
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'logger-tester';
    constructor(public log: Logger) {this.getSomething()}

    getSomething() {
        console.log(this.log);
        log.Debug("test pure log")
        this.log.Info("information: ")
        this.log.Debug("saying something");
        this.log.Warn("WARNING!!")
        return 'get something'
    }
}
