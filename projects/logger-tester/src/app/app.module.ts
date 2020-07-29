import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoggerModule } from 'logger';
import { DummyComponent } from './dummy/dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    LoggerModule.forRoot({hide: true})
  ],
  exports: [LoggerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
