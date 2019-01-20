import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  public selectedLog = this.logSource.asObservable();

  constructor() {
    this.logs = [
      {id: '1', text: 'Generated components', date: new Date('01/20/2019 14:21:53')},
      {id: '2', text: 'Added Bootstrap', date: new Date('02/20/2019 14:21:53')},
      {id: '3', text: 'Construct services', date: new Date('03/20/2019 14:21:53')}
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }
}
