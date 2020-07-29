import { Component, OnInit } from '@angular/core';
import { Logger } from 'logger';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  constructor(public log: Logger) { }

  ngOnInit(): void {
  }

  doSomething(){
      this.log.Debug("doing something");
  }
}
